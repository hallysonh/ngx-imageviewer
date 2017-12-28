import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, Inject, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  ImageViewerConfig,
  IMAGEVIEWER_CONFIG,
  IMAGEVIEWER_CONFIG_DEFAULT,
  ButtonConfig,
  ButtonStyle
} from './imageviewer.config';
import { Viewport, Button, toSquareAngle, ResourceLoader } from './imageviewer.model';
import { Subscription } from 'rxjs/Subscription';
import { ImageResourceLoader } from './image.loader';
import { PdfResourceLoader } from './pdf.loader';

const MIN_TOOLTIP_WIDTH_SPACE = 500;

@Component({
  selector: 'ngx-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.scss']
})
export class ImageViewerComponent implements AfterViewInit, OnDestroy {

  //#region Input properties
  private _src: string;
  get src() { return this._src; }
  @Input('src') set src(value) {
    if (value === this._src) { return; }
    this._src = value;
    this.setUpResource();
  }

  private _filetype: string;
  get filetype() {
    return this._filetype;
  }

  @Input('filetype')
  set filetype(value: string) {
    if (value === this._filetype) {
      return;
    }
    this._filetype = value;
    this.setUpResource();
  }

  private _width: number;
  get width() { return this._width; }
  @Input('width') set width(value) {
    if (value === this._width) { return; }
    this._width = value;
    if (this.canvas) { this.canvas.width = this._width; }
    this.resetImage();
  }

  private _height: number;
  get height() { return this._height; }
  @Input('height') set height(value) {
    if (value === this._height) { return; }
    this._height = value;
    if (this.canvas) { this.canvas.height = this._height; }
    this.resetImage();
  }

  @ViewChild('imageContainer') canvasRef: ElementRef;
  //#endregion

  //#region Private properties
  // Canvas 2D context
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  // dirty state
  private dirty = true;

  // action buttons
  private nextPageButton: Button;
  private beforePageButton: Button;
  private zoomOutButton: Button;
  private zoomInButton: Button;
  private rotateLeftButton: Button;
  private rotateRightButton: Button;
  private resetButton: Button;

  // contains all active buttons
  private buttons = [];

  // current tool tip (used to track change of tool tip)
  private currentTooltip = null;

  // cached data when touch events started
  private touchStartState: any = {};

  // list of event listener destroyers
  private listenDestroyList = [];

  // image / Pdf Drawable Resource
  private resource: ResourceLoader;
  private resourceChangeSub: Subscription;

  //#endregion

  //#region Lifecycle events
  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer,
    @Inject(IMAGEVIEWER_CONFIG) private config: ImageViewerConfig
  ) {
    this.config = this.extendsDefaultConfig(config);
    this.nextPageButton = new Button(this.config.nextPageButton, this.config.buttonStyle);
    this.beforePageButton = new Button(this.config.beforePageButton, this.config.buttonStyle);
    this.zoomOutButton = new Button(this.config.zoomOutButton, this.config.buttonStyle);
    this.zoomInButton = new Button(this.config.zoomInButton, this.config.buttonStyle);
    this.rotateLeftButton = new Button(this.config.rotateLeftButton, this.config.buttonStyle);
    this.rotateRightButton = new Button(this.config.rotateRightButton, this.config.buttonStyle);
    this.resetButton = new Button(this.config.resetButton, this.config.buttonStyle);
    this.buttons = [
      this.zoomOutButton,
      this.zoomInButton,
      this.rotateLeftButton,
      this.rotateRightButton,
      this.resetButton
    ].filter(item => item.display)
      .sort((a, b) => a.sortId - b.sortId);
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');

    // setting canvas dimention
    this.canvas.width = this.width || this.config.width;
    this.canvas.height = this.height || this.config.height;

    // setting buttons actions
    this.nextPageButton.onClick = (evt) => { this.nextPage(); return false; };
    this.beforePageButton.onClick = (evt) => { this.previousPage(); return false; };
    this.zoomOutButton.onClick = (evt) => { this.zoomOut(); return false; };
    this.zoomInButton.onClick = (evt) => { this.zoomIn(); return false; };
    this.rotateLeftButton.onClick = (evt) => { this.rotateLeft(); return false; };
    this.rotateRightButton.onClick = (evt) => { this.rotateRight(); return false; };
    this.resetButton.onClick = (evt) => { this.resetImage(); return false; };

    // register event listeners
    this.addEventListeners();
  }

  ngOnDestroy() {
    // unregiste event listeners
    this.listenDestroyList.forEach(listenDestroy => {
      if (typeof listenDestroy === 'function') {
        listenDestroy();
      }
    });
  }

  setUpResource() {
    if (this.isImage(this.src) && (!this.resource || !(this.resource instanceof ImageResourceLoader))) {
      if (this.resourceChangeSub) {
        this.resourceChangeSub.unsubscribe();
      }
      this.resource = new ImageResourceLoader();
    } else if (this.isPdf(this.src) && (!this.resource || !(this.resource instanceof PdfResourceLoader))) {
      if (this.resourceChangeSub) {
        this.resourceChangeSub.unsubscribe();
      }
      this.resource = new PdfResourceLoader();
    }
    if (this.resource) {
      this.resource.src = this.src;
      this.resourceChangeSub = this.resource.onResourceChange().subscribe(() => {
        this.updateCanvas();
      });
      this.resource.setUp();
      this.resetImage();
      if (this.context) { this.updateCanvas(); }
    }
  }
  //#endregion

  //#region Touch events
  onTap(evt) {
    const activeElement = this.getUIElement(this.screenToCanvasCentre(evt.center));
    if (activeElement !== null) { activeElement.onClick(evt); }
  }

  onTouchEnd() {
    this.touchStartState.viewport = undefined;
    this.touchStartState.scale = undefined;
    this.touchStartState.rotate = undefined;
  }

  processTouchEvent(evt) {
    // process pan
    if (!this.touchStartState.viewport) { this.touchStartState.viewport = Object.assign({}, this.resource.viewport); }

    const viewport = this.resource.viewport;
    viewport.x = this.touchStartState.viewport.x + evt.deltaX;
    viewport.y = this.touchStartState.viewport.y + evt.deltaY;

    // process pinch in/out
    if (!this.touchStartState.scale) { this.touchStartState.scale = this.resource.viewport.scale; }
    const newScale = this.touchStartState.scale * evt.scale;
    viewport.scale = newScale > this.resource.maxScale ? this.resource.maxScale :
      newScale < this.resource.minScale ? this.resource.minScale : newScale;

    // process rotate left/right
    if (!this.touchStartState.rotate) { this.touchStartState.rotate = { rotation: viewport.rotation, startRotate: evt.rotation }; }
    if (evt.rotation !== 0) {
      const newAngle = this.touchStartState.rotate.rotation + evt.rotation - this.touchStartState.rotate.startRotate;
      viewport.rotation = this.config.rotateStepper ? toSquareAngle(newAngle) : newAngle;
    }
    this.dirty = true;
  }
  //#endregion

  //#region Mouse Events
  private addEventListeners() {
    // zooming
    this.listenDestroyList.push(this.renderer.listen(this.canvas, 'DOMMouseScroll', (evt) => this.onMouseWheel(evt)));
    this.listenDestroyList.push(this.renderer.listen(this.canvas, 'mousewheel', (evt) => this.onMouseWheel(evt)));

    // show tooltip when mouseover it
    this.listenDestroyList.push(this.renderer.listen(this.canvas, 'mousemove', (evt) =>
      this.checkTooltipActivation(this.screenToCanvasCentre({ x: evt.clientX, y: evt.clientY }))
    ));
  }

  private onMouseWheel(evt) {
    if (!evt) { evt = event; }
    evt.preventDefault();
    if (evt.detail < 0 || evt.wheelDelta > 0) { // up -> larger
      this.zoomIn();
    } else { // down -> smaller
      this.zoomOut();
    }
  }

  private checkTooltipActivation(pos: { x: number, y: number }) {
    this.getUIElements().forEach(x => x.hover = false);
    const activeElement = this.getUIElement(pos);
    const oldToolTip = this.currentTooltip;
    if (activeElement !== null) {
      if (typeof activeElement.hover !== 'undefined') {
        activeElement.hover = true;
      }
      if (typeof activeElement.tooltip !== 'undefined') {
        this.currentTooltip = activeElement.tooltip;
      }
    }
    if (oldToolTip !== this.currentTooltip) { this.dirty = true; }
  }
  //#endregion

  //#region Button Actions

  private nextPage() {
    if (!this.resource) { return; }
    if (this.resource.currentItem >= this.resource.totalItem) { return; }
    if (this.resource.currentItem < 1) { this.resource.currentItem = 0; }
    this.resource.currentItem++;
    this.resource.loadResource();
    this.dirty = true;
  }

  private previousPage() {
    if (!this.resource) { return; }
    if (this.resource.currentItem <= 1) { return; }
    if (this.resource.currentItem > this.resource.totalItem) { this.resource.currentItem = this.resource.totalItem + 1; }
    this.resource.currentItem--;
    this.resource.loadResource();
    this.dirty = true;
  }

  private zoomIn() {
    if (!this.resource) { return; }
    const newScale = this.resource.viewport.scale * (1 + this.config.scaleStep);
    this.resource.viewport.scale = newScale > this.resource.maxScale ? this.resource.maxScale : newScale;
    this.dirty = true;
  }

  private zoomOut() {
    if (!this.resource) { return; }
    const newScale = this.resource.viewport.scale * (1 - this.config.scaleStep);
    this.resource.viewport.scale = newScale < this.resource.minScale ? this.resource.minScale : newScale;
    this.dirty = true;
  }

  private rotateLeft() {
    if (!this.resource) { return; }
    const viewport = this.resource.viewport;
    viewport.rotation = viewport.rotation === 0 ? 270 : viewport.rotation - 90;
    this.dirty = true;
  }

  private rotateRight() {
    if (!this.resource) { return; }
    const viewport = this.resource.viewport;
    viewport.rotation = viewport.rotation === 270 ? 0 : viewport.rotation + 90;
    this.dirty = true;
  }

  private resetImage() {
    if (!this.resource) { return; }
    this.resource.resetViewport(this.canvas);
    this.dirty = true;
  }
  //#endregion

  //#region Draw Canvas
  private updateCanvas() {
    this.resetImage();

    // start new render loop
    this.render();
  }

  private render() {
    const vm = this;
    // only re-render if dirty
    if (this.dirty) {
      this.dirty = false;

      const ctx = this.context;
      ctx.save();

      this.resource.draw(ctx, this.config, this.canvas, () => {
        ctx.restore();

        if (vm.resource.loaded) {
          // draw buttons
          this.drawButtons(ctx);

          // draw paginator
          if (this.resource.showItemsQuantity) {
            this.drawPaginator(ctx);
          }
        }
      });
    }
    requestAnimationFrame(() => this.render());
  }

  private drawButtons(ctx) {
    const padding = this.config.tooltips.padding;
    const radius = this.config.tooltips.radius;
    const gap = 2 * radius + padding;
    const x = this.canvas.width - radius - padding;
    const y = this.canvas.height - radius - padding;

    // draw buttons
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw(ctx, x, y - gap * i, radius);
    }

    // draw tooltip
    if (this.currentTooltip !== null && this.canvas.width > MIN_TOOLTIP_WIDTH_SPACE) {
      ctx.save();
      const fontSize = radius;
      ctx.font = fontSize + 'px sans-serif';

      // calculate position
      const textSize = ctx.measureText(this.currentTooltip).width
        , rectWidth = textSize + padding
        , rectHeight = fontSize * 0.70 + padding
        , rectX = this.canvas.width
          - (2 * radius + 2 * padding) // buttons
          - rectWidth
        , rectY = this.canvas.height - rectHeight - padding
        , textX = rectX + 0.5 * padding
        , textY = this.canvas.height - 1.5 * padding;

      ctx.globalAlpha = this.config.tooltips.bgAlpha;
      ctx.fillStyle = this.config.tooltips.bgStyle;
      this.drawRoundRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 8, true, false);

      ctx.globalAlpha = this.config.tooltips.textAlpha;
      ctx.fillStyle = this.config.tooltips.textStyle;
      ctx.fillText(this.currentTooltip, textX, textY);

      ctx.restore();
    }
  }

  private drawPaginator(ctx) {
    const padding = this.config.tooltips.padding;
    const radius = this.config.tooltips.radius;
    const labelWidth = 50;
    const x1 = (this.canvas.width - labelWidth) / 2 - radius - padding; // PrevPageButton
    const x2 = this.canvas.width / 2; // Label
    const x3 = (this.canvas.width + labelWidth) / 2 + radius + padding; // NextPageButton
    const y = this.canvas.height - radius - padding;
    const label = this.resource.currentItem + '/' + this.resource.totalItem;
    const fontSize = 25;

    ctx.save();
    this.beforePageButton.draw(ctx, x1, y, radius);
    this.nextPageButton.draw(ctx, x3, y, radius);
    ctx.restore();

    ctx.save();
    ctx.font = fontSize + 'px Verdana';
    ctx.textAlign = 'center';
    ctx.fillText(label, x2, this.canvas.height - padding - fontSize / 2, labelWidth);
    ctx.restore();
  }

  private drawRoundRectangle(ctx, x, y, width, height, radius, fill, stroke) {
    radius = (typeof radius === 'number') ? radius : 5;
    fill = (typeof fill === 'boolean') ? fill : true; // fill = default
    stroke = (typeof stroke === 'boolean') ? stroke : false;

    // draw round rectangle
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    if (fill) { ctx.fill(); }
    if (stroke) { ctx.stroke(); }
  }

  //#endregion

  //#region Utils

  private extendsDefaultConfig(cfg: ImageViewerConfig) {
    const defaultCfg = IMAGEVIEWER_CONFIG_DEFAULT;
    const localCfg = Object.assign({}, defaultCfg, cfg);
    if (cfg.buttonStyle) { localCfg.buttonStyle = Object.assign(defaultCfg.buttonStyle, cfg.buttonStyle); }
    if (cfg.tooltips) { localCfg.tooltips = Object.assign(defaultCfg.tooltips, cfg.tooltips); }
    if (cfg.nextPageButton) { localCfg.nextPageButton = Object.assign(defaultCfg.nextPageButton, cfg.nextPageButton); }
    if (cfg.beforePageButton) { localCfg.beforePageButton = Object.assign(defaultCfg.beforePageButton, cfg.beforePageButton); }
    if (cfg.zoomOutButton) { localCfg.zoomOutButton = Object.assign(defaultCfg.zoomOutButton, cfg.zoomOutButton); }
    if (cfg.zoomOutButton) { localCfg.zoomOutButton = Object.assign(defaultCfg.zoomOutButton, cfg.zoomOutButton); }
    if (cfg.zoomInButton) { localCfg.zoomInButton = Object.assign(defaultCfg.zoomInButton, cfg.zoomInButton); }
    if (cfg.rotateLeftButton) { localCfg.rotateLeftButton = Object.assign(defaultCfg.rotateLeftButton, cfg.rotateLeftButton); }
    if (cfg.rotateRightButton) { localCfg.rotateRightButton = Object.assign(defaultCfg.rotateRightButton, cfg.rotateRightButton); }
    if (cfg.resetButton) { localCfg.resetButton = Object.assign(defaultCfg.resetButton, cfg.resetButton); }
    return localCfg;
  }

  private screenToCanvasCentre(pos: { x: number, y: number }) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }

  private getUIElements(): Button[] {
    const hoverElements = this.buttons.slice();
    hoverElements.push(this.nextPageButton);
    hoverElements.push(this.beforePageButton);
    return hoverElements;
  }

  private getUIElement(pos: { x: number, y: number }) {
    const activeUIElement = this.getUIElements().filter((uiElement) => {
      return uiElement.isWithinBounds(pos.x, pos.y);
    });
    return (activeUIElement.length > 0) ? activeUIElement[0] : null;
  }

  private isImage(url: string) {
    if (this._filetype && this._filetype.toLowerCase() === 'image') { return true; }
    return url && url.match('\\.(png|jpg|jpeg|gif)|image/png') !== null;
  }

  private isPdf(url: string) {
    if (this._filetype && this._filetype.toLowerCase() === 'pdf') { return true; }
    return url && url.indexOf('pdf') >= 0;
  }

  //#endregion
}

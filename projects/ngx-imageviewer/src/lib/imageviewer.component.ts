import { Component, Input, ViewChild, AfterViewInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { ImageViewerConfig, IMAGEVIEWER_CONFIG, IMAGEVIEWER_CONFIG_DEFAULT, ButtonConfig, ButtonStyle } from './imageviewer.config';
import { Viewport, Button, toSquareAngle, ResourceLoader } from './imageviewer.model';
import { ImageResourceLoader } from './image.loader';
import { ImageCacheService } from './imagecache.service';
import { PdfResourceLoader } from './pdf.loader';

const MIN_TOOLTIP_WIDTH_SPACE = 500;

@Component({
  selector: 'ngx-imageviewer',
  template: `
    <canvas #imageContainer [width]="width" [height]="height"
      (click)="onTap($event)" (pinchin)="processTouchEvent($event)" (pinchout)="processTouchEvent($event)"
      (panmove)="processTouchEvent($event)" (panend)="onTouchEnd()" (rotatemove)="processTouchEvent($event)"
      (rotateend)="onTouchEnd()">
    </canvas>
  `,
  styles: [`
    :host { display: block }
    :host canvas { margin: 0 auto; display: block }
    [hidden] { display: none !important }
  `]
})
export class ImageViewerComponent implements AfterViewInit, OnDestroy {

  //#region Input properties
  private _src: string | File;
  get src() { return this._src; }
  @Input('src') set src(value) {
    if (value === this._src) { return; }
    this._src = value;
    this.setUpResource();
  }

  // FIX not workign properly
  private _filetype: string;
  get filetype() { return this._filetype; }
  @Input('filetype') set filetype(value: string) {
    if (value === this._filetype) { return; }
    this._filetype = value;
    this.setUpResource();
  }

  private _width: number;
  get width() { return this._width; }
  @Input('width') set width(value) {
    if (value === this._width) { return; }
    this._width = value;
    if (this._canvas) { this._canvas.width = this._width; }
    this.resetImage();
  }

  private _height: number;
  get height() { return this._height; }
  @Input('height') set height(value) {
    if (value === this._height) { return; }
    this._height = value;
    if (this._canvas) { this._canvas.height = this._height; }
    this.resetImage();
  }

  @ViewChild('imageContainer') canvasRef: any;
  //#endregion

  //#region Private properties
  // Canvas 2D context
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  // dirty state
  private _dirty = true;

  // action buttons
  private _nextPageButton: Button;
  private _beforePageButton: Button;
  private _zoomOutButton: Button;
  private _zoomInButton: Button;
  private _rotateLeftButton: Button;
  private _rotateRightButton: Button;
  private _resetButton: Button;

  // contains all active buttons
  private _buttons = [];

  // current tool tip (used to track change of tool tip)
  private _currentTooltip = null;

  // cached data when touch events started
  private _touchStartState: any = {};

  // list of event listener destroyers
  private _listenDestroyList = [];

  // image / Pdf Drawable Resource
  private _resource: ResourceLoader;
  private _resourceChangeSub: Subscription;

  // Caching resourceLoader instances to reuse
  private _imageResource: ImageResourceLoader;
  private _pdfResource: PdfResourceLoader;

  //#endregion

  //#region Lifecycle events
  constructor(
    private _sanitizer: DomSanitizer,
    private _renderer: Renderer2,
    private _imageCache: ImageCacheService,
    @Inject(IMAGEVIEWER_CONFIG) private config: ImageViewerConfig
  ) {
    this.config = this.extendsDefaultConfig(config);
    this._nextPageButton = new Button(this.config.nextPageButton, this.config.buttonStyle);
    this._beforePageButton = new Button(this.config.beforePageButton, this.config.buttonStyle);
    this._zoomOutButton = new Button(this.config.zoomOutButton, this.config.buttonStyle);
    this._zoomInButton = new Button(this.config.zoomInButton, this.config.buttonStyle);
    this._rotateLeftButton = new Button(this.config.rotateLeftButton, this.config.buttonStyle);
    this._rotateRightButton = new Button(this.config.rotateRightButton, this.config.buttonStyle);
    this._resetButton = new Button(this.config.resetButton, this.config.buttonStyle);
    this._buttons = [
      this._zoomOutButton,
      this._zoomInButton,
      this._rotateLeftButton,
      this._rotateRightButton,
      this._resetButton
    ].filter(item => item.display)
      .sort((a, b) => a.sortId - b.sortId);
  }

  ngAfterViewInit() {
    this._canvas = this.canvasRef.nativeElement;
    this._context = this._canvas.getContext('2d');

    // setting canvas dimention
    this._canvas.width = this.width || this.config.width;
    this._canvas.height = this.height || this.config.height;

    // setting buttons actions
    this._nextPageButton.onClick = (evt) => { this.nextPage(); return false; };
    this._beforePageButton.onClick = (evt) => { this.previousPage(); return false; };
    this._zoomOutButton.onClick = (evt) => { this.zoomOut(); return false; };
    this._zoomInButton.onClick = (evt) => { this.zoomIn(); return false; };
    this._rotateLeftButton.onClick = (evt) => { this.rotateLeft(); return false; };
    this._rotateRightButton.onClick = (evt) => { this.rotateRight(); return false; };
    this._resetButton.onClick = (evt) => { this.resetImage(); return false; };

    // register event listeners
    this.addEventListeners();

    this.updateCanvas();
  }

  ngOnDestroy() {
    // unregiste event listeners
    this._listenDestroyList.forEach(listenDestroy => {
      if (typeof listenDestroy === 'function') {
        listenDestroy();
      }
    });
    this._imageCache.disposeCache();
  }

  setUpResource() {
    if (this.isImage(this.src) && (!this._resource || !(this._resource instanceof ImageResourceLoader))) {
      if (this._resourceChangeSub) {
        this._resourceChangeSub.unsubscribe();
      }
      if (!this._imageResource) {
        this._imageResource = new ImageResourceLoader();
      }
      this._resource = this._imageResource;
    } else if (this.isPdf(this.src) && (!this._resource || !(this._resource instanceof PdfResourceLoader))) {
      if (this._resourceChangeSub) {
        this._resourceChangeSub.unsubscribe();
      }
      if (!this._pdfResource) {
        this._pdfResource = new PdfResourceLoader(this._imageCache);
      }
      this._resource = this._pdfResource;
    }
    if (this._resource) {
      this._resource.src = this.src instanceof File ? URL.createObjectURL(this.src) : this.src;
      this._resourceChangeSub = this._resource.onResourceChange().subscribe(() => {
        this.updateCanvas();
        if (this.src instanceof File) {
          URL.revokeObjectURL(this._resource.src);
        }
      });
      this._resource.setUp();
      this.resetImage();
      if (this._context) { this.updateCanvas(); }
    }
  }
  //#endregion

  //#region Touch events
  onTap(evt) {
    const position = { x: evt.pageX, y: evt.pageY };
    const activeElement = this.getUIElement(this.screenToCanvasCentre(position));
    if (activeElement !== null) { activeElement.onClick(evt); }
  }

  onTouchEnd() {
    this._touchStartState.viewport = undefined;
    this._touchStartState.scale = undefined;
    this._touchStartState.rotate = undefined;
  }

  processTouchEvent(evt) {
    // process pan
    if (!this._touchStartState.viewport) { this._touchStartState.viewport = Object.assign({}, this._resource.viewport); }

    const viewport = this._resource.viewport;
    viewport.x = this._touchStartState.viewport.x + evt.deltaX;
    viewport.y = this._touchStartState.viewport.y + evt.deltaY;

    // process pinch in/out
    if (!this._touchStartState.scale) { this._touchStartState.scale = this._resource.viewport.scale; }
    const newScale = this._touchStartState.scale * evt.scale;
    viewport.scale = newScale > this._resource.maxScale ? this._resource.maxScale :
      newScale < this._resource.minScale ? this._resource.minScale : newScale;

    // process rotate left/right
    if (!this._touchStartState.rotate) { this._touchStartState.rotate = { rotation: viewport.rotation, startRotate: evt.rotation }; }
    if (evt.rotation !== 0) {
      const newAngle = this._touchStartState.rotate.rotation + evt.rotation - this._touchStartState.rotate.startRotate;
      viewport.rotation = this.config.rotateStepper ? toSquareAngle(newAngle) : newAngle;
    }
    this._dirty = true;
  }
  //#endregion

  //#region Mouse Events
  private addEventListeners() {
    // zooming
    this._listenDestroyList.push(this._renderer.listen(this._canvas, 'DOMMouseScroll', (evt) => this.onMouseWheel(evt)));
    this._listenDestroyList.push(this._renderer.listen(this._canvas, 'mousewheel', (evt) => this.onMouseWheel(evt)));

    // show tooltip when mouseover it
    this._listenDestroyList.push(this._renderer.listen(this._canvas, 'mousemove', (evt) =>
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
    const oldToolTip = this._currentTooltip;
    if (activeElement !== null) {
      if (typeof activeElement.hover !== 'undefined') {
        activeElement.hover = true;
      }
      if (typeof activeElement.tooltip !== 'undefined') {
        this._currentTooltip = activeElement.tooltip;
      }
    }
    if (oldToolTip !== this._currentTooltip) { this._dirty = true; }
  }
  //#endregion

  //#region Button Actions

  private nextPage() {
    if (!this._resource) { return; }
    if (this._resource.currentItem >= this._resource.totalItem) { return; }
    if (this._resource.currentItem < 1) { this._resource.currentItem = 0; }
    this._resource.currentItem++;
    this._resource.loadResource();
    this._dirty = true;
  }

  private previousPage() {
    if (!this._resource) { return; }
    if (this._resource.currentItem <= 1) { return; }
    if (this._resource.currentItem > this._resource.totalItem) { this._resource.currentItem = this._resource.totalItem + 1; }
    this._resource.currentItem--;
    this._resource.loadResource();
    this._dirty = true;
  }

  private zoomIn() {
    if (!this._resource) { return; }
    const newScale = this._resource.viewport.scale * (1 + this.config.scaleStep);
    this._resource.viewport.scale = newScale > this._resource.maxScale ? this._resource.maxScale : newScale;
    this._dirty = true;
  }

  private zoomOut() {
    if (!this._resource) { return; }
    const newScale = this._resource.viewport.scale * (1 - this.config.scaleStep);
    this._resource.viewport.scale = newScale < this._resource.minScale ? this._resource.minScale : newScale;
    this._dirty = true;
  }

  private rotateLeft() {
    if (!this._resource) { return; }
    const viewport = this._resource.viewport;
    viewport.rotation = viewport.rotation === 0 ? 270 : viewport.rotation - 90;
    this._dirty = true;
  }

  private rotateRight() {
    if (!this._resource) { return; }
    const viewport = this._resource.viewport;
    viewport.rotation = viewport.rotation === 270 ? 0 : viewport.rotation + 90;
    this._dirty = true;
  }

  private resetImage() {
    if (!this._resource) { return; }
    this._resource.resetViewport(this._canvas);
    this._dirty = true;
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
    if (this._dirty && this._resource) {
      this._dirty = false;

      const ctx = this._context;
      ctx.save();

      this._resource.draw(ctx, this.config, this._canvas, () => {
        ctx.restore();

        if (vm._resource.loaded) {
          // draw buttons
          this.drawButtons(ctx);

          // draw paginator
          if (this._resource.showItemsQuantity) {
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
    const x = this._canvas.width - radius - padding;
    const y = this._canvas.height - radius - padding;

    // draw buttons
    for (let i = 0; i < this._buttons.length; i++) {
      this._buttons[i].draw(ctx, x, y - gap * i, radius);
    }

    // draw tooltip
    if (this._currentTooltip !== null && this._canvas.width > MIN_TOOLTIP_WIDTH_SPACE) {
      ctx.save();
      const fontSize = radius;
      ctx.font = fontSize + 'px sans-serif';

      // calculate position
      const textSize = ctx.measureText(this._currentTooltip).width
        , rectWidth = textSize + padding
        , rectHeight = fontSize * 0.70 + padding
        , rectX = this._canvas.width
          - (2 * radius + 2 * padding) // buttons
          - rectWidth
        , rectY = this._canvas.height - rectHeight - padding
        , textX = rectX + 0.5 * padding
        , textY = this._canvas.height - 1.5 * padding;

      ctx.globalAlpha = this.config.tooltips.bgAlpha;
      ctx.fillStyle = this.config.tooltips.bgStyle;
      this.drawRoundRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 8, true, false);

      ctx.globalAlpha = this.config.tooltips.textAlpha;
      ctx.fillStyle = this.config.tooltips.textStyle;
      ctx.fillText(this._currentTooltip, textX, textY);

      ctx.restore();
    }
  }

  private drawPaginator(ctx) {
    const padding = this.config.tooltips.padding;
    const radius = this.config.tooltips.radius;
    const labelWidth = 50;
    const x1 = (this._canvas.width - labelWidth) / 2 - radius - padding; // PrevPageButton
    const x2 = this._canvas.width / 2; // Label
    const x3 = (this._canvas.width + labelWidth) / 2 + radius + padding; // NextPageButton
    const y = this._canvas.height - radius - padding;
    const label = this._resource.currentItem + '/' + this._resource.totalItem;
    const fontSize = 25;

    ctx.save();
    this._beforePageButton.draw(ctx, x1, y, radius);
    this._nextPageButton.draw(ctx, x3, y, radius);
    ctx.restore();

    ctx.save();
    ctx.font = fontSize + 'px Verdana';
    ctx.textAlign = 'center';
    ctx.fillText(label, x2, this._canvas.height - padding - fontSize / 2, labelWidth);
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
    const rect = this._canvas.getBoundingClientRect();
    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }

  private getUIElements(): Button[] {
    const hoverElements = this._buttons.slice();
    hoverElements.push(this._nextPageButton);
    hoverElements.push(this._beforePageButton);
    return hoverElements;
  }

  private getUIElement(pos: { x: number, y: number }) {
    const activeUIElement = this.getUIElements().filter((uiElement) => {
      return uiElement.isWithinBounds(pos.x, pos.y);
    });
    return (activeUIElement.length > 0) ? activeUIElement[0] : null;
  }

  private isImage(file: string | File) {
    if (this._filetype && this._filetype.toLowerCase() === 'image') { return true; }
    return testFile(file, '\\.(png|jpg|jpeg|gif)|image/png');
  }

  private isPdf(file: string | File) {
    if (this._filetype && this._filetype.toLowerCase() === 'pdf') { return true; }
    return testFile(file, '\\.(pdf)|application/pdf');
  }
  //#endregion
}

function testFile(file: string | File, regexTest: string) {
  if (!file) { return false; }
  const name = file instanceof File ? file.name : file;
  return name.toLowerCase().match(regexTest) !== null;
}

import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'ngx-parentsize',
  templateUrl: './parentsize.component.html',
  styleUrls: ['./parentsize.component.scss']
})
export class ParentSizeComponent implements AfterViewInit {

  @ViewChild('imagewrapper') wrapper: ElementRef;

  private _canvasDim = { width: 10, height: 10 };
  get canvasDim() {
    return this._canvasDim;
  }

  constructor() { }

  ngAfterViewInit() {
    this.updateCanvasDim();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateCanvasDim();
  }

  private updateCanvasDim() {
    const el = this.wrapper && this.wrapper.nativeElement ? this.wrapper.nativeElement : null;
    if (el && (el.offsetWidth !== this._canvasDim.width || el.offsetHeight !== this._canvasDim.height)) {
      const newDim = { width: el.offsetWidth - 2, height: el.offsetHeight - 2 };
      setTimeout(() => this._canvasDim = newDim, 0);
    }
  }
}

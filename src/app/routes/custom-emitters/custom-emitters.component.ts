import { Component, EventEmitter } from '@angular/core';

import { ImageViewerConfig, IMAGEVIEWER_CONFIG } from '../../imageviewer/imageviewer.config';

const PAGE_IMAGEVIEWER_CONFIG: ImageViewerConfig = {
  nextPageButton: { show: false },
  beforePageButton: { show: false },
  zoomOutButton: { show: false },
  zoomInButton: { show: false },
  rotateLeftButton: { show: false },
  rotateRightButton: { show: false },
  resetButton: { show: false },
  showPaginator: false,
};

@Component({
  selector: 'ngx-custom-emitters',
  templateUrl: './custom-emitters.component.html',
  styleUrls: ['./custom-emitters.component.scss'],
  providers: [
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: PAGE_IMAGEVIEWER_CONFIG
    }
  ],
})
export class CustomEmittersComponent {
  fileSrc = 'https://hallysonh.github.io/ngx-imageviewer/pdf-test.pdf';
  resetIntv = null;

  nextPage = new EventEmitter<void>();
  prevPage = new EventEmitter<void>();
  resetZoom = new EventEmitter<void>();
  rotateLeft = new EventEmitter<void>();
  rotateRight = new EventEmitter<void>();
  zoomIn = new EventEmitter<void>();
  zoomOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    this.resetIntv = setInterval(() => {
      this.resetViewEveryHalfMinute();
    }, 15e3);
  }

  ngOnDestroy() {
    clearInterval(this.resetIntv);
  }

  resetViewEveryHalfMinute() {
    this.resetZoom.emit();
  }
}

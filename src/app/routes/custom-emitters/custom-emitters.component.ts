import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { ImageViewerConfig, IMAGEVIEWER_CONFIG } from '../../imageviewer/imageviewer.config';
import { ResourceState } from '../../imageviewer/imageviewer.model';

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
export class CustomEmittersComponent implements OnInit, OnDestroy {
  filesUrls = {
    pdf: 'https://hallysonh.github.io/ngx-imageviewer/pdf-test.pdf',
    image: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-1.jpg',
  };
  fileSrc = this.filesUrls.pdf;
  resetIntv = null;

  nextPage = new EventEmitter<void>();
  prevPage = new EventEmitter<void>();
  resetZoom = new EventEmitter<void>();
  resourceState: ResourceState = null;
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

  updateResourceState(state: ResourceState) {
    this.resourceState = state;
  }

  getStateFormatted(): string {
    return JSON.stringify(this.resourceState, null, 0);
  }
}

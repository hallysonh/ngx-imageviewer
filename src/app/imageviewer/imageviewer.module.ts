import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewerComponent } from './imageviewer.component';
import { ImageViewerConfig, IMAGEVIEWER_CONFIG, IMAGEVIEWER_CONFIG_DEFAULT } from './imageviewer.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageViewerComponent],
  providers: [{
    provide: IMAGEVIEWER_CONFIG,
    useValue: IMAGEVIEWER_CONFIG_DEFAULT
  }],
  exports: [ImageViewerComponent]
})
export class ImageViewerModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageCacheService} from './imagecache.service';
import {ImageViewerComponent} from './imageviewer.component';
import {IMAGEVIEWER_CONFIG, IMAGEVIEWER_CONFIG_DEFAULT} from './imageviewer.config';
import {ImageButtonEventsTriggerService} from './image-button-events-trigger.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageViewerComponent],
  providers: [{
    provide: IMAGEVIEWER_CONFIG,
    useValue: IMAGEVIEWER_CONFIG_DEFAULT
  }, ImageCacheService, ImageButtonEventsTriggerService],
  exports: [ImageViewerComponent]
})
export class ImageViewerModule {
}

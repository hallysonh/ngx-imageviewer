import { ImageViewerModule } from './imageviewer/imageviewer.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}

import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ImageViewerModule
  ],
  providers: [{ 
    provide: HAMMER_GESTURE_CONFIG, 
    useClass: MyHammerConfig 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImageViewerModule } from './imageviewer/imageviewer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ImageViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

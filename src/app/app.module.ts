import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IMAGEVIEWER_CONFIG, ImageViewerConfig } from './imageviewer';
import { MY_IMAGEVIEWER_CONFIG } from './imageviewer.config';
import { routes } from './routes';

import { ImageViewerModule } from './imageviewer';
import { AppComponent } from './app.component';
import { SimpleUseComponent } from './routes/simpleuse/simpleuse.component';
import { ParentSizeComponent } from './routes/parentsize/parentsize.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleUseComponent,
    ParentSizeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ImageViewerModule
  ],
  providers: [
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: MY_IMAGEVIEWER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

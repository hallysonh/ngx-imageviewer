import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IMAGEVIEWER_CONFIG, ImageViewerConfig } from './imageviewer';
import { ImageViewerModule } from './imageviewer';

import { MY_IMAGEVIEWER_CONFIG } from './app.imageviewer.config';
import { AppComponent } from './app.component';

import { routes } from './routes';
import { SimpleUseComponent } from './routes/simpleuse/simpleuse.component';
import { ParentSizeComponent } from './routes/parentsize/parentsize.component';
import { IfTestComponent } from './routes/iftest/iftest.component';
import { SourceFileComponent } from './routes/sourcefile/sourcefile.component';
import { CustomEmittersComponent } from './routes/custom-emitters/custom-emitters.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleUseComponent,
    ParentSizeComponent,
    IfTestComponent,
    SourceFileComponent,
    CustomEmittersComponent,
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

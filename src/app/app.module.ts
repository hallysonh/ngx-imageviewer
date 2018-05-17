import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GettingStartedComponent } from './gettingstarted/gettingstarted.component';
import { SharedModule } from './shared/shared.module';
import { BasicUsageComponent } from './basicusage/basicusage.component';
import { AutoResizeComponent } from './autoresize/autoresize.component';
import { UploadPreviewComponent } from './uploadpreview/uploadpreview.component';
import { ConditionalDisplayComponent } from './conditionaldisplay/conditionaldisplay.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    BasicUsageComponent,
    AutoResizeComponent,
    UploadPreviewComponent,
    ConditionalDisplayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

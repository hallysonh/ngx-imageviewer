import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettingStartedComponent } from './gettingstarted/gettingstarted.component';
import { BasicUsageComponent } from './basicusage/basicusage.component';
import { AutoResizeComponent } from './autoresize/autoresize.component';
import { UploadPreviewComponent } from './uploadpreview/uploadpreview.component';
import { ConditionalDisplayComponent } from './conditionaldisplay/conditionaldisplay.component';

const routes: Routes = [
  { path: '', redirectTo: '/getting-started', pathMatch: 'full' },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'basic-usage', component: BasicUsageComponent },
  { path: 'autoresize', component: AutoResizeComponent },
  { path: 'upload-preview', component: UploadPreviewComponent },
  { path: 'conditional-display', component: ConditionalDisplayComponent },
  { path: '**', redirectTo: '/' }
];

export const MAIN_ROUTES = [
  { path: 'getting-started', title: 'Getting Started', label: 'Getting Started' }
];

export const EXAMPLES_ROUTES = [
  { path: 'basic-usage', title: 'Basic Usage', label: 'Basic Usage' },
  { path: 'conditional-display', title: 'Show/hide Test', label: 'Conditional Display' },
  { path: 'autoresize', title: 'Autoresize Test', label: 'Autoresize' },
  { path: 'upload-preview', title: 'Preview file from Upload field', label: 'Upload Preview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

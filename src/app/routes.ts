import { SimpleUseComponent } from './routes/simpleuse/simpleuse.component';
import { ParentSizeComponent } from './routes/parentsize/parentsize.component';
import { IfTestComponent } from './routes/iftest/iftest.component';
import { SourceFileComponent } from './routes/sourcefile/sourcefile.component';
import { CustomEmittersComponent } from './routes/custom-emitters/custom-emitters.component';

export const routes = [
  { path: '', redirectTo: 'simpleuse', pathMatch: 'full' },
  { path: 'simpleuse', component: SimpleUseComponent },
  { path: 'parentsize', component: ParentSizeComponent },
  { path: 'iftest', component: IfTestComponent },
  { path: 'sourcefile', component: SourceFileComponent },
  { path: 'custom-emitters', component: CustomEmittersComponent },
  { path: '**', redirectTo: '/simpleuse' }
];

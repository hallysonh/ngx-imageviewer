import { SimpleUseComponent } from './routes/simpleuse/simpleuse.component';
import { ParentSizeComponent } from './routes/parentsize/parentsize.component';
import { IfTestComponent } from './routes/iftest/iftest.component';
import { SourceFileComponent } from './routes/sourcefile/sourcefile.component';

export const routes = [
  { path: '', redirectTo: 'simpleuse', pathMatch: 'full' },
  { path: 'simpleuse', component: SimpleUseComponent },
  { path: 'parentsize', component: ParentSizeComponent },
  { path: 'iftest', component: IfTestComponent },
  { path: 'sourcefile', component: SourceFileComponent },
  { path: '**', redirectTo: '/simpleuse' }
];

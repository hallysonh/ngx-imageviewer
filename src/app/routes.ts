import { SimpleUseComponent } from './routes/simpleuse/simpleuse.component';
import { ParentSizeComponent } from './routes/parentsize/parentsize.component';

export const routes = [
  { path: '', redirectTo: 'simpleuse', pathMatch: 'full' },
  { path: 'simpleuse', component: SimpleUseComponent },
  { path: 'parentsize', component: ParentSizeComponent },
  { path: '**', redirectTo: '/simpleuse' }
];

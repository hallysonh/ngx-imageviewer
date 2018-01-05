import { Component } from '@angular/core';

@Component({
  selector: 'ngx-sourcefile',
  templateUrl: './sourcefile.component.html',
  styleUrls: ['./sourcefile.component.scss']
})
export class SourceFileComponent {
  docFile: File;

  constructor() { }
}

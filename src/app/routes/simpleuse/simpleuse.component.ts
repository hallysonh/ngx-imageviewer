import { Component } from '@angular/core';

@Component({
  selector: 'ngx-simpleuse',
  templateUrl: './simpleuse.component.html',
  styleUrls: ['./simpleuse.component.scss']
})
export class SimpleUseComponent {
  samples = [
    { label: 'Image Test', url: './assets/imgs/sample1.jpg' },
    { label: 'PDF Test', url: './pdf-test.pdf' },
    { label: 'Extern Image', url: 'https://kbob.github.io/images/sample-5.jpg' }
  ];

  canvasWidth = 800;
  canvasHeight = 600;
  imageSrc = this.samples[0].url;

  constructor() { }
}

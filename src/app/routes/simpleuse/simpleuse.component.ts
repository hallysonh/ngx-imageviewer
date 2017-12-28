import { Component } from '@angular/core';

@Component({
  selector: 'ngx-simpleuse',
  templateUrl: './simpleuse.component.html',
  styleUrls: ['./simpleuse.component.scss']
})
export class SimpleUseComponent {
  samples = [
    { label: 'PDF Test', url: './pdf-test.pdf' },
    { label: 'Image 1', url: './assets/imgs/sample-0.jpg' },
    { label: 'Image 2', url: './assets/imgs/sample-1.jpg' },
    { label: 'Image 3', url: './assets/imgs/sample-2.jpg' },
    { label: 'Image 4', url: './assets/imgs/sample-3.jpg' },
    { label: 'Image 5', url: './assets/imgs/sample-4.jpg' },
    { label: 'Image 6', url: './assets/imgs/sample-5.jpg' }
  ];

  canvasWidth = 800;
  canvasHeight = 600;
  imageSrc = this.samples[0].url;

  constructor() { }
}

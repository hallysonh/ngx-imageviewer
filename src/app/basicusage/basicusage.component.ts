import { Component } from '@angular/core';

@Component({
  selector: 'app-basicusage',
  templateUrl: './basicusage.component.html'
})
export class BasicUsageComponent {
  samples = [
    { label: 'PDF Test', url: 'https://hallysonh.github.io/ngx-imageviewer/pdf-test.pdf' },
    { label: 'Image 1 (BIG)', url: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-0.jpg' },
    { label: 'Image 2', url: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-1.jpg' },
    { label: 'Image 3', url: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-2.jpg' },
    { label: 'Image 4', url: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-3.jpg' },
    { label: 'Image 5', url: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-4.jpg' },
    { label: 'Image 6', url: 'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-5.jpg' }
  ];

  canvasWidth = 800;
  canvasHeight = 600;
  imageSrc = this.samples[0].url;

  constructor() { }
}

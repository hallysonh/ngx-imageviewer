import { Component } from '@angular/core';

const URLS = [
  'https://hallysonh.github.io/ngx-imageviewer/pdf-test.pdf',
  'https://hallysonh.github.io/ngx-imageviewer/assets/imgs/sample-1.jpg'
];

@Component({
  selector: 'app-conditionaldisplay',
  templateUrl: './conditionaldisplay.component.html'
})
export class ConditionalDisplayComponent {
  condition = true;
  url = URLS[0];

  private _currentIndex = 0;

  constructor() { }

  toggleUrl() {
    this._currentIndex = this._currentIndex ? 0 : 1;
    this.url = URLS[this._currentIndex];
  }

}

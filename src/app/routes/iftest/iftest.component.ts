import { Component } from '@angular/core';

const URLS = [
  './pdf-test.pdf',
  './assets/imgs/sample-1.jpg'
]

@Component({
  selector: 'ngx-iftest',
  templateUrl: './iftest.component.html',
  styleUrls: ['./iftest.component.scss']
})
export class IfTestComponent {
  condition = true;
  url = URLS[0];

  private _currentIndex = 0;

  constructor() { }

  toggleVisibility() {
    this.condition = !this.condition;
  }

  toggleUrl() {
    this._currentIndex = this._currentIndex ? 0 : 1;
    this.url = URLS[this._currentIndex];
  }
}

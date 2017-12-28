import { Component } from '@angular/core';
import { MAIN_MENU } from './menu';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menus = MAIN_MENU;
}

import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToRoot() {
    return browser.get('/');
  }

  getContentTitle() {
    return element(by.css('mat-sidenav-content > mat-toolbar > span')).getText();
  }
}

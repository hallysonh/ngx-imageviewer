import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { MAIN_ROUTES, EXAMPLES_ROUTES } from './app-routing.module';

const APP_MENU = 'NgxImageViewer';
const DEFAULT_TITLE = 'Not found';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  menu = APP_MENU;
  mainlinks = MAIN_ROUTES;
  exampleLinks = EXAMPLES_ROUTES;
  currentTitle = DEFAULT_TITLE;

  private eventSub: Subscription;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.eventSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const newRoute = event.urlAfterRedirects;
        const mapping = [ ... MAIN_ROUTES, ... EXAMPLES_ROUTES].filter( x => x.path === newRoute.substr(1));
        this.currentTitle = mapping.length ? mapping[0].title : DEFAULT_TITLE;
      }
    });
  }

  ngOnDestroy() {
    this.eventSub.unsubscribe();
  }
}

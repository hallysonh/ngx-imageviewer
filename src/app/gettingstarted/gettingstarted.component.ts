import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Converter } from 'showdown';

declare const hljs: any;

const README_URL = 'https://raw.githubusercontent.com/hallysonh/ngx-imageviewer/master/README.md';

@Component({
  selector: 'app-gettingstarted',
  templateUrl: './gettingstarted.component.html',
  styleUrls: ['./gettingstarted.component.scss']
})
export class GettingStartedComponent implements OnDestroy, AfterContentInit {
  html: SafeHtml;
  isLoading = false;

  private converter: Converter;
  private subscrition: Subscription;
  private contentInited = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.isLoading = true;
    this.converter = new Converter();
    this.subscrition = this.http.get(README_URL, { responseType: 'text' }).subscribe(markdown => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(markdown));
      this.initHightlight();
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  ngAfterContentInit() {
    this.contentInited = true;
    this.initHightlight();
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }

  private initHightlight() {
    if (!this.html || !this.contentInited) { return; }
    setTimeout(() => hljs.initHighlighting(), 1200);
  }
}

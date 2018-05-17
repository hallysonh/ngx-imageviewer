import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IMAGEVIEWER_CONFIG, IMAGEVIEWER_CONFIG_DEFAULT } from './imageviewer.config';

import 'hammerjs';

import { ImageViewerComponent } from './imageviewer.component';

describe('ImageViewerComponent', () => {
  let component: ImageViewerComponent;
  let fixture: ComponentFixture<ImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerComponent ],
      providers: [{ provide: IMAGEVIEWER_CONFIG, useValue: IMAGEVIEWER_CONFIG_DEFAULT }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

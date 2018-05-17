import { TestBed, inject } from '@angular/core/testing';

import { ImageCacheService } from './imagecache.service';

describe('ImageCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageCacheService]
    });
  });

  it('should be created', inject([ImageCacheService], (service: ImageCacheService) => {
    expect(service).toBeTruthy();
  }));
});

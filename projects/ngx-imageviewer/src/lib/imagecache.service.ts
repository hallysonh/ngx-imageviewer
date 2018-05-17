import { Injectable } from '@angular/core';

export interface CacheDef {
  url: string;
  page: number;
  image: any;
}

@Injectable({ providedIn: 'root' })
export class ImageCacheService {

  private _cache: CacheDef[] = [];

  constructor() {}

  get cache(): CacheDef[] {
    return this._cache;
  }

  getCache(url: string, page: number) {
    return this.cache.find(i => i.url === url && i.page === page);
  }

  getImage(url: string, page: number) {
    const c = this.getCache(url, page);
    return c ? c.image : null;
  }

  saveImage(url: string, page: number, image: any) {
    const cache = this.getCache(url, page);
    if (cache) {
      cache.image = image;
    } else {
      this.cache.push({ url, page, image });
    }
  }

  disposeCache() {
    this.cache.forEach(i => URL.revokeObjectURL(i.image.src));
    this._cache = [];
  }
}

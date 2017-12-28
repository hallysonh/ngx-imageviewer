import { Injectable } from '@angular/core';

export interface CacheDef {
  url: string;
  page: number;
  resource: string;
}

@Injectable()
export class ResourceCacheService {

  private _cache: CacheDef[] = [];

  constructor() {}

  get cache(): CacheDef[] {
    return this._cache;
  }

  getCache(url: string, page: number) {
    return this.cache.find(i => i.url === url && i.page === page);
  }

  getResource(url: string, page: number) {
    const c = this.getCache(url, page);
    return c ? c.resource : null;
  }

  saveResource(url: string, page: number, resource: string) {
    const cache = this.getCache(url, page);
    if (cache) {
      cache.resource = resource;
    } else {
      this.cache.push({ url, page, resource });
    }
  }

  disposeCache() {
    this.cache.forEach(i => URL.revokeObjectURL(i.resource));
    this._cache = [];
  }
}

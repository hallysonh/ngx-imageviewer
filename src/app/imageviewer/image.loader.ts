import { ResourceLoader, Dimension, toSquareAngle } from './imageviewer.model';
import { ImageViewerConfig } from './imageviewer.config';

export class ImageResourceLoader extends ResourceLoader {

  setUp() {
    this.loadResource();
  }

  loadResource() {
    this.loading = true;
    this._image = new Image();
    this._image.addEventListener('load', (evt) => {
      this.loaded = true;
      this.loading = false;
      this.resourceChange.next();
    }, false);
    this._image.src = this.src;
  }
}

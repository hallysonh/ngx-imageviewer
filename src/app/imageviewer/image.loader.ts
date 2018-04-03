import { ResourceLoader, Dimension, toSquareAngle, ResourceLoadState } from './imageviewer.model';
import { ImageViewerConfig } from './imageviewer.config';

export class ImageResourceLoader extends ResourceLoader {

  setUp() {
    this.loadResource();
  }

  loadResource() {
    this.loadState = ResourceLoadState.Loading;
    this._image = new Image();
    this._image.addEventListener('load', (evt) => {
      this.loadState = ResourceLoadState.Loaded;
      this.resourceChange.next();
    }, false);
    this._image.addEventListener('error', (evt) => {
      this.loadState = ResourceLoadState.Failed;
      this.onLoadError.emit(evt);
      this.resourceChange.next();
    }, false);
    this._image.src = this.src;
  }
}

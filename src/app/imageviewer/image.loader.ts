import { ResourceLoader, Dimension, toSquareAngle, ResourceState, ResourceType } from './imageviewer.model';
import { ImageViewerConfig } from './imageviewer.config';

export class ImageResourceLoader extends ResourceLoader {

  setUp() {
    this.loadResource();
  }

  loadResource() {
    this.loading = true;
    this._image = new Image();
    this._image.addEventListener('load', (evt) => {
      const resourceState: ResourceState = {
        currentPage: 1,
        numOfPages: 1,
        type: ResourceType.Image,
      };
      this.onResourceStateChange.emit(resourceState);
      this.loaded = true;
      this.loading = false;
      this.resourceChange.next();
    }, false);
    this._image.src = this.src;
  }
}

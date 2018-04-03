import { ImageCacheService } from './imagecache.service';
import { ResourceLoader, Dimension, toSquareAngle, ResourceLoadState } from './imageviewer.model';
import { ImageViewerConfig } from './imageviewer.config';

declare var PDFJS;

export class PdfResourceLoader extends ResourceLoader {
  private _pdf;
  private _page;
  private _pendingReload;

  constructor(private _imageCache: ImageCacheService) {
    super();
    if (!PDFJS.workerSrc) {
      PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(PDFJS as any).version}/pdf.worker.min.js`;
    }
    this.showItemsQuantity = true;
  }

  setUp() {
    if (this.loadState === ResourceLoadState.Loading || !this.src) {
      return;
    }
    const loadingTask: any = PDFJS.getDocument(this.src);
    const vm = this;
    this.loadState = ResourceLoadState.Loading;
    this.currentItem = 1;
    loadingTask.promise.then((pdf) => {
      vm._pdf = pdf;
      vm.totalItem = pdf.numPages;
      vm.loadState = ResourceLoadState.Loaded;
      vm.loadResource();
    }, (reason) => {
      vm.loadState = ResourceLoadState.Failed;
      this.onLoadError.emit(reason);
      this.resourceChange.next();
    });
  }

  loadResource() {
    if (this.loadState !== ResourceLoadState.Loaded) {
      this._pendingReload = true;
      return;
    }

    this.loadState = ResourceLoadState.Pristine;
    const vm = this;
    const url = this.src;
    const page = this.currentItem;

    this._pdf.getPage(page).then((pdfPage) => {
      vm._page = pdfPage;
      vm.loadImage(url, page, () => {
        vm.loadState = ResourceLoadState.Loaded;

        if (vm._pendingReload) {
          vm._pendingReload = false;
          vm.loadResource();
        } else {
          vm.resourceChange.next();
        }
      });
    });
  }

  private loadImage(src: string, page: number, onFinish: () => void) {
    const vm = this;
    const cacheimg = this._imageCache.getImage(src, page);
    if (cacheimg) {
      vm._image = cacheimg;
      onFinish();
      return;
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pageVp = this._page.getViewport(2);

    canvas.width = pageVp.width;
    canvas.height = pageVp.height;

    const renderContext = {
      canvasContext: context,
      viewport: pageVp
    };
    const renderTask = this._page.render(renderContext);
    renderTask.then(function () {
      canvas.toBlob(blob => {
        const img = new Image();
        img.onload = onFinish;
        img.src = URL.createObjectURL(blob);
        vm._imageCache.saveImage(src, page, img);
        vm._image = img;
      });
    });
  }
}

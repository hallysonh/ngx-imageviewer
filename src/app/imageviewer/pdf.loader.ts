import { ResourceCacheService } from './resourcecache.service';
import { ResourceLoader, Dimension, toSquareAngle } from './imageviewer.model';
import { ImageViewerConfig } from './imageviewer.config';

declare var PDFJS;

export class PdfResourceLoader extends ResourceLoader {
  private _pdf;
  private _page;
  private _pendingReload;

  constructor(private _resourceCache: ResourceCacheService) {
    super();
    if (!PDFJS.workerSrc) {
      PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(PDFJS as any).version}/pdf.worker.min.js`;
    }
    this.showItemsQuantity = true;
  }

  setUp() {
    if (this.loading) { return; }
    const loadingTask: any = PDFJS.getDocument(this.src);
    const vm = this;
    this.loading = true;
    this.currentItem = 1;
    loadingTask.promise.then((pdf) => {
      vm._pdf = pdf;
      vm.totalItem = pdf.numPages;
      vm.loaded = true;
      vm.loadResource();
    }, (reason) => {
      console.error(reason);
    });
  }

  loadResource() {
    if (!this.loaded) {
      this._pendingReload = true;
      return;
    }
    this.loaded = false;
    const vm = this;
    const url = this.src;
    const page = this.currentItem;

    this._pdf.getPage(page).then((pdfPage) => {
      vm._page = pdfPage;
      vm.loadImage(url, page, () => {
        vm.loaded = true;
        vm.loading = false;
        if (vm._pendingReload) {
          vm._pendingReload = false;
          vm.loadResource();
        } else {
          vm.resourceChange.next();
        }
      });
    });
  }

  private loadImage(src: string, page:number, onFinish: () => void) {
    const vm = this;

    if (this._resourceCache.getResource(src, page)) {
      const img = new Image();
      img.onload = onFinish;
      img.src = vm._resourceCache.getResource(vm.src, vm.currentItem);
      vm._image = img;
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
        vm._resourceCache.saveResource(src, page, img.src);
        vm._image = img;
      });
    });
  }
}

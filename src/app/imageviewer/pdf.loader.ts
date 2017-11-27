import { ResourceLoader, Dimension, toSquareAngle } from "./imageviewer.model";
import { ImageViewerConfig } from "./imageviewer.config";

declare var PDFJS;

export class PdfResourceLoader extends ResourceLoader {
  private _pdf;
  private _page;
  private _pendingReload;

  constructor() {
    PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (PDFJS as any).version }/pdf.worker.min.js`;
    super();
    this.showItemsQuantity = true;
  }

  setUp() {
    if (this.loading) { return; }
    const loadingTask: any = PDFJS.getDocument(this.src);
    const vm = this;
    this.loading = true;
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
    this._pdf.getPage(this.currentItem).then((pdfPage) => {
      vm._page = pdfPage;
      vm.loadImage(() => {
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

  private loadImage(onFinish: () => void) {
    const vm = this;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pageVp = this._page.getViewport(2);

    canvas.width = pageVp.width;
    canvas.height = pageVp.height;

    var renderContext = {
      canvasContext: context,
      viewport: pageVp
    };
    var renderTask = this._page.render(renderContext);
    renderTask.then(function () {
      canvas.toBlob(blob => {
        var img = new Image();
        img.onload = onFinish
        img.src = URL.createObjectURL(blob);
        vm._image = img;
      });
    });
  }
}

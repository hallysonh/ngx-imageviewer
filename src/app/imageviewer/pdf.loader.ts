import * as pdfjs from 'pdfjs-dist/build/pdf';
window['pdfjs-dist/build/pdf'] = pdfjs;
import 'pdfjs-dist/web/pdf_viewer';

import { ResourceLoader, Dimension, toSquareAngle } from "./imageviewer.model";
import { ImageViewerConfig } from "./imageviewer.config";

declare var PDFJS;

export class PdfResourceLoader extends ResourceLoader {
  private _pdf;
  private _page;

  constructor() {
    super();
    PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (PDFJS as any).version }/pdf.worker.min.js`;
    this.showItemsQuantity = true;
    this.loading = true;
  }

  loadResource() {
    const loadingTask: any = PDFJS.getDocument(this.src);
    const vm = this;
    loadingTask.promise.then(function (pdf) {
      console.log('PDF loaded');
      vm._pdf = pdf;
      vm.totalItem = pdf.numPages;
      vm._pdf.getPage(vm.currentItem).then(function (pdfPage) {
        console.log('Page loaded');
        vm._page = pdfPage;
        vm.loadImage(() => {
          vm.loaded = !!(vm._image && vm._image.width);
          vm.loading = false;
          vm.resourceChange.next();
        });
      });
    }, function (reason) {
      // PDF loading error
      console.error(reason);
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

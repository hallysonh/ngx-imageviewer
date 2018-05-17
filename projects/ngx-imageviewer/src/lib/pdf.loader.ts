import { ResourceLoader, Dimension, toSquareAngle } from './imageviewer.model';
import { ImageCacheService } from './imagecache.service';
import { ImageViewerConfig } from './imageviewer.config';
import { PDFJSStatic, PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

declare var pdfjsLib: any;
declare var pdfjsWorker: any;

export class PdfResourceLoader extends ResourceLoader {
  private _pdf: PDFDocumentProxy;
  private _page: PDFPageProxy;
  private _pendingReload: boolean;

  constructor(private _imageCache: ImageCacheService) {
    super();
    if (typeof window !== 'undefined' && 'Worker' in window) {
      if (pdfjsLib && pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      }
    }
    this.showItemsQuantity = true;
  }

  setUp() {
    const vm = this;
    if (vm.loading || !vm.src) { return; }
    const loadingTask = pdfjsLib.getDocument(vm.src);
    vm.loading = true;
    vm.currentItem = 1;
    loadingTask.then((pdf: PDFDocumentProxy) => {
      vm._pdf = pdf;
      vm.totalItem = pdf.numPages;
      vm.loaded = true;
      vm.loadResource();
    }, (reason: string) => {
      console.error(reason);
    });
  }

  loadResource() {
    const vm = this;
    if (!vm.loaded) {
      vm._pendingReload = true;
      return;
    }
    vm.loaded = false;
    const url = vm.src;
    const page = vm.currentItem;

    vm._pdf.getPage(page).then((pdfPage) => {
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

  private loadImage(src: string, page: number, onFinish: () => void) {
    const vm = this;
    const cacheimg = vm._imageCache.getImage(src, page);
    if (cacheimg) {
      vm._image = cacheimg;
      onFinish();
      return;
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pageVp = vm._page.getViewport(2);

    canvas.width = pageVp.width;
    canvas.height = pageVp.height;

    const renderContext = {
      canvasContext: context,
      viewport: pageVp
    };
    const renderTask = vm._page.render(renderContext);
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

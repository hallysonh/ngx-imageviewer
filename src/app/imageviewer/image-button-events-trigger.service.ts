import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ImageButtonEventsTriggerService {

  private zoomInEmitter = new Subject;
  private zoomOutEmitter = new Subject;
  private rotateLeft = new Subject;
  private rotateRight = new Subject;
  private resetImage = new Subject;

  constructor() {
  }

  emitZoomIn() {
    this.zoomInEmitter.next();
  }

  zoomInListener() {
    return this.zoomInEmitter;
  }

  emitZoomOut() {
    this.zoomOutEmitter.next();
  }

  zoomOutListener() {
    return this.zoomOutEmitter;
  }

  rotateLeftListener() {
    return this.rotateLeft;
  }

  emitRotateLeft() {
    this.rotateLeft.next();
  }

  rotateRightListener() {
    return this.rotateRight;
  }

  emitRotateRight() {
    this.rotateRight.next();
  }

  resetImageListener() {
    return this.resetImage;
  }

  emitResetImage() {
    this.resetImage.next();
  }
}

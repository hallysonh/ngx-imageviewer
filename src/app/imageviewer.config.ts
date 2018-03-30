import { ImageViewerConfig } from './imageviewer/imageviewer.config';

export const MY_IMAGEVIEWER_CONFIG: ImageViewerConfig = {
  rotateStepper: true,
  nextPageButton: { tooltip: 'Próxima página' },
  beforePageButton: { tooltip: 'Página anterior' },
  zoomInButton: { tooltip: 'Aproximar' },
  zoomOutButton: { tooltip: 'Distanciar' },
  rotateLeftButton: { tooltip: 'Girar esquerda' },
  rotateRightButton: { tooltip: 'Girar direita' },
  resetButton: { tooltip: 'Resetar' },
  messageStyle: {
    fontSize: 20,
    color: 'green',
  },
  buttonStyle: {
    bgStyle: '#B71C1C',
    borderWidth: 2,
    borderStyle: '#FFFFFF',
    iconStyle: '#FFFFFF'
  }
};

# Angular 6 - Canvas Image/PDF Viewer

[![travis build](https://travis-ci.org/hallysonh/ngx-imageviewer.svg?branch=master)](https://travis-ci.org/hallysonh/ngx-imageviewer)
[![Greenkeeper badge](https://badges.greenkeeper.io/hallysonh/ngx-imageviewer.svg)](https://greenkeeper.io/)
[![version](https://img.shields.io/npm/v/@hallysonh/ngx-imageviewer.svg)](http://npm.im/@hallysonh/ngx-imageviewer)
[![MIT License](https://img.shields.io/github/license/hallysonh/ngx-imageviewer.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This project generate a image/pdf viewer using canvas.

## Features

* Configurable
* Resizeble component
* Supports JPEG, PNG, GIF and **PDF**
* Support File Objects
* Avaliable actions:
  * **Rotate**
  * **Zoom**
  * Reset to maximize size
  * Free movable
  * Change page (available just for PDF files)

## Demo

Access a demo [here](https://hallysonh.github.io/ngx-imageviewer/) or download this project and execute: `yarn && yarn start` or `npm install && npm run start` to self server it.

## Install

Run `yarn add @hallysonh/ngx-imageviewer hammerjs` to install it and its dependency.

> hammerjs is currently mandatory, but it will be optional in a future release.

## Icon Font

You can use any icon font to render the button's icons. However, the default icon font is the Google's Material Icons. To use them you can just add the follow line to your index.html:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Optionaly, you can also install the font library via npm or yarn.

> when using another icon font, you should provide a config object with the button icon mapping

## Basic Usage

After import the module `ImageViewerModule`:

```typescript
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';

@NgModule({
  imports: [
    ImageViewerModule
  ]
})
export class AppModule { }

```

Use the follow code on your html:

```html
<ngx-imageviewer [src]="imageSrc"></ngx-imageviewer>
```

Optionaly, you can provide the fields `width` and `height`. If you omit those values, the width and height in the config object will be used.

## Add PDF Support

To add PDF rendering support, you must first include `pdfjs` by running `yarn add pdfjs-dist@2.0.489` and add its reference in your `angular.json` file, like below:

```json
{
  ...
  "scripts": [
    {
      "input": "node_modules/pdfjs-dist/build/pdf.min.js"
    }, {
      "input": "node_modules/pdfjs-dist/build/pdf.worker.min.js"
    }
  ],
  ...
}
```

## Custom Configuration

Optionaly, you can provide a custom configuration like below:

```typescript
import { IMAGEVIEWER_CONFIG, ImageViewerConfig } from '@hallysonh/ngx-imageviewer';
...
const MY_IMAGEVIEWER_CONFIG: ImageViewerConfig = {
  buttonStyle: {
    bgStyle: '#B71C1C' // custom container's background style
  }
};
...
@Component({
  ...
  providers: [
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: MY_IMAGEVIEWER_CONFIG
    }
  ]
  ...
})
...
```

The default configuration available is:

```typescript
export const IMAGEVIEWER_CONFIG_DEFAULT: ImageViewerConfig = {
  width: 800, // component default width
  height: 600, // component default height
  bgStyle: '#ECEFF1', // component background style
  scaleStep: 0.1, // zoom scale step (using the zoom in/out buttons)
  rotateStepper: false, // touch rotate should rotate only 90 to 90 degrees
  loadingMessage: 'Loading...',
  buttonStyle: {
    iconFontFamily: 'Material Icons', // font used to render the button icons
    alpha: 0.5, // buttons' transparence value
    hoverAlpha: 0.7, // buttons' transparence value when mouse is over
    bgStyle: '#000000', //  buttons' background style
    iconStyle: '#ffffff', // buttons' icon colors
    borderStyle: '#000000', // buttons' border style
    borderWidth: 0 // buttons' border width (0 == disabled)
  },
  tooltips: {
    enabled: true, // enable or disable tooltips for buttons
    bgStyle: '#000000', // tooltip background style
    bgAlpha: 0.5, // tooltip background transparence
    textStyle: '#ffffff', // tooltip's text style
    textAlpha: 0.9, // tooltip's text transparence
    padding: 15, // tooltip padding
    radius: 20 // tooltip border radius
  },
  zoomOutButton: { // zoomOut button config
    icon: 'zoom_out', // icon text
    tooltip: 'Zoom out', // button tooltip
    sortId: 0, // number used to determine the order of the buttons
    show: true // used to show/hide the button
  },

  // shorter button configuration style
  nextPageButton: createButtonConfig('navigate_next', 'Next page', 0),
  beforePageButton: createButtonConfig('navigate_before', 'Previous page', 1),
  zoomInButton: createButtonConfig('zoom_in', 'Zoom in', 1),
  rotateLeftButton: createButtonConfig('rotate_left', 'Rotate left', 2),
  rotateRightButton: createButtonConfig('rotate_right', 'Rotate right', 3),
  resetButton: createButtonConfig('autorenew', 'Reset', 4)
};
```

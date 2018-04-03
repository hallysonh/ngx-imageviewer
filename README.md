# Angular 5 - Canvas Image Viewer

This project generate a image viewer using canvas.

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

To use ngx-imageviewer in your project, install it via _npm_:

```bash
npm i -S @hallysonh/ngx-imageviewer
```

or via _yarn_:

```bash
yarn add @hallysonh/ngx-imageviewer
```

## Icon Font

You can use any icon font to render the button's icons. However, the default icon font is the Google's Material Icons. To use them you can just add the follow line to your index.html:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Optionaly, you can also install the font library via npm or yarn.

## HammerJs

To add touch support, add HammerJs in your dependencies by `yarn add hammerjs` or `npm i -S hammerjs` and include on your main module import:

```typescript
import 'hammerjs';
```

## Simplest use

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

## Support PDF

To support PDF files you must first include `pdfjs` by `yarn add pdfjs-dist` and add its reference in your `.angular-cli.json` file, like below:

```json
{
  ...
  "scripts": [
    "../node_modules/pdfjs-dist/build/pdf.min.js"
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
  loadingErrorMessage: 'Whoops, something bad happend.',
  messageStyle: {
    color: '#333',
    errorColor: 'red',
    fontSize: 25,
    fontFamily: 'Verdana, Geneva, sans-serif', // fonts for text messages
  },
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

  // short button configuration
  nextPageButton: createButtonConfig('navigate_next', 'Next page', 0),
  beforePageButton: createButtonConfig('navigate_before', 'Previous page', 1),
  zoomInButton: new ButtonConfig('zoom_in', 'Zoom in', 1),
  rotateLeftButton: new ButtonConfig('rotate_left', 'Rotate left', 2),
  rotateRightButton: new ButtonConfig('rotate_right', 'Rotate right', 3),
  resetButton: new ButtonConfig('autorenew', 'Reset', 4)
};
```

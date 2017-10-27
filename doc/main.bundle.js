webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Ngx-ImageViewer Demo</h1>\r\n<div class=\"canvasForm\">\r\n    <div>\r\n        <label>Image Url: </label>\r\n        <input [(ngModel)]=\"imageSrc\" size=\"100\">\r\n    </div>\r\n    <div>\r\n        <label>Canvas Dimention:</label>\r\n        <input [(ngModel)]=\"canvasWidth\">\r\n        <span>X</span>\r\n        <input [(ngModel)]=\"canvasHeight\">\r\n    </div>\r\n</div>\r\n\r\n<ngx-imageviewer [src]=\"imageSrc\" [width]=\"canvasWidth\" [height]=\"canvasHeight\"></ngx-imageviewer>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n  :host .canvasForm {\n    width: 100%;\n    margin-bottom: 10px;\n    padding: 20px 0; }\n    :host .canvasForm > div {\n      margin-bottom: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageviewer_imageviewer_config__ = __webpack_require__("../../../../../src/app/imageviewer/imageviewer.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MY_IMAGEVIEWER_CONFIG = {
    rotateStepper: true,
    zoomInButton: { tooltip: 'Aproximar' },
    zoomOutButton: { tooltip: 'Distanciar' },
    rotateLeftButton: { tooltip: 'Girar esquerda' },
    rotateRightButton: { tooltip: 'Girar direita' },
    resetButton: { tooltip: 'Resetar' },
    buttonStyle: {
        bgStyle: '#B71C1C',
        borderWidth: 2,
        borderStyle: '#FFFFFF',
        iconStyle: '#FFFFFF'
    }
};
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.imageSrc = 'https://dummyimage.com/1024x768/000/fff.jpg';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'ngx-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__imageviewer_imageviewer_config__["a" /* IMAGEVIEWER_CONFIG */],
                    useValue: MY_IMAGEVIEWER_CONFIG
                }
            ]
        })
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageviewer_imageviewer_module__ = __webpack_require__("../../../../../src/app/imageviewer/imageviewer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_0__imageviewer_imageviewer_module__["a" /* ImageViewerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/imageviewer/imageviewer.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas #imageContainer [width]=\"width\" [height]=\"height\" (tap)=\"onTap($event)\" (pinchin)=\"processTouchEvent($event)\" (pinchout)=\"processTouchEvent($event)\" (panmove)=\"processTouchEvent($event)\" (panend)=\"onTouchEnd()\" (rotatemove)=\"processTouchEvent($event)\"\r\n    (rotateend)=\"onTouchEnd()\">\r\n</canvas>"

/***/ }),

/***/ "../../../../../src/app/imageviewer/imageviewer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n  :host canvas {\n    margin: 0 auto;\n    display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/imageviewer/imageviewer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageViewerComponent; });
/* unused harmony export Button */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageviewer_config__ = __webpack_require__("../../../../../src/app/imageviewer/imageviewer.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var ImageViewerComponent = /** @class */ (function () {
    //#endregion
    //#region Lifecycle events
    function ImageViewerComponent(sanitizer, renderer, config) {
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.config = config;
        // dirty state
        this.dirty = true;
        // Image Scale
        this.scale = 1;
        this.minScale = 0;
        this.maxScale = 4;
        this.angle = 0;
        // Image centre (scroll offset)
        this.centre = { x: 0, y: 0 };
        // contains all active buttons
        this.buttons = [];
        // current tool tip (used to track change of tool tip)
        this.currentTooltip = null;
        // cached data when touch events started
        this.touchStartState = {};
        // list of event listener destroyers
        this.listenDestroyList = [];
        // image
        this.image = new Image();
        this.config = this.extendsDefaultConfig(config);
        this.zoomOutButton = new Button(this.config.zoomOutButton, this.config.buttonStyle);
        this.zoomInButton = new Button(this.config.zoomInButton, this.config.buttonStyle);
        this.rotateLeftButton = new Button(this.config.rotateLeftButton, this.config.buttonStyle);
        this.rotateRightButton = new Button(this.config.rotateRightButton, this.config.buttonStyle);
        this.resetButton = new Button(this.config.resetButton, this.config.buttonStyle);
        this.buttons = [
            this.zoomOutButton,
            this.zoomInButton,
            this.rotateLeftButton,
            this.rotateRightButton,
            this.resetButton
        ].filter(function (item) { return item.display; })
            .sort(function (a, b) { return a.sortId - b.sortId; });
    }
    Object.defineProperty(ImageViewerComponent.prototype, "src", {
        get: function () { return this._src; },
        set: function (value) {
            if (value === this._src) {
                return;
            }
            this._src = value;
            if (this.image.src) {
                this.image.src = this._src;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewerComponent.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) {
            if (value === this._width) {
                return;
            }
            this._width = value;
            if (this.canvas) {
                this.canvas.width = this._width;
            }
            this.resetImage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewerComponent.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) {
            if (value === this._height) {
                return;
            }
            this._height = value;
            if (this.canvas) {
                this.canvas.height = this._height;
            }
            this.resetImage();
        },
        enumerable: true,
        configurable: true
    });
    ImageViewerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.canvas = this.canvasRef.nativeElement;
        this.context = this.canvas.getContext('2d');
        // setting canvas dimention
        this.canvas.width = this.width || this.config.width;
        this.canvas.height = this.height || this.config.height;
        // setting image
        this.image.addEventListener('load', function (evt) { return _this.updateCanvas(); }, false);
        this.image.src = this.src;
        // setting buttons actions
        this.zoomOutButton.onClick = function (evt) { _this.zoomOut(); return false; };
        this.zoomInButton.onClick = function (evt) { _this.zoomIn(); return false; };
        this.rotateLeftButton.onClick = function (evt) { _this.rotateLeft(); return false; };
        this.rotateRightButton.onClick = function (evt) { _this.rotateRight(); return false; };
        this.resetButton.onClick = function (evt) { _this.resetImage(); return false; };
        // register event listeners
        this.addEventListeners();
    };
    ImageViewerComponent.prototype.ngOnDestroy = function () {
        // unregiste event listeners
        this.listenDestroyList.forEach(function (listenDestroy) {
            if (typeof listenDestroy === 'function') {
                listenDestroy();
            }
        });
    };
    //#endregion
    //#region Touch events
    ImageViewerComponent.prototype.onTap = function (evt) {
        var activeElement = this.getUIElement(this.screenToCanvasCentre(evt.center));
        if (activeElement !== null) {
            activeElement.onClick(evt);
        }
    };
    ImageViewerComponent.prototype.onTouchEnd = function () {
        this.touchStartState.centre = undefined;
        this.touchStartState.scale = undefined;
        this.touchStartState.rotate = undefined;
    };
    ImageViewerComponent.prototype.processTouchEvent = function (evt) {
        // process pan
        if (!this.touchStartState.centre) {
            this.touchStartState.centre = this.centre;
        }
        this.centre = {
            x: this.touchStartState.centre.x + evt.deltaX,
            y: this.touchStartState.centre.y + evt.deltaY
        };
        // process pinch in/out
        if (!this.touchStartState.scale) {
            this.touchStartState.scale = this.scale;
        }
        var newScale = this.touchStartState.scale * evt.scale;
        this.scale = newScale > this.maxScale ? this.maxScale : newScale < this.minScale ? this.minScale : newScale;
        // process rotate left/right
        if (!this.touchStartState.rotate) {
            this.touchStartState.rotate = { angle: this.angle, startRotate: evt.rotation };
        }
        if (evt.rotation !== 0) {
            var newAngle = this.touchStartState.rotate.angle + evt.rotation - this.touchStartState.rotate.startRotate;
            this.angle = this.config.rotateStepper ? this.toSquareAngle(newAngle) : newAngle;
        }
        this.dirty = true;
    };
    //#endregion
    //#region Mouse Events
    ImageViewerComponent.prototype.addEventListeners = function () {
        var _this = this;
        // zooming
        this.listenDestroyList.push(this.renderer.listen(this.canvas, 'DOMMouseScroll', function (evt) { return _this.onMouseWheel(evt); }));
        this.listenDestroyList.push(this.renderer.listen(this.canvas, 'mousewheel', function (evt) { return _this.onMouseWheel(evt); }));
        // show tooltip when mouseover it
        this.listenDestroyList.push(this.renderer.listen(this.canvas, 'mousemove', function (evt) {
            return _this.checkTooltipActivation(_this.screenToCanvasCentre({ x: evt.clientX, y: evt.clientY }));
        }));
    };
    ImageViewerComponent.prototype.onMouseWheel = function (evt) {
        if (!evt) {
            evt = event;
        }
        evt.preventDefault();
        if (evt.detail < 0 || evt.wheelDelta > 0) {
            this.zoomIn();
        }
        else {
            this.zoomOut();
        }
    };
    ImageViewerComponent.prototype.checkTooltipActivation = function (pos) {
        this.getUIElements().forEach(function (x) { return x.hover = false; });
        var activeElement = this.getUIElement(pos);
        var oldToolTip = this.currentTooltip;
        if (activeElement !== null) {
            if (typeof activeElement.hover !== 'undefined') {
                activeElement.hover = true;
            }
            if (typeof activeElement.tooltip !== 'undefined') {
                this.currentTooltip = activeElement.tooltip;
            }
        }
        if (oldToolTip !== this.currentTooltip) {
            this.dirty = true;
        }
    };
    //#endregion
    //#region Button Actions
    ImageViewerComponent.prototype.zoomIn = function () {
        var newScale = this.scale * (1 + this.config.scaleStep);
        this.scale = newScale > this.maxScale ? this.maxScale : newScale;
        this.dirty = true;
    };
    ImageViewerComponent.prototype.zoomOut = function () {
        var newScale = this.scale * (1 - this.config.scaleStep);
        this.scale = newScale < this.minScale ? this.minScale : newScale;
        this.dirty = true;
    };
    ImageViewerComponent.prototype.rotateLeft = function () {
        this.angle = this.angle === 0 ? 270 : this.angle - 90;
        this.dirty = true;
    };
    ImageViewerComponent.prototype.rotateRight = function () {
        this.angle = this.angle === 270 ? 0 : this.angle + 90;
        this.dirty = true;
    };
    ImageViewerComponent.prototype.resetImage = function () {
        if (!this.image || !this.image.width || !this.canvas) {
            return;
        }
        var inverted = this.toSquareAngle(this.angle) / 90 % 2 !== 0;
        var canvas = {
            width: !inverted ? this.canvas.width : this.canvas.height,
            height: !inverted ? this.canvas.height : this.canvas.width
        };
        if (((canvas.height / this.image.height) * this.image.width) <= canvas.width) {
            this.scale = canvas.height / this.image.height;
        }
        else {
            this.scale = canvas.width / this.image.width;
        }
        this.minScale = this.scale / 4;
        this.maxScale = this.scale * 4;
        // centre at image centre
        this.centre.x = this.canvas.width / 2;
        this.centre.y = this.canvas.height / 2;
        // image changed
        this.dirty = true;
    };
    //#endregion
    //#region Draw Canvas
    ImageViewerComponent.prototype.updateCanvas = function () {
        if (!this.image || !this.image.width) {
            return;
        }
        this.resetImage();
        // start new render loop
        this.render();
    };
    ImageViewerComponent.prototype.render = function () {
        var _this = this;
        // only re-render if dirty
        if (this.dirty) {
            this.dirty = false;
            var ctx = this.context;
            // clear canvas
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Draw background color;
            ctx.fillStyle = this.config.bgStyle;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            // draw image (transformed, rotate and scaled)
            ctx.save();
            ctx.translate(this.centre.x, this.centre.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.scale(this.scale, this.scale);
            ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            ctx.restore();
            // draw buttons
            this.drawButtons(ctx);
        }
        requestAnimationFrame(function () { return _this.render(); });
    };
    ImageViewerComponent.prototype.drawButtons = function (ctx) {
        var padding = this.config.tooltips.padding;
        var radius = this.config.tooltips.radius;
        var gap = 2 * radius + padding;
        var x = this.canvas.width - radius - padding;
        var y = this.canvas.height - radius - padding;
        // draw buttons
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(ctx, x, y - gap * i, radius);
        }
        // draw tooltip
        if (this.currentTooltip !== null) {
            ctx.save();
            var fontSize = radius;
            ctx.font = fontSize + 'px sans-serif';
            // calculate position
            var textSize = ctx.measureText(this.currentTooltip).width, rectWidth = textSize + padding, rectHeight = fontSize * 0.70 + padding, rectX = this.canvas.width
                - (2 * radius + 2 * padding) // buttons
                - rectWidth, rectY = this.canvas.height - rectHeight - padding, textX = rectX + 0.5 * padding, textY = this.canvas.height - 1.5 * padding;
            ctx.globalAlpha = this.config.tooltips.bgAlpha;
            ctx.fillStyle = this.config.tooltips.bgStyle;
            this.drawRoundRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 8, true, false);
            ctx.globalAlpha = this.config.tooltips.textAlpha;
            ctx.fillStyle = this.config.tooltips.textStyle;
            ctx.fillText(this.currentTooltip, textX, textY);
            ctx.restore();
        }
    };
    ImageViewerComponent.prototype.drawRoundRectangle = function (ctx, x, y, width, height, radius, fill, stroke) {
        radius = (typeof radius === 'number') ? radius : 5;
        fill = (typeof fill === 'boolean') ? fill : true; // fill = default
        stroke = (typeof stroke === 'boolean') ? stroke : false;
        // draw round rectangle
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    };
    //#endregion
    //#region Utils
    ImageViewerComponent.prototype.toSquareAngle = function (angle) {
        return 90 * ((Math.trunc(angle / 90) + (Math.trunc(angle % 90) > 45 ? 1 : 0)) % 4);
    };
    ImageViewerComponent.prototype.extendsDefaultConfig = function (cfg) {
        var defaultCfg = __WEBPACK_IMPORTED_MODULE_2__imageviewer_config__["b" /* IMAGEVIEWER_CONFIG_DEFAULT */];
        var localCfg = Object.assign({}, defaultCfg, cfg);
        if (cfg.buttonStyle) {
            localCfg.buttonStyle = Object.assign(defaultCfg.buttonStyle, cfg.buttonStyle);
        }
        if (cfg.tooltips) {
            localCfg.tooltips = Object.assign(defaultCfg.tooltips, cfg.tooltips);
        }
        if (cfg.zoomOutButton) {
            localCfg.zoomOutButton = Object.assign(defaultCfg.zoomOutButton, cfg.zoomOutButton);
        }
        if (cfg.zoomInButton) {
            localCfg.zoomInButton = Object.assign(defaultCfg.zoomInButton, cfg.zoomInButton);
        }
        if (cfg.rotateLeftButton) {
            localCfg.rotateLeftButton = Object.assign(defaultCfg.rotateLeftButton, cfg.rotateLeftButton);
        }
        if (cfg.rotateRightButton) {
            localCfg.rotateRightButton = Object.assign(defaultCfg.rotateRightButton, cfg.rotateRightButton);
        }
        if (cfg.resetButton) {
            localCfg.resetButton = Object.assign(defaultCfg.resetButton, cfg.resetButton);
        }
        return localCfg;
    };
    ImageViewerComponent.prototype.screenToCanvasCentre = function (pos) {
        var rect = this.canvas.getBoundingClientRect();
        return { x: pos.x - rect.left, y: pos.y - rect.top };
    };
    ImageViewerComponent.prototype.getUIElements = function () {
        return this.buttons;
    };
    ImageViewerComponent.prototype.getUIElement = function (pos) {
        var activeUIElement = this.getUIElements().filter(function (uiElement) {
            return uiElement.isWithinBounds(pos.x, pos.y);
        });
        return (activeUIElement.length > 0) ? activeUIElement[0] : null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('src'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageViewerComponent.prototype, "src", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('width'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageViewerComponent.prototype, "width", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('height'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageViewerComponent.prototype, "height", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('imageContainer'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
    ], ImageViewerComponent.prototype, "canvasRef", void 0);
    ImageViewerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngx-imageviewer',
            template: __webpack_require__("../../../../../src/app/imageviewer/imageviewer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/imageviewer/imageviewer.component.scss")]
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__imageviewer_config__["a" /* IMAGEVIEWER_CONFIG */])),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Renderer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__imageviewer_config__["c" /* ImageViewerConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__imageviewer_config__["c" /* ImageViewerConfig */]) === "function" && _d || Object])
    ], ImageViewerComponent);
    return ImageViewerComponent;
    var _a, _b, _c, _d;
}());

var Button = /** @class */ (function () {
    //#endregion
    //#region Lifecycle events
    function Button(config, style) {
        this.style = style;
        //#region Properties
        this.sortId = 0;
        // hover state
        this.hover = false;
        // show/hide button
        this.display = true;
        // drawn on position
        this.drawPosition = null;
        this.drawRadius = 0;
        this.sortId = config.sortId;
        this.display = config.show;
        this.icon = config.icon;
        this.tooltip = config.tooltip;
    }
    //#endregion
    //#region Events
    // click action
    Button.prototype.onClick = function (evt) { alert('no click action set!'); return true; };
    // mouse down action
    Button.prototype.onMouseDown = function (evt) { return false; };
    //#endregion
    //#region Draw Button
    Button.prototype.draw = function (ctx, x, y, radius) {
        this.drawPosition = { x: x, y: y };
        this.drawRadius = radius;
        // preserve context
        ctx.save();
        // drawing settings
        var isHover = (typeof this.hover === 'function') ? this.hover() : this.hover;
        ctx.globalAlpha = (isHover) ? this.style.hoverAlpha : this.style.alpha;
        ctx.fillStyle = this.style.bgStyle;
        ctx.lineWidth = 0;
        // draw circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        if (this.style.borderWidth > 0) {
            ctx.lineWidth = this.style.borderWidth;
            ctx.strokeStyle = this.style.borderStyle;
            ctx.stroke();
        }
        // draw icon
        if (this.icon !== null) {
            ctx.save();
            // ctx.globalCompositeOperation = 'destination-out';
            this.drawIconFont(ctx, x, y, radius);
            ctx.restore();
        }
        // restore context
        ctx.restore();
    };
    Button.prototype.drawIconFont = function (ctx, centreX, centreY, size) {
        // font settings
        ctx.font = size + 'px ' + this.style.iconFontFamily;
        ctx.fillStyle = this.style.iconStyle;
        // calculate position
        var textSize = ctx.measureText(this.icon);
        var x = centreX - textSize.width / 2;
        var y = centreY + size / 2;
        // draw it
        ctx.fillText(this.icon, x, y);
    };
    //#endregion
    //#region Utils
    Button.prototype.isWithinBounds = function (x, y) {
        if (this.drawPosition === null) {
            return false;
        }
        var dx = Math.abs(this.drawPosition.x - x), dy = Math.abs(this.drawPosition.y - y);
        return dx * dx + dy * dy <= this.drawRadius * this.drawRadius;
    };
    return Button;
}());

//# sourceMappingURL=imageviewer.component.js.map

/***/ }),

/***/ "../../../../../src/app/imageviewer/imageviewer.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ImageViewerConfig; });
/* unused harmony export ButtonStyle */
/* unused harmony export ButtonConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IMAGEVIEWER_CONFIG_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IMAGEVIEWER_CONFIG; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");

var ImageViewerConfig = /** @class */ (function () {
    function ImageViewerConfig() {
    }
    return ImageViewerConfig;
}());

var ButtonStyle = /** @class */ (function () {
    function ButtonStyle() {
    }
    return ButtonStyle;
}());

var ButtonConfig = /** @class */ (function () {
    function ButtonConfig(icon, tooltip, sortId, show) {
        if (sortId === void 0) { sortId = 0; }
        if (show === void 0) { show = true; }
        this.icon = icon;
        this.tooltip = tooltip;
        this.sortId = sortId;
        this.show = show;
    }
    return ButtonConfig;
}());

var IMAGEVIEWER_CONFIG_DEFAULT = {
    width: 800,
    height: 600,
    bgStyle: '#ECEFF1',
    scaleStep: 0.1,
    rotateStepper: false,
    buttonStyle: {
        iconFontFamily: 'Material Icons',
        alpha: 0.5,
        hoverAlpha: 0.7,
        bgStyle: '#000000',
        iconStyle: '#ffffff',
        borderStyle: '#000000',
        borderWidth: 0 // buttons' border width (0 == disabled)
    },
    tooltips: {
        enabled: true,
        bgStyle: '#000000',
        bgAlpha: 0.5,
        textStyle: '#ffffff',
        textAlpha: 0.9,
        padding: 15,
        radius: 20 // tooltip border radius
    },
    zoomOutButton: new ButtonConfig('zoom_out', 'Zoom out', 0),
    zoomInButton: new ButtonConfig('zoom_in', 'Zoom in', 1),
    rotateLeftButton: new ButtonConfig('rotate_left', 'Rotate left', 2),
    rotateRightButton: new ButtonConfig('rotate_right', 'Rotate right', 3),
    resetButton: new ButtonConfig('autorenew', 'Reset', 4)
};
var IMAGEVIEWER_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* InjectionToken */]('imageviewer.config');
//# sourceMappingURL=imageviewer.config.js.map

/***/ }),

/***/ "../../../../../src/app/imageviewer/imageviewer.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageViewerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageviewer_component__ = __webpack_require__("../../../../../src/app/imageviewer/imageviewer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__imageviewer_config__ = __webpack_require__("../../../../../src/app/imageviewer/imageviewer.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ImageViewerModule = /** @class */ (function () {
    function ImageViewerModule() {
    }
    ImageViewerModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__imageviewer_component__["a" /* ImageViewerComponent */]],
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_3__imageviewer_config__["a" /* IMAGEVIEWER_CONFIG */],
                    useValue: __WEBPACK_IMPORTED_MODULE_3__imageviewer_config__["b" /* IMAGEVIEWER_CONFIG_DEFAULT */]
                }],
            exports: [__WEBPACK_IMPORTED_MODULE_2__imageviewer_component__["a" /* ImageViewerComponent */]]
        })
    ], ImageViewerModule);
    return ImageViewerModule;
}());

//# sourceMappingURL=imageviewer.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/ts/card/card-canvas.ts":
/*!******************************************!*\
  !*** ./resources/ts/card/card-canvas.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CardCanvas = /** @class */ (function () {
    function CardCanvas(containerId, card) {
        this.card = card;
        var container = document.getElementById(containerId);
        container.style.width = card.width + 'px';
        container.style.height = card.height + 'px';
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.id = card.id + '-preview';
        canvas.width = card.width;
        canvas.height = card.height;
        canvas.style.zIndex = "9000";
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        ctx.rect(0, 0, card.width, card.height);
        container.appendChild(canvas);
        this.context = ctx;
        this.canvas = canvas;
    }
    CardCanvas.prototype.drawCanvas = function () {
        var _this = this;
        this.card.cardElements.forEach(function (element) {
            element.drawToCanvasContext(_this.context);
        });
    };
    CardCanvas.prototype.getCanvas = function () {
        return this.canvas;
    };
    CardCanvas.prototype.getContext = function () {
        return this.context;
    };
    CardCanvas.prototype.getCard = function () {
        return this.card;
    };
    return CardCanvas;
}());
exports.default = CardCanvas;


/***/ }),

/***/ "./resources/ts/card/card-image.ts":
/*!*****************************************!*\
  !*** ./resources/ts/card/card-image.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CardImage = /** @class */ (function () {
    function CardImage(id, src, width, height, x, y, order, angle) {
        if (order === void 0) { order = 0; }
        if (angle === void 0) { angle = 0; }
        this.id = id;
        this.src = src;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.order = order;
    }
    CardImage.prototype.drawToCanvasContext = function (context) {
        var image = new Image();
        image.src = this.src;
        context.drawImage(image, this.x, this.y, this.width, this.height);
    };
    CardImage.prototype.display = function (containerId) {
        var _this = this;
        var container = document.getElementById(containerId);
        //check exist canvas with id = id param
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.id = this.id;
        canvas.className = "drag-resize";
        canvas.width = this.width;
        canvas.height = this.height;
        var order = 9000 + this.order;
        canvas.style.zIndex = order.toString();
        canvas.style.left = this.x.toString() + 'px';
        canvas.style.top = this.y.toString() + 'px';
        canvas.style.position = "absolute";
        var image = new Image();
        image.src = this.src;
        image.onload = function () {
            ctx.drawImage(image, 0, 0, _this.width, _this.height);
        };
        container.appendChild(canvas);
    };
    CardImage.prototype.moveTo = function (x, y, containerId) {
        var container = document.getElementById(containerId);
        var rect = container.getBoundingClientRect();
        this.x = x - rect.left;
        this.y = y - rect.top;
    };
    CardImage.prototype.rotate = function (rad) {
        throw new Error("Method not implemented.");
    };
    CardImage.prototype.updateSize = function (w, h) {
        this.width = w;
        this.height = h;
    };
    return CardImage;
}());
exports.default = CardImage;


/***/ }),

/***/ "./resources/ts/card/card-text.ts":
/*!****************************************!*\
  !*** ./resources/ts/card/card-text.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CardImage = /** @class */ (function () {
    function CardImage(id, font, content, width, height, x, y, order, angle) {
        if (order === void 0) { order = 0; }
        if (angle === void 0) { angle = 0; }
        this.id = id;
        this.font = font;
        this.content = content;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.order = order;
    }
    CardImage.prototype.drawToCanvasContext = function (context) {
        context.fillStyle = "blue";
        context.font = "bold 26px Arial";
        context.fillText(this.content, this.x, this.y + (this.height / 2) + 8);
    };
    CardImage.prototype.display = function (containerId) {
        var container = document.getElementById(containerId);
        // <svg id="svg-text-2" xmlns="http://www.w3.org/2000/svg">
        //                     <style>
        //                         .small { font: italic 13px sans-serif; }
        //                         .heavy { font: bold 30px sans-serif; }
        //                         /* Note that the color of the text is set with the    *
        //                         * fill property, the color property is for HTML only */
        //                         .Rrrrr { font: italic 40px serif; fill: red; }
        //                     </style>
        //                     <text id="text-2" x="200" y="35" class="small">My</text>
        //                 </svg>
        // let textSvg = document.createElement("svg");
        // textSvg.id = this.id;
        // let text = document.createElement("text");
        // text.font = "italic 13px sans-serif";
        var card = document.createElement("canvas");
        //check exist canvas with id = id param
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');
        canvas.id = this.id;
        canvas.className = "drag-resize";
        canvas.width = this.width;
        canvas.height = this.height;
        var order = 9000 + this.order;
        canvas.style.zIndex = order.toString();
        canvas.style.left = this.x.toString();
        canvas.style.top = this.y.toString();
        canvas.style.position = "absolute";
        context.fillStyle = "blue";
        context.font = "bold 26px Arial";
        context.fillText(this.content, 0, (canvas.height / 2) + 8);
        container.appendChild(canvas);
    };
    CardImage.prototype.moveTo = function (x, y, containerId) {
        var container = document.getElementById(containerId);
        var rect = container.getBoundingClientRect();
        this.x = x - rect.left;
        this.y = y - rect.top;
    };
    CardImage.prototype.rotate = function (rad) {
        throw new Error("Method not implemented.");
    };
    CardImage.prototype.updateSize = function (w, h) {
        this.width = w;
        this.height = h;
    };
    return CardImage;
}());
exports.default = CardImage;


/***/ }),

/***/ "./resources/ts/card/card.ts":
/*!***********************************!*\
  !*** ./resources/ts/card/card.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(containerId, id, width, height) {
        this.cardElements = [];
        var container = document.getElementById(containerId);
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        canvas.style.zIndex = "9000";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        ctx.rect(0, 0, width, height);
        container.appendChild(canvas);
        this.containerId = containerId;
        this.id = id;
        this.width = width;
        this.height = height;
        this.order = 0;
    }
    Card.prototype.getContainerId = function () {
        return this.containerId;
    };
    Card.prototype.getId = function () {
        return this.id;
    };
    Card.prototype.addCardElement = function (cardElement) {
        this.cardElements.push(cardElement);
    };
    Card.prototype.removeCardElement = function (cardElement) {
        throw new Error("Method not implemented.");
    };
    Card.prototype.findCardElement = function (cardElementId) {
        for (var element_1 in this.cardElements) {
            if (this.cardElements[element_1].id === cardElementId) {
                return this.cardElements[element_1];
            }
        }
        return null;
    };
    return Card;
}());
exports.default = Card;


/***/ }),

/***/ "./resources/ts/card/index.ts":
/*!************************************!*\
  !*** ./resources/ts/card/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var card_image_1 = __webpack_require__(/*! ./card-image */ "./resources/ts/card/card-image.ts");
var card_text_1 = __webpack_require__(/*! ./card-text */ "./resources/ts/card/card-text.ts");
var card_canvas_1 = __webpack_require__(/*! ./card-canvas */ "./resources/ts/card/card-canvas.ts");
var card_1 = __webpack_require__(/*! ./card */ "./resources/ts/card/card.ts");
var card;
var containerId;
var cardCanvas;
var IMAGE = 'image';
var TEXT = 'text';
window.onload = function () {
    var text = new card_text_1.default('text-1', "40pt Calibri", 'Hello', 180, 100, 50, 100);
    text.display(containerId);
    card.addCardElement(text);
    document.getElementById('previewCanvasButton').addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var canvas, imgData, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardCanvas = new card_canvas_1.default('mycanvas', card);
                    return [4 /*yield*/, cardCanvas.drawCanvas()];
                case 1:
                    _a.sent();
                    canvas = cardCanvas.getCanvas();
                    imgData = canvas.toDataURL("image/jpeg", 1.0);
                    console.log(imgData);
                    img = new Image();
                    img.src = imgData;
                    document.getElementById("myImage").append(img);
                    return [2 /*return*/];
            }
        });
    }); });
    document.getElementById('downloadCanvas').addEventListener("click", function (ev) {
        // html2canvas(document.getElementById(card.id), {
        //     onrendered: function(canvas: HTMLCanvasElement) {         
        //         var imgData = canvas.toDataURL('image/png');              
        //         var doc = new jsPDF('p', 'mm');
        //         doc.addImage(imgData, 'PNG', 10, 10);
        //         doc.save('sample-file.pdf');
        //     }
        // });
        var canvas = cardCanvas.getCanvas();
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        console.log(imgData);
        // var pdf = new jsPDF('p', 'mm');
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        //pdf.save("download.pdf");
    });
};
var initCard = function (id, container, width, height) {
    if (card == null) {
        containerId = container;
        card = new card_1.default(containerId, id, width, height);
    }
    else {
        alert('card exist');
    }
};
function updateCardElementPosition(cardElementId, x, y) {
    var cardElement = card.findCardElement(cardElementId);
    if (cardElement != null)
        cardElement.moveTo(x, y, card.getContainerId());
}
exports.updateCardElementPosition = updateCardElementPosition;
function updateCardElementSize(cardElementId, w, h) {
    var cardElement = card.findCardElement(cardElementId);
    if (cardElement != null)
        cardElement.updateSize(w, h);
}
exports.updateCardElementSize = updateCardElementSize;
function getContainer() {
    return document.getElementById(containerId);
}
exports.getContainer = getContainer;
var addCardImage = function addCardImage(id, image, width, height, x, y) {
    var cardImage = new card_image_1.default(id, image, width, height, x, y);
    if (containerId != null)
        cardImage.display(containerId);
    card.addCardElement(cardImage);
};
var addCardText = function addCardText(id, font, size, x, y) {
};
function removeCardElement(type) {
    //
}
exports.removeCardElement = removeCardElement;
var _global = (window);
_global.initCard = initCard;
_global.addCardImage = addCardImage;
_global.addCardText = addCardText;


/***/ }),

/***/ 1:
/*!******************************************!*\
  !*** multi ./resources/ts/card/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/framgia/Desktop/dquangminh/raksul/resources/ts/card/index.ts */"./resources/ts/card/index.ts");


/***/ })

/******/ });
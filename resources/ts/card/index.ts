declare function require(name:string);
import CardImage from './card-image'
import CardText from './card-text';
import CardCanvas from './card-canvas';
import Card from './card';
import { async } from 'q';
import * as $ from 'jquery';

var card: Card;
var containerId: string;
var cardCanvas: CardCanvas;
const IMAGE = 1001;
const TEXT = 1002;
const PRINTDPI = 350;

$(document).ready( () => {
    //         target.style.border = "dashed red";
    initDashedClick();
    document.getElementById('previewCanvasButton').addEventListener("click", () => {

        cardCanvas = new CardCanvas('mycanvas', card);
        cardCanvas.drawCanvas(true);
        
    });
});
function initDashedClick() {
    $(window).on("click.Bst", (event: any) => {
        if (!$('.dashed').is(event.target)) {
            for (let i = 0; i < dashedElements.length; i++) {
                let dashedElement: HTMLButtonElement = dashedElements[i];
                dashedElement.style.border = "";
            };
        }
        
    });
    
    let dashedElements: any;
    dashedElements = document.getElementsByClassName("dashed");
    for (let i = 0; i < dashedElements.length; i++) {
        let dashedElement: HTMLButtonElement = dashedElements[i];
        dashedElement.addEventListener("click", () => {
            for (let i = 0; i < dashedElements.length; i++) {
                let dashedElement: HTMLButtonElement = dashedElements[i];
                dashedElement.style.border = "";
            };
            dashedElement.style.border = "dashed red";
        });
    };

    
}

var getDPI = function getDPI() {
    return 101.6;
    var div = document.createElement( "div");
    div.style.height = "1in";
    div.style.width = "1in";
    div.style.top = "-100%";
    div.style.left = "-100%";
    div.style.position = "absolute";

    document.body.appendChild(div);

    var result =  div.offsetHeight;

    document.body.removeChild( div );

    return result;
}

var initCard = (id: number, name: string, container: string, width: number, height: number) => {
    if (card == null) {
        containerId = container;
        card = new Card(containerId, id, name, width, height);
        this.card = card;
        return card;
    }
    else {
        alert('card exist');
    }
}

var updateCardElementPosition = function updateCardElementPosition(cardElementId: string, x: number, y: number): void {
    let cardElement = card.findCardElement(cardElementId);
    if (cardElement != null)
        cardElement.moveTo(x, y, card.getContainerId());
}

var updateCardElementSize = function updateCardElementSize(cardElementId: string, w: number, h: number): void {
    let cardElement = card.findCardElement(cardElementId);
    if (cardElement != null)
        cardElement.updateSize(w, h);
}

var getContainer = function getContainer(): HTMLElement {
    return document.getElementById(containerId);

}

var addCardImage = function addCardImage(id: number, name: string, image: string, width: number, height: number, x: number, y: number) : void {
    let cardImage = new CardImage(id, name, image, width, height, x, y);
    if (containerId != null) {
        cardImage.display(containerId);
    }
    card.addCardElement(cardImage);
}

var addCardText = function addCardText(id: string, font: string, size: number, x: number, y: number) : void {
    //
}

var removeCardElement = function removeCardElement(type: string): void {
    //
}

const _global = (window) as any
_global.initCard = initCard;
_global.addCardImage = addCardImage;
_global.addCardText = addCardText;
_global.card = this.card;
_global.getContainer = getContainer;
_global.updateCardElementPosition = updateCardElementPosition;
_global.updateCardElementSize = updateCardElementSize;
_global.removeCardElement = removeCardElement;
_global.PRINTDPI = PRINTDPI;
_global.MYDPI = getDPI;
import CardImage from './card-image'
import CardText from './card-text';
import CardCanvas from './card-canvas';
import Card from './card';
import interact from 'interactjs';
import * as jsPDF from 'jspdf';
import { async } from 'q';


var card: Card;
var containerId: string;
var cardCanvas: CardCanvas;
const IMAGE = 'image';
const TEXT = 'text';


window.onload = () => {

    let text = new CardText('text-1', "40pt Calibri", 'Hello', 180, 100, 50, 100);
    text.display(containerId);

    card.addCardElement(text);

    document.getElementById('previewCanvasButton').addEventListener("click", async () => {
        
        cardCanvas = new CardCanvas('mycanvas', card);
        await cardCanvas.drawCanvas();
        var canvas: HTMLCanvasElement;
        canvas = cardCanvas.getCanvas();
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        console.log(imgData);
        var img = new Image();
        img.src = imgData;
        document.getElementById("myImage").append(img);
        // var pdf = new jsPDF('p', 'mm');
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        //pdf.save("download.pdf");
    });

    document.getElementById('downloadCanvas').addEventListener("click", (ev: MouseEvent) => {
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
}

var initCard = (id: string, container: string, width: number, height: number) => {
    if (card == null) {
        containerId = container;
        card = new Card(containerId, id, width, height);
    }
    else {
        alert('card exist');
    }
}

export function updateCardElementPosition(cardElementId: string, x: number, y: number): void {
    let cardElement = card.findCardElement(cardElementId);
    if (cardElement != null)
        cardElement.moveTo(x, y, card.getContainerId());
}

export function updateCardElementSize(cardElementId: string, w: number, h: number): void {
    let cardElement = card.findCardElement(cardElementId);
    if (cardElement != null)
        cardElement.updateSize(w, h);
}

export function getContainer(): HTMLElement {
    return document.getElementById(containerId);

}

var addCardImage = function addCardImage(id: string, image: string, width: number, height: number, x: number, y: number) : void {
    let cardImage = new CardImage(id, image, width, height, x, y);
    if (containerId != null)
        cardImage.display(containerId);
    card.addCardElement(cardImage);
}

var addCardText = function addCardText(id: string, font: string, size: number, x: number, y: number) : void {

}

export function removeCardElement(type: string): void {
    //
}

const _global = (window) as any
_global.initCard = initCard;
_global.addCardImage = addCardImage;
_global.addCardText = addCardText;
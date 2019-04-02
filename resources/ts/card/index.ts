import CardImage from './card-image'
import CardText from './card-text';
import CardCanvas from './card-canvas';
import Card from './card';
import interact from 'interactjs';
import * as jsPDF from 'jspdf';
import { async } from 'q';
import * as $ from 'jquery';

var card: Card;
var containerId: string;
var cardCanvas: CardCanvas;
const IMAGE = 1001;
const TEXT = 1002;
const PRINTDPI = 350;

$(document).ready( () => {
    document.getElementById('previewCanvasButton').addEventListener("click", async () => {
        cardCanvas = new CardCanvas('mycanvas', card);
        await cardCanvas.drawCanvas(exportPdf());

        function exportPdf(): any {
            let canvas = cardCanvas.getCanvas();
            let imgData = canvas.toDataURL("image/jpeg", 1.0);
            console.log(imgData);
            var img = new Image();
            img.src = imgData;
            document.getElementById("myImage").append(img);
        }
        
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
        // var pdf = new jsPDF('p', 'mm');
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        //pdf.save("download.pdf");
    });
});
var getDPI = function getDPI() {
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
    console.log(cardElementId);
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
    if (containerId != null)
        cardImage.display(containerId);
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
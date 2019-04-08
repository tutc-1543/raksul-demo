import Card from './card';
import CardElement from './card-element';
const _global = (window) as any;

export default class CardCanvas {
    context: CanvasRenderingContext2D;
    card: Card;
    canvas: HTMLCanvasElement;
    scaleDPI: number;
    constructor(containerId: string, card: Card) {
        this.card = card;
        let MYDPI = _global.MYDPI();
        let PRINTDPI = _global.PRINTDPI;
        this.scaleDPI = PRINTDPI/MYDPI;

        const container = document.getElementById(containerId);
        container.style.width = card.width*this.scaleDPI + 'px';
        container.style.height = card.height*this.scaleDPI + 'px';

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');
        canvas.id = card.id + '-preview';
        canvas.width  = card.width*this.scaleDPI;
        canvas.height = card.height*this.scaleDPI;
        canvas.style.zIndex = "9000";
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        container.appendChild(canvas);

        this.context = ctx;
        this.canvas = canvas;
    }

    drawCanvas(download: boolean = false) {
        this.card.cardElements.sort((e1: CardElement, e2: CardElement) => {
            return e1.order < e2.order ? 1 : -1;
        });

        let canvas = this.canvas, ctx = this.context;
        let loadCardElements = [];
        let i = 0;
        this.card.cardElements.forEach(element => {
            loadCardElements[i++] = element.drawToCanvasContext(this.context, this.scaleDPI, this.card.zoom);
        });
        
        var dataURL;
        
        Promise.all(loadCardElements).then(function(value) {
            dataURL = canvas.toDataURL("image/png");
            var download = document.getElementById("downloadCard");
            var imageData = dataURL;
            download.setAttribute("href", imageData);
            download.click();
        }, function(reason) {
            console.error(reason);
        });
            
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getContext() {
        return this.context;
    }

    getCard() {
        return this.card;
    }
}

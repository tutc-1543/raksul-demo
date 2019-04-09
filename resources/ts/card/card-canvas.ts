import Card from './card';
import CardElement from './card-element';
const _global = (window) as any;
var myTimeout;

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
        // this.card.cardElements.sort((e1: CardElement, e2: CardElement) => {
        //     return e1.order < e2.order ? 1 : -1;
        // });

        var context = this.context, scaleDPI = this.scaleDPI, zoom = this.card.zoom, dataURL, canvas = this.canvas;
        function drawContext(cardElements: CardElement[], position: number = 0) {
            if (position == cardElements.length) {
                dataURL = canvas.toDataURL("image/png");
                var download = document.getElementById("downloadCard");
                var imageData = dataURL;
                download.setAttribute("href", imageData);
                download.click();
                clearTimeout(myTimeout);
            }

            var cardElement : any = cardElements[position];
            var image = new Image();
            let x = cardElement.x, y = cardElement.y, width = cardElement.width, height = cardElement.height;
            x = (x/zoom)*scaleDPI;
            console.log(zoom);
            y = (y/zoom)*scaleDPI;
            width = (width/zoom)*scaleDPI;
            height = (height/zoom)*scaleDPI;
            image.src = cardElement.src;
            image.onload = () => {
                context.drawImage(image, x, y, width, height);
            };

            myTimeout = setTimeout(() => drawContext(cardElements, position + 1), 200);
        }

        drawContext(this.card.cardElements);
        // var dataURL;
        // let context = this.context, scaleDPI = this.scaleDPI, zoom = this.card.zoom;
        // const promiseChain = this.card.cardElements.reduce((chain, d) => chain.then(() => {
        //         d.drawToCanvasContext(context, scaleDPI, zoom);
        //     }), Promise.resolve());

        // promiseChain.then(() => {
        //     dataURL = canvas.toDataURL("image/png");
        //     console.log(dataURL);
        //     var download = document.getElementById("downloadCard");
        //     var imageData = dataURL;
        //     download.setAttribute("href", imageData);
        //     download.click();
        // }, function(reason) {
        //     console.error(reason);
        // });

        // Promise.all(loadCardElements).then(function(value) {
        //     dataURL = canvas.toDataURL("image/png");
        //     var download = document.getElementById("downloadCard");
        //     var imageData = dataURL;
        //     download.setAttribute("href", imageData);
        //     download.click();
        // }, function(reason) {
        //     console.error(reason);
        // });
            
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

import Card from './card';
import CardElement from './card-element';

export default class CardCanvas {
    context: CanvasRenderingContext2D;
    card: Card;
    canvas: HTMLCanvasElement
    constructor(containerId: string, card: Card) {
        this.card = card;

        const container = document.getElementById(containerId);
        container.style.width = card.width*4 + 'px';
        container.style.height = card.height*4 + 'px';

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');
        canvas.id = card.id + '-preview';
        canvas.width  = card.width*4;
        canvas.height = card.height*4;
        canvas.style.zIndex = "9000";
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        container.appendChild(canvas);

        this.context = ctx;
        this.canvas = canvas;
    }

    drawCanvas(_callback?: () => any) {
        this.card.cardElements.sort((e1: CardElement, e2: CardElement) => {
            return e1.order < e2.order ? 1 : -1;
        })
        this.card.cardElements.forEach(element => {
            element.drawToCanvasContext(this.context);
        });

        if (_callback != null) {
            return _callback();
        }
            
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

import Card from './card';

export default class CardCanvas {
    context: CanvasRenderingContext2D;
    card: Card;
    canvas: HTMLCanvasElement
    constructor(containerId: string, card: Card) {
        this.card = card;

        const container = document.getElementById(containerId);
        container.style.width = card.width + 'px';
        container.style.height = card.height + 'px';

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');
        canvas.id = card.id + '-preview';
        canvas.width  = card.width;
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

    drawCanvas() {
        this.card.cardElements.forEach(element => {
            element.drawToCanvasContext(this.context);
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

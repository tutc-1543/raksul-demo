import CardElement from './card-element'

export default class CardImage implements CardElement {
    
    id: string;
    src: string;
    width: number;
    height: number;
    angle: number;
    x: number;
    y: number;
    order: number;

    constructor(
        id: string,
        src: string,
        width: number,
        height: number,
        x: number,
        y: number,
        order: number = 0,
        angle: number = 0,
    ) {
        this.id = id;
        this.src = src;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.order = order;
    }
    
    drawToCanvasContext(context: CanvasRenderingContext2D) {
        var image = new Image();
        image.src = this.src;
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

    display(containerId: string) {
        let container = document.getElementById(containerId);

        //check exist canvas with id = id param
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');

        canvas.id = this.id;
        canvas.className = "drag-resize";
        canvas.width  = this.width;
        canvas.height = this.height;
        let order = 9000 + this.order;
        canvas.style.zIndex = order.toString();
        canvas.style.left = this.x.toString() + 'px';
        canvas.style.top = this.y.toString() + 'px';
        canvas.style.position = "absolute";
        var image = new Image();
        image.src = this.src;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, this.width, this.height);
        }

        container.appendChild(canvas);
    }

    moveTo(x: number, y: number, containerId: string): void {
        const container = document.getElementById(containerId);
        var rect = container.getBoundingClientRect();
        this.x = x - rect.left;
        this.y = y - rect.top;
    }

    rotate(rad: number): void {
        throw new Error("Method not implemented.");
    }

    updateSize(w: number, h: number): void {
        this.width = w;
        this.height = h;
    }
}

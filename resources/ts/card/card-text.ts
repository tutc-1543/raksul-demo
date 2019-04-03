import CardElement from './card-element'

export default class CardImage implements CardElement {
    
    id: string;
    font: string;
    content: string;
    width: number;
    height: number;
    angle: number;
    x: number;
    y: number;
    order: number;

    constructor(
        id: string,
        font: string,
        content: string,
        width: number,
        height: number,
        x: number,
        y: number,
        order: number = 0,
        angle: number = 0,
    ) {
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

    drawToCanvasContext(context: CanvasRenderingContext2D) {
        context.fillStyle = "blue";
        context.font = "bold 26px Arial";
        context.fillText(this.content, this.x, this.y + (this.height / 2) + 8);
    }

    display(containerId: string) {
        let container = document.getElementById(containerId);
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

        let card = document.createElement("canvas");
        //check exist canvas with id = id param
        let canvas = document.createElement("canvas");
        let context = canvas.getContext('2d');

        canvas.id = this.id;
        canvas.className = "drag-resize";
        canvas.width  = this.width;
        canvas.height = this.height;
        let order = 9000 + this.order;
        canvas.style.zIndex = order.toString();
        canvas.style.left = this.x.toString();
        canvas.style.top = this.y.toString();
        canvas.style.position = "absolute";

        context.fillStyle = "blue";
        context.font = "bold 26px Arial";
        context.fillText(this.content, 0, (canvas.height / 2) + 8);

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

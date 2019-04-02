import CardElement from './card-element'

export default class CardText implements CardElement {
    id: number;
    name: string;
    font: string;
    size: number;
    content: string;
    width: number;
    height: number;
    angle: number;
    x: number;
    y: number;
    order: number;

    constructor(
        id: number,
        name: string,
        font: string,
        size: number,
        content: string,
        width: number,
        height: number,
        x: number,
        y: number,
        order: number = 0,
        angle: number = 0,
    ) {
        this.id = id;
        this.name = name;
        this.font = font;
        this.size = size;
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
        context.font = this.size.toString() + "px " + this.font.toString();
        console.log(context.font);
        context.fillText(this.content, this.x, this.y + this.height/2);
    }

    display(containerId: string) {
        console.log(containerId);
        let container = document.getElementById(containerId);

        let textSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        textSvg.id = this.name;
        textSvg.setAttribute("class", "drag-resize dashed");
        
        let order = 20000 + this.order;
        // canvas.style.zIndex = order.toStr
        textSvg.style.zIndex = order.toString();
        container.appendChild(textSvg);

        let text: any = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.id = this.name;
        text.setAttribute("x", this.x);
        text.setAttribute("y", this.y);
        text.setAttribute("fill", "blue");
        text.setAttribute("font-family", this.font);
        text.setAttribute("font-size", this.size.toString());
        text.textContent = "Hello";
        textSvg.appendChild(text);

        let bbox = text.getBBox();
        textSvg.setAttribute( 'width', bbox.width);
        textSvg.setAttribute( 'height', bbox.height);

        textSvg.setAttribute( 'viewBox', bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height );
        textSvg.style.left = this.x + 'px';
        textSvg.style.top = this.y + 'px';
        textSvg.style.position = 'absolute';
        
    }

    moveTo(x: number, y: number, containerId: string): void {
        const container = document.getElementById(containerId);
        var rect = container.getBoundingClientRect();
        this.x = x - rect.left;
        this.y = y - rect.top;
        console.log(this.y);
    }

    rotate(rad: number): void {
        throw new Error("Method not implemented.");
    }

    updateSize(w: number, h: number): void {
        this.width = w;
        this.height = h;
        this.size = this.getTextFontSize(this.content, w, this.font);
        
    }

    getTextFontSize(text: string, width: number, fontFamily: string) {
        // re-use canvas object for better performance
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let fontSize = 0.1;
        context.font = fontSize.toString() + 'px ' + fontFamily.toString();
        let metrics = context.measureText(text);
        while (metrics.width < width) {
            fontSize = (fontSize * 10 + 1) / 10;
            context.font = fontSize.toString() + 'px ' + fontFamily.toString();
            metrics = context.measureText(text);
        }
        console.log(width);
        console.log(metrics.width);
        return fontSize;
    }
    
    save() {
        //
    }
}

import CardElement from './card-element'
const _global = (window) as any;

export default class CardImage implements CardElement {
    id: number;
    name: string;
    src: string;
    width: number;
    height: number;
    p_width: number;
    p_height: number;
    angle: number;
    x: number;
    y: number;
    p_x: number;
    p_y: number;
    order: number;

    constructor(
        id: number,
        name: string,
        src: string,
        width: number,
        height: number,
        x: number,
        y: number,
        order: number = 0,
        angle: number = 0,
    ) {
        this.id = id;
        this.name = name;
        this.src = src;
        this.p_width = width;
        this.p_height = height;
        this.angle = angle;
        this.p_x = x;
        this.p_y = y;
        this.order = order;
    }
    
    drawToCanvasContext(context: CanvasRenderingContext2D) {
        var image = new Image();
        image.src = this.src;
        image.onload = () => {
            context.drawImage(image, this.x*4, this.y*4, this.width*4, this.height*4);
        }
    }

    display(containerId: string) {
        let container = document.getElementById(containerId);

        //check exist canvas with id = id param
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        // (300dpi · 130mm
        //     25.4mm)

        // covert mm-> px (PRINTDPI = 350(default))
        let p_w = (_global.PRINTDPI * this.p_width)/25.4;
        let p_h = (_global.PRINTDPI * this.p_height)/25.4;
        let MYDPI = _global.MYDPI();
        console.log(MYDPI);
        this.width = (MYDPI * p_w)/(_global.PRINTDPI);
        this.height = (MYDPI * p_h)/(_global.PRINTDPI);
        this.x = (MYDPI * this.p_x)/25.4;
        this.y = (MYDPI * this.p_y)/25.4;

        canvas.id = this.name;
        canvas.className = "drag-resize dashed";
        canvas.width  = p_w;
        canvas.height = p_h;
        canvas.style.width = this.width.toString() + 'px';
        canvas.style.height = this.height.toString() + 'px';
        let order = 9000 + this.order;
        canvas.style.zIndex = order.toString();
        canvas.style.left = this.x.toString() + 'px';
        canvas.style.top = this.y.toString() + 'px';
        canvas.style.position = "absolute";

        var image = new Image();
        image.src = this.src;
        image.onload = () => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(image, 0, 0, p_w, p_h);
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
    
    save() {
        var MYDPI = _global.MYDPI();
        this.p_x = this.x*25.4/MYDPI;
        this.p_y = this.y*25.4/MYDPI;
        this.p_width = this.width*25.4/MYDPI;
        this.p_height = this.height*25.4/MYDPI;
    }
}

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
    
    drawToCanvasContext(context: CanvasRenderingContext2D, scaleDPI: number = 1, zoom: number = 1) {
        let src = this.src, x = (this.x/zoom)*scaleDPI, y = (this.y/zoom)*scaleDPI, width = (this.width/zoom)*scaleDPI, height = (this.height/zoom)*scaleDPI;
        return new Promise(function(resolve, reject) {
            var image = new Image();
            image.src = src;
            image.onload = function() {
                context.drawImage(image, x, y, width, height);
                resolve(image);
            };
            image.onerror = reject;
            if (image.complete) {
                image.onload;
            }
        });
    }

    display(containerId: string, zoom: number = 1) {
        let container = document.getElementById(containerId);
        //check exist canvas with id = id param
        let canvas : any = document.getElementById(this.name);
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = this.name;
            canvas.className = "drag-resize dashed";
        }
        let ctx = canvas.getContext('2d');

        // covert mm-> px (PRINTDPI = 350(default))
        let p_w = (_global.PRINTDPI * this.p_width)/25.4; // pixel for dpi = default
        let p_h = (_global.PRINTDPI * this.p_height)/25.4;
        let MYDPI = _global.MYDPI();
        this.width = (MYDPI * p_w)/(_global.PRINTDPI) * zoom; // pixel for dpi = current device dpi
        this.height = (MYDPI * p_h)/(_global.PRINTDPI) * zoom;
        this.x = (MYDPI * this.p_x)/25.4 * zoom;
        this.y = (MYDPI * this.p_y)/25.4 * zoom;

        // update canvas
        canvas.width  = p_w;
        canvas.height = p_h;
        canvas.style.width = this.width.toString() + 'px';
        canvas.style.height = this.height.toString() + 'px';
        let order = 9000 + this.order;
        canvas.style.zIndex = order.toString();
        canvas.style.left = this.x.toString() + 'px';
        canvas.style.top = this.y.toString() + 'px';
        canvas.style.position = "absolute";
        canvas.setAttribute('data-top', this.y);
        canvas.setAttribute('data-left', this.x);
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
    
    save(zoom: number = 1) {
        var MYDPI = _global.MYDPI();
        this.p_x = (this.x/zoom)*25.4/MYDPI;
        this.p_y = (this.y/zoom)*25.4/MYDPI;
        this.p_width = (this.width/zoom)*25.4/MYDPI;
        this.p_height = (this.height/zoom)*25.4/MYDPI;
    }
}

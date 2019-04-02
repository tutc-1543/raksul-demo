export default interface CardElement {
    id: number;
    name: string;
    angle: number;
    x: number;
    y: number;
    order: number;
    
    drawToCanvasContext(context: CanvasRenderingContext2D);
    display(containerId: string);
    moveTo(x: number, y: number, containerId: string): void;
    rotate(rad: number): void;
    updateSize(w: number, h: number): void;
    save();
}

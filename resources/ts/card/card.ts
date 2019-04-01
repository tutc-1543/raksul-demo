import CardElement from './card-element'
import { element } from '@interactjs/utils/is';

export default class Card {
    id: string;
    containerId: string;
    width: number;
    height: number;
    order: number;
    
    cardElements: CardElement[] = [];
    constructor(containerId: string, id: string, width: number, height: number) {
        let container = document.getElementById(containerId);
        container.style.width = width + 'px';
        container.style.height = height + 'px';

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        canvas.id = id;
        canvas.width  = width;
        canvas.height = height;
        canvas.style.zIndex = "9000";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        ctx.rect(0, 0, width, height);
        container.appendChild(canvas);

        this.containerId = containerId;
        this.id = id;
        this.width = width;
        this.height = height;
        this.order = 0;
    }

    getContainerId(): string {
        return this.containerId;
    }
    
    getId(): string {
        return this.id;
    }

    addCardElement(cardElement: CardElement) {
        this.cardElements.push(cardElement);
    }

    removeCardElement(cardElement: CardElement) {
        throw new Error("Method not implemented.");
    }

    findCardElement(cardElementId: string): CardElement {
        for (let element in this.cardElements) {
            if (this.cardElements[element].id === cardElementId) {
                return this.cardElements[element];
            }
        }

        return null;
    }


}

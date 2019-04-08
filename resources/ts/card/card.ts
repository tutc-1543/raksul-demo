import CardElement from './card-element'
import { element } from '@interactjs/utils/is';
const _global = (window) as any;

export default class Card {
    id: number;
    name: string;
    containerId: string;
    width: number;
    height: number;
    p_width: number;
    p_height: number;
    order: number;
    zoom: number;

    cardElements: CardElement[] = [];
    constructor(containerId: string, id: number, name: string, width: number, height: number) {
        this.p_width = width;
        this.p_height = height;
        let container = document.getElementById(containerId);
        let MYDPI = _global.MYDPI();
        this.width = (MYDPI * this.p_width)/25.4; // pixel for dpi = current device dpi
        this.height = (MYDPI * this.p_height)/25.4;

        container.style.width = this.width + 'px';
        container.style.height = this.height + 'px';
        container.style.left = "30px";
        container.style.top = "10px";

        this.containerId = containerId;
        this.id = id;
        this.name = name;
        this.order = 0;
    }

    zoomCard(zoom: number = 1.0): number {
        this.zoom = zoom;
        let container = document.getElementById(this.containerId);
        container.style.width = this.width * zoom + 'px';
        container.style.height = this.height * zoom + 'px';
        container.style.left = "30px";
        container.style.top = "10px";
        this.cardElements.forEach(element => {
            element.display(this.containerId, zoom);
        });
        
        return zoom;
    }

    getContainerId(): string {
        return this.containerId;
    }
    
    getName(): string {
        return this.name;
    }

    addCardElement(cardElement: CardElement) {
        this.cardElements.push(cardElement);
    }

    removeCardElement(cardElement: CardElement) {
        throw new Error("Method not implemented.");
    }

    findCardElement(cardElementId: string): CardElement {
        for (let element in this.cardElements) {
            if (this.cardElements[element].name === cardElementId) {
                return this.cardElements[element];
            }
        }

        return null;
    }


}

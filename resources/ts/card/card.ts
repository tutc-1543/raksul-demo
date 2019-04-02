import CardElement from './card-element'
import { element } from '@interactjs/utils/is';

export default class Card {
    id: number;
    name: string;
    containerId: string;
    width: number;
    height: number;
    order: number;
    
    cardElements: CardElement[] = [];
    constructor(containerId: string, id: number, name: string, width: number, height: number) {
        let container = document.getElementById(containerId);
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        container.style.left = "30px";
        container.style.top = "10px";

        this.containerId = containerId;
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.order = 0;
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

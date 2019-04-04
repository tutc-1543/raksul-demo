import * as $ from 'jquery';
import Card from '../card/card';
import CardImage from '../card/card-image';
import CardText from '../card/card-text';
import CardElement from '../card/card-element';

const IMAGE = 'image';
const TEXT = 'text';

$(document).ready(() => {
    initTabMenu();
    const _global = (window) as any
    $('#saveCard').click(() => {
        saveCard(_global.card);
    });
});

function saveCard(card: Card) {
    var cardElements = card.cardElements;
    var cardElementData = [];

    for (var i = 0; i < cardElements.length; i++) {
        let el: any = cardElements[i];
        el.save();
        let Data: Object = {};
        Data['id'] = el.id;
        if (el.constructor.name == CardImage.name){
            Data['type'] = IMAGE;
            Data['name'] = el.name;
            Data['image'] = el.src;
            Data['width'] = el.p_width;
            Data['height'] = el.p_height;
            Data['x'] = el.p_x;
            Data['y'] = el.p_y;
            Data['order'] = el.order;
        } else if (el.constructor.name == CardText.name) {
            Data['type'] = TEXT;
            Data['font'] = el.font;
        }
        cardElementData[i] = Data;
    };

    var cardData = {
        'id': card.id,
        'name': card.name,
        'width': card.width,
        'height': card.height,
        'card-elements': cardElementData
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/cards/' + card.id,
        type: 'put',
        data: cardData,
        success: (data) => {
            //
        },
        error: () => {
            //
        }
    });
}

function initTabMenu() {
    let tabLinks: any;
    tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
        let tab: HTMLButtonElement = tabLinks[i];
        tab.addEventListener("click", () => {
            let tabContents: any;
            let tabLinks: any;
            
            tabContents = document.getElementsByClassName("tabcontent");
            for (let i = 0; i < tabContents.length; i++) {
                let tab: HTMLDivElement = tabContents[i];
                tab.style.display = 'none';
            };

            tabLinks = document.getElementsByClassName("tablinks");
            for (let i = 0; i < tabLinks.length; i++){
                let tab: HTMLButtonElement = tabLinks[i];
                tab.className = tab.className.replace(" active", "");
            };
        
            document.getElementById(tab.value).style.display = "block";
            tab.className += " active";
        });
    };
}

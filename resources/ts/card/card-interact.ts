import interact from 'interactjs';
import * as app from './index';
interact('.drag-resize')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
        interact.modifiers.restrict({
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        }),
        ],
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            const rect = event.target.getBoundingClientRect();

            app.updateCardElementPosition(event.target.id, rect.left, rect.top);
        }
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: false, right: true, bottom: true, top: false },
    
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent',
            endOnly: true,
          }),
    
          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 20, height: 20 },
          }),
        ],

        preserveAspectRatio: true,

        onend: function (event) {

            app.updateCardElementSize(event.target.id, event.target.offsetWidth, event.target.offsetHeight);
        },
    
        inertia: true
    })
    .on('resizemove', function (event) {
        var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        console.log(event.rect.width);
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    });

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
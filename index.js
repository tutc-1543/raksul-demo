interact('.resize-drag')
    .draggable({
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: function (event) {
            let target = event.target,
                scaleX = (parseFloat(target.getAttribute('scaleX')) || 1),
                scaleY = (parseFloat(target.getAttribute('scaleY')) || 1),
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
    
            // translate when resizing from top or left edges
            // x += event.deltaRect.left;
            // y += event.deltaRect.top;
            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)' + 'scale('+ scaleX + ', ' + scaleY + ')';
    
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

        },
        // call this function on every dragend event
        onend: function (event) {
            //
        }
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // // keep the edges inside the parent
        // restrictEdges: {
        // outer: 'parent',
        // endOnly: true,
        // },

        // minimum size
        restrictSize: {
        min: { width: 100, height: 50 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        let target = event.target,
            width = (parseFloat(target.getAttribute('width'))),
            height = (parseFloat(target.getAttribute('height'))),
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        let scaleX = event.rect.width/width;
        let scaleY = event.rect.height/height;

        // translate when resizing from top or left edges
        // x += event.deltaRect.left;
        // y += event.deltaRect.top;
        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)' + 'scale('+ scaleX + ', ' + scaleY + ')';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        target.setAttribute('scaleX', scaleX);
        target.setAttribute('scaleY', scaleY);
    });

dragMoveListener = (event) => {
    console.log(target);
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
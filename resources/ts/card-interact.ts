import interact from 'interactjs';
const _global = (window) as any;

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
        autoScroll: false,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            const rect = event.target.getBoundingClientRect();
            var container = _global.getContainer();
            var containerRect = container.getBoundingClientRect();
            event.target.setAttribute('data-top', rect.top - containerRect.top);
            event.target.setAttribute('data-left', rect.left - containerRect.left);
            _global.updateCardElementPosition(event.target.id, rect.left, rect.top);
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
            min: { width: 5, height: 5 },
          }),
        ],

        preserveAspectRatio: true,

        onend: function (event) {
            let width = parseFloat(event.target.style.width);
            let height = parseFloat(event.target.style.height);
            _global.updateCardElementSize(event.target.id, width, height);
        },
    
        inertia: true
    })
    .on('resizemove', function (event) {
        var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0),
        left = parseFloat(target.getAttribute('data-left')),
        top = parseFloat(target.getAttribute('data-top'));

        var container = _global.getContainer();
        if (left + event.rect.width <= parseFloat(container.style.width)
            && top + event.rect.height <= parseFloat(container.style.height)) {
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
            x += event.deltaRect.left;
            y += event.deltaRect.top;
            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
        // translate when resizing from top or left edges
        
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

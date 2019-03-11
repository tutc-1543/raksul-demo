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
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy,
            deg = (parseInt(target.getAttribute('deg-data')) || 0);

        // translate when resizing from top or left edges
        // x += event.deltaRect.left;
        // y += event.deltaRect.top;
        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)' + 'scale('+ scaleX + ', ' + scaleY + ') rotate(' + deg + ')';
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
        imgId = target.getAttribute('data-id'),
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0),
        deg = (parseInt(target.getAttribute('deg-data')) || 0);
    // update the element's style
    img = document.getElementById(imgId);
    let width = img.naturalWidth,
        height = img.naturalHeight,
        scaleX = event.rect.width/width,
        scaleY = event.rect.height/height;

    // translate when resizing from top or left edges
    // x += event.deltaRect.left;
    // y += event.deltaRect.top;
    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)' + 'scale('+ scaleX + ', ' + scaleY + ') rotate(' + deg + ')';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    target.setAttribute('scaleX', scaleX);
    target.setAttribute('scaleY', scaleY);
});

interact('.draggable') 
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
            x = (parseFloat(target.getAttribute('x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('y')) || 0) + event.dy,
            deg = (parseInt(target.getAttribute('deg-data')) || 0);

        // translate when resizing from top or left edges
        // x += event.deltaRect.left;
        // y += event.deltaRect.top;
        // target.style.webkitTransform = target.style.transform =
        //     'translate(' + x + 'px, ' + y + 'px)' + 'scale('+ scaleX + ', ' + scaleY + ') rotate(' + deg + ')';
        console.log(x);
        target.setAttribute('x', x);
        target.setAttribute('y', y);

    },
    // call this function on every dragend event
    onend: function (event) {
        //
    }
})

var toolbarModal = document.getElementById('toolbar1');

var editText = document.getElementById('editText');
editText.addEventListener('dblclick', (event) => {
    
    event = event || window.event;
    toolbarModal.style.display = 'block';
    let left = (parseFloat(editText.getAttribute('x'))) - toolbarModal.style.width,
        top = (parseFloat(editText.getAttribute('y'))) - 20;
    
    toolbarModal.style.left = left + 'px';
    toolbarModal.style.top = top + 'px';
    toolbarModal.setAttribute('data-modal', 'editText');
});

document.getElementById('closeButton').addEventListener('click', (event) => {
    toolbarModal.style.display = 'none';
});

//rotate text
// document.getElementById('incDegreeButton').addEventListener('click', (event) => {
//     let AdjustElId = toolbarModal.getAttribute('data-modal'),
//         AdjustEl = document.getElementById(AdjustElId),

//         x = (parseFloat(AdjustEl.getAttribute('x')) || 0),
//         y = (parseFloat(AdjustEl.getAttribute('y')) || 0);
//     console.log(AdjustEl);
//     let deg = (parseInt(AdjustEl.getAttribute('deg-data')) || 0) + 1;

//     AdjustEl.style.webkitTransform = AdjustEl.style.transform =
//             'rotate(' + deg + 'deg) translate(' + x + ', ' + y + ')';
    
//     AdjustEl.setAttribute('deg-data', deg);
// });

interact('.drag-rotate')
  .draggable({
  onstart: function (event) {
    const element = event.target;
    const rect = element.getBoundingClientRect();

    // store the center as the element has css `transform-origin: center center`
    element.dataset.centerX = rect.left + rect.width / 2;
    element.dataset.centerY = rect.top + rect.height / 2;
    // get the angle of the element when the drag starts
    element.dataset.angle = getDragAngle(event);
  },
  onmove: function (event) {
    var element = event.target;
    var center = {
      x: parseFloat(element.dataset.centerX) || 0,
      y: parseFloat(element.dataset.centerY) || 0,
    };
    var angle = getDragAngle(event);

    // update transform style on dragmove
    element.style.transform = 'rotate(' + angle + 'rad' + ')';
  },
  onend: function (event) {
    const element = event.target;

    // save the angle on dragend
    element.dataset.angle = getDragAngle(event);
  },
})

function getDragAngle(event) {
  var element = event.target;
  var startAngle = parseFloat(element.dataset.angle) || 0;
  var center = {
    x: parseFloat(element.dataset.centerX) || 0,
    y: parseFloat(element.dataset.centerY) || 0,
  };
  var angle = Math.atan2(center.y - event.clientY,
                         center.x - event.clientX);

  return angle - startAngle;
}
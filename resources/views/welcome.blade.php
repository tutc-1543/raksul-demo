<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Raksul</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="{{ asset('js/card.js') }}"></script>
        <script src="{{ asset('js/card-interact.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
        <!-- Styles -->
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-6 col-md-4 sidebar">
                    Sidebar
                </div>
                <div class="col-12 col-md-8">
                    <div id="myCard" class="card">
                    
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 col-md-4 sidebar">
                    <button id="previewCanvasButton">Preview Canvas</button>
                </div>
                <div class="col-12 col-md-8">
                    <div id="mycanvas"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 col-md-4 sidebar">
                    <button id="downloadCanvas">Download Canvas</button>
                </div>
                <div class="col-12 col-md-8">
                    <div id="myImage"></div>
                </div>
            </div>
        </div>
    </body>
    <script>
        // var bbox = document.getElementById('text-2').getBBox();
        // console.log('ok');
        // // set the svg width/height accordingly
        // var svg = document.getElementById('svg-text-2');
        // svg.setAttribute( 'width', bbox.width );
        // svg.setAttribute( 'height', bbox.height );

        // // set the viewbox accordingly
        // svg.setAttribute( 'viewBox', bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height );
        // svg.style.left = '150px';
        // svg.style.top = '150px';
        // svg.style.position = 'absolute';

        initCard("{{ $card->name }}", 'myCard', {{ $card->width }}, {{ $card->height }});
        @foreach($cardImages as $cardImage)
            addCardImage("{{ $cardImage->name }}", "{{ $cardImage->image }}", {{ $cardImage->width }}, {{ $cardImage->height }}, {{ $cardImage->x }}, {{ $cardImage->y }});
        @endforeach
    </script>
</html>

<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Raksul</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/card.css') }}" />

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="{{ asset('js/card.js') }}"></script>
        <script src="{{ asset('js/card-interact.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/tab.js') }}"></script>
        <!-- Styles -->
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="side" style="width: 20%; height: 640px">
                    <div class="row tab">
                        <button class="col-sm-4 tablinks" value="tabCard">Card</button>
                        <button class="col-sm-4 tablinks" value="tabImage">Image</button>
                        <button class="col-sm-4 tablinks" value="tabText">Text</button>
                        @include('cards.tab')
                    </div>
                    <div class="row">
                        <button id="saveCard" class="btn btn-primary btn-block">Save Card</button>
                    </div>
                    <div class="row">
                        <div class="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Dropdown button
                            </button>
                            <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main" style="width: 80%; height: 80%">
                    <div id="myCard" class="card">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="side" style="width: 20%">
                    <button id="previewCanvasButton" class="btn btn-primary">Preview Canvas</button>
                </div>
                <div class="main" style="width:80%; height: 80%">
                    <div id="mycanvas"></div>
                </div>
            </div>
            <div class="row">
                <div class="side" style="width: 20%">
                    <button id="downloadCanvas" class="btn btn-primary">Download Canvas</button>
                </div>
                <div class="main" style="width: 80%; height: 80%">
                    <div id="myImage"></div>
                </div>
            </div>
        </div>
    </body>
    <script>

        var card = initCard(
            {{ $card->id }},
            "{{ $card->name }}",
            'myCard',
            {{ $card->width }},
            {{ $card->height }}
        );

        @foreach($cardImages as $cardImage)
            addCardImage(
                {{ $cardImage->id }},
                "{{ $cardImage->name }}",
                "{{ $cardImage->image }}",
                {{ $cardImage->width }},
                {{ $cardImage->height }},
                {{ $cardImage->x }},
                {{ $cardImage->y }},
                {{ $cardImage->order}}
            );
        @endforeach
    </script>
</html>

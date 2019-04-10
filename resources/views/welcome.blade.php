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
        <!-- Styles -->
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="side" style="width: 20%; height: 640px">
                    <!-- <div class="tab">
                        <button class="col-sm-4 tablinks" value="tabCard">Card</button>
                        <button class="col-sm-4 tablinks" value="tabImage">Image</button>
                        <button class="col-sm-4 tablinks" value="tabText">Text</button>
                        @include('cards.tab')
                    </div> 
                    <div class="">
                        <button id="saveCard" class="btn btn-primary btn-block">Save Card</button>
                        
                    </div> -->
                    <div class="row" style="margin: 10px;">
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Zoom
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item zoom" value="0.5">50%</button>
                                <button class="dropdown-item zoom" value="1.0">100%</button>
                                <button class="dropdown-item zoom" value="1.5">150%</button>
                                <button class="dropdown-item zoom" value="2.0">200%</button>
                                <button class="dropdown-item zoom" value="2.5">250%</button>
                                <button class="dropdown-item zoom" value="3.0">300%</button>
                            </div>
                        </div>
                        <button id="previewCanvasButton" class="btn btn-primary" style="margin-left: 10px">
                            Download
                            <img id="loaderImg" src="images/default-loader.gif" alt="" width="30px" height="30px" style="display: none;">
                        </button>
                        <a id="downloadCard" download="Pretty Card"></a>
                    </div>
                    
                </div>
                <div class="main" style="width: 80%; height: 80%">
                    <div id="myCard" class="card" title="my Card">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="main" style="width:100%; height: 80%">
                    <div id="mycanvas"></div>
                </div>
            </div>
        </div>
    </body>
    <script src="{{ asset('js/card.js') }}"></script>
    <script src="{{ asset('js/card-interact.js') }}"></script>
    <script src="{{ asset('js/tab.js') }}"></script>
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

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</html>

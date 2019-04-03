<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{
    public function index()
    {
        $card = Card::with('cardImages')->first();
        $cardImages = $card->cardImages;
        
        return view('welcome', compact('card', 'cardImages'));
    }
}

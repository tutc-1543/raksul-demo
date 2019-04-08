<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use App\Models\CardImage;

class CardController extends Controller
{
    public function index()
    {
        $card = Card::with('cardImages')->first();
        $cardImages = $card->cardImages;
        
        return view('welcome', compact('card', 'cardImages'));
    }

    public function update(Request $request)
    {
        $card = Card::findOrFail($request->get('id'));
        $card->update([
            'name' => $request->get('name'),
            'width' => $request->get('width'),
            'height' => $request->get('height')
        ]);
        $card->save();
        $cardElements = $request->get('card-elements');
        $cardImages = [];
        foreach($cardElements as $cardElement) {
            if ($cardElement['type'] == 'image') {
                $cardImages[$cardElement['id']] = [
                    'card-id' => $cardElement['card_id'] = $request->get('id'),
                    'name' => $cardElement['name'],
                    'image' => $cardElement['image'],
                    'width' => $cardElement['width'],
                    'height' => $cardElement['height'],
                    'x' => $cardElement['x'],
                    'y' => $cardElement['y'],
                    'order' => 1,
                ];
            }
        }
        foreach($cardImages as $id => $cardImage) {
            $image = CardImage::find($id);
            if ($image) {
                $image->update($cardImage);
                $image->save();
            }
            else {
                $image = CardImage::create($cardImage);
            }
        }
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Card;
class CardImage extends Model
{
    protected $fillable = [
        'card_id',
        'name',
        'image',
        'width',
        'height',
        'x',
        'y',
        'order'
    ];
    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CardImage;
class Card extends Model
{
    protected $fillable = [
        'id',
        'name',
        'width',
        'height'
    ];
    public function cardImages()
    {
        return $this->hasMany(CardImage::class);
    }
}

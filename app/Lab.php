<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    protected $fillable = [
        'address', 'title', 'longitude', 'latitude', "category", "city", "country"
    ];
}

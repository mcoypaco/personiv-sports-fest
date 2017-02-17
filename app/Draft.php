<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    protected $fillable = ['team_id','player_id','year'];
    
}

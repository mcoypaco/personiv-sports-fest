<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name','player_id'];
    
    public function players() {
      return $this->hasMany('App/Player');
    }

}

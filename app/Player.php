<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
  protected $fillable = ['name' ,'height','weight','cellphone_number' , "team_id"];

  public function team() {
    return $this->belongsTo(Team::class);
  }

  public function sports()
  {
      return $this->belongsToMany(Sport::class);
  }

}

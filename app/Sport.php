<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    protected $fillable = ['name', 'description', 'img_extension'];

    public function positions()
    {
        return $this->hasMany(Position::class);
    }

    public function players()
    {
        return $this->belongsToMany(Player::class);
    }

    public function teams()
    {
      return $this->hasMany(Team::class);
    }
}

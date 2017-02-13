<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Team extends Model
{
    protected $fillable = ['name','user_id'];

    public function players()
    {
      return $this->hasMany(Player::class);
    }

    public function poc()
    {
      return $this->belongsTo(User::class , 'user_id');
    }

    public function addRemovePlayer(Request $request , $id)
    {
      $player = Player::find($id);
      $team = Team::find($request->team_id);

      if(is_null($player->team_id))
      {
        $player->team()->associate($team);
      }
      else {
        if(is_null($request->team_id))
        {
          $player->team()->dissociate($team);
        }
      }

      $player->save();
    }


}

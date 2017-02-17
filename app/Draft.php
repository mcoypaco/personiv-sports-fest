<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    protected $fillable = ['team_id','player_id','year'];

    public function addRemovePlayer($teamId , $playerId)
    {
        $now = Carbon::now();
        if($teamId !== null){
                Draft::create(array(
                'team_id' => $teamId,
                'player_id' => $playerId,
                'year' => $now->year
            ));    
        }
        else{
            $draft = Draft::where('player_id', '=', $playerId)->where('year', '=',$now->year)->get();
            Draft::destroy($draft[0]->id);
        }
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
  protected $fillable = ['first_name','last_name','employee_id','tower_lead','team_lead','height','weight','cellphone_number'];
  protected $guarded = ['id'];

  public function team() {
    return $this->belongsTo(Team::class);
  }

  public function sports()
  {
      return $this->belongsToMany(Sport::class);
  }

}

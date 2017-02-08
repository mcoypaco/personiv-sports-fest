<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
  protected $fillable = ['name' ,'height','weight','cellphone_number'];
}

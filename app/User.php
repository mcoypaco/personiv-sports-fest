<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use JWTAuth;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password' ,'first_name' ,'last_name','cellphone_number','role_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    public function role() {
      return $this->belongsTo(Role::class);
    }

    public function hasRole($role) {
      return $this->role->name == $role ;
    }

    public function getRole() {
      return $this->role->name ;
    }

    public function roleIs()
    {
      $user = JWTAuth::parseToken()->authenticate();
      $getUser = $this->find($user->id);

      return $getUser;
    }


}

<?php

namespace App\Http\Middleware\Role;

use Closure;
use JWTAuth;
use App\User;

class Role
{
    protected $roleName;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $getUser = User::find($user->id);

        if($getUser->hasRole($this->roleName()))
        {
          return response()->json(['error' => 'access denied' , 'role' => $this->roleName()]);
        }

        return $this->roleName();
    }
    //overrride
    protected function roleName()
    {
      return;
    }
}

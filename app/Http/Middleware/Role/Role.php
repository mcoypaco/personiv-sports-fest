<?php

namespace App\Http\Middleware\Role;

use Closure;
use JWTAuth;
use App\User;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next , ...$role)
    {
        $user = User::find(JWTAuth::parseToken()->authenticate()->id);


        if(! in_array($user->getRole() , $role))
        {
          return response()->json($role);
        }

        return $next($request);
    }
    //overrride
}

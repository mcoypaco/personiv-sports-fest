<?php

namespace App\Http\Middleware\Role;

use Closure;

class POC extends Role
{
  protected function roleName() {
    return 'poc';
  }
}

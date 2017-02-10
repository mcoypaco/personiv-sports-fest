<?php

namespace App\Http\Middleware\Role;

use Closure;

class Admin extends Role
{

  protected function roleName() {
    return 'admin';
  }
}

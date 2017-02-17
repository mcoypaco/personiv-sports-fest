<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
          ['name' => "admin"],
          ['name' => "poc"]
        ];
        DB::table('roles')->insert($roles);
    }
}

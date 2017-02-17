<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $users = [
        ['email' => "tristanmallorca@gmail.com",
        'password' => Hash::make('12345'),
        'first_name' => "Tristan",
        'last_name' => "Mallorca",
        'cellphone_number' => "09323456789",
        'role_id' => "1"
       ],
       ['email' => "aaronlim@gmail.com",
       'password' => Hash::make('12345'),
       'first_name' => "Aaron",
       'last_name' => "Lim",
       'cellphone_number' => "09223456789",
       'role_id' => "2"
       ],
       ['email' => "albertfuensalida@gmail.com",
        'password' => Hash::make('12345'),
        'first_name' => "Albert",
        'last_name' => "Fuensalida",
        'cellphone_number' => "09123456789",
        'role_id' => "2"
       ]
      ];

      DB::table('users')->insert($users);
    }
}

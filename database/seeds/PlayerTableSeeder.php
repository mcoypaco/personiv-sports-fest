<?php

use Illuminate\Database\Seeder;

class PlayerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $players = [
        ['employee_id' => "abcd",
        'first_name' => "Wes",
        'last_name' => "Gibbins",
        'tower_lead' => "Noelie Catolin",
        'team_lead' => "Lizlie Ho",
        'height' => "123.2",
        'weight' => "100.3",
        'cellphone_number' => "09323456789"
         ],
         ['employee_id' => "abcdf",
         'first_name' => "Annalise",
         'last_name' => "Keathing",
         'tower_lead' => "Noelie Catolin",
         'team_lead' => "Lizlie Ho",
         'height' => "123.2",
         'weight' => "100.3",
         'cellphone_number' => "09423456789"
        ],
        ['employee_id' => "abcdfg",
        'first_name' => "Laurel",
        'last_name' => "Castillo",
        'tower_lead' => "Noelie Catolin",
        'team_lead' => "Lizlie Ho",
        'height' => "123.2",
        'weight' => "100.3",
        'cellphone_number' => "09723456789"
       ],
       ['employee_id' => "abcdefgh",
       'first_name' => "Connor",
       'last_name' => "Walsh",
       'tower_lead' => "Noelie Catolin",
       'team_lead' => "Lizlie Ho",
       'height' => "123.2",
       'weight' => "100.3",
       'cellphone_number' => "09323156789"
      ],
     ];

     DB::table('players')->insert($players);
    }
}

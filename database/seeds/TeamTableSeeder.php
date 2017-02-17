<?php

use Illuminate\Database\Seeder;

class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teams = [
            ['name' => "Wow Team",
              'user_id' => 1,
              'sport_id' => 1
            ],
            ['name' => "Wiw Team",
              'user_id' => 2,
              'sport_id' => 1
            ],
            ['name' => "Weeeew Team",
              'user_id' => 3,
              'sport_id' => 1
            ]
        ];

        DB::table('teams')->insert($teams);
    }
}

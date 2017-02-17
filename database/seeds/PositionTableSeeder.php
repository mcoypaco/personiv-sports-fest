<?php

use Illuminate\Database\Seeder;

class PositionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = [
            ['name' => "guard",
              'sport_id' => 1
            ],
            ['name' => "forward",
              'sport_id' => 1
            ]
        ];

        DB::table('positions')->insert($positions);
    }
}

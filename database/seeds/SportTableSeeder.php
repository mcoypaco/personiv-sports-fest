<?php

use Illuminate\Database\Seeder;

class SportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sports')->delete();

        $sports = [
            ['name' => "basketball",
              'description' => "This is basketball"
            ],
            ['name' => "volleyball",
              'description' => "This is vaolleyball"
            ]
        ];

        DB::table('sports')->insert($sports);
    }
}

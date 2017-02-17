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
        // DB::table('sports')->delete();

        $sports = [
            ['name' => "basketball",
              'description' => "This is basketball",
              'img_extension' => "jpeg"
            ],
            ['name' => "volleyball",
              'description' => "This is volleyball",
              'img_extension' => "jpeg"
            ]
        ];

        DB::table('sports')->insert($sports);
    }
}

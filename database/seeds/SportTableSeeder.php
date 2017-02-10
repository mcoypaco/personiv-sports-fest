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
            ['name' => "basketball"],
            ['name' => "volleyball"]
        ];

        DB::table('sports')->insert($sports);
    }
}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SportTableSeeder::class);
        $this->call(RoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(PlayerTableSeeder::class);
        $this->call(PositionTableSeeder::class);
        $this->call(TeamTableSeeder::class);

        DB::table('player_sport')->insert(
            [
                ['player_id' => 1, 
                'sport_id' => 1],
                ['player_id' => 2, 
                'sport_id' => 1]
            ]
        );

        DB::table('player_position')->insert(
            [
                ['player_id' => 1, 
                'position_id' => 1],
                ['player_id' => 2, 
                'position_id' => 2]
            ]
        );

     }

}

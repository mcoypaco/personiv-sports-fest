<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayerSportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_sport', function (Blueprint $table) {
            $table->integer('player_id')->unsigned();
            $table->foreign('player_id')->references('id')
                    ->on('players')->onDelete('cascade');

            $table->integer('sport_id')->unsigned();
            $table->foreign('sport_id')->references('id')
                ->on('sports')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_sport');
    }
}

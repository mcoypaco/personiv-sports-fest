<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('api/players', 'PlayerController',
                ['only' => ['index', 'create','store','show','update']]);

Route::resource('api/teams', 'TeamController',
                ['only' => ['index', 'create','store','show']]);

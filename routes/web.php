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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function()
{
	Route::resource('players', 'PlayerController',
                ['only' => ['index', 'create','store','show','update']]);

	Route::resource('teams', 'TeamController',
                ['only' => ['index', 'create','store','show']]);

    Route::resource('sports', 'SportController',
                ['only' => ['index', 'store', 'show', 'update', 'destroy']]);

    Route::resource('positions', 'PositionController',
                ['only' => ['index', 'store', 'destroy']]);
    
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    
    Route::post('authenticate', 'AuthenticateController@authenticate');
});
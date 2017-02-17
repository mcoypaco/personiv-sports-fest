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

  Route::post('teams', 'TeamController@store');
  Route::get('teams', 'TeamController@index');
  Route::post('teams/{id}', 'TeamController@update');
  Route::get('teams/{id}', 'TeamController@show');

  Route::get('players/noteam' , 'PlayerController@noTeam');
  Route::get('players/sport/{sport}' , 'PlayerController@getSportPlayers');
  Route::get('players/export/{type}','PlayerController@exportExcel');

  Route::post('players','PlayerController@store');
  Route::get('players','PlayerController@index');
  Route::post('players/{id}','PlayerController@update');
  Route::get('players/{id}','PlayerController@show');

  Route::get('roles/admin','RoleController@getAdminId');
  Route::post('roles','RoleController@store');
  Route::get('roles/{id}','RoleController@show');
  Route::get('roles','RoleController@index');
  Route::get('roles/poc','RoleController@getPocId');

  Route::get('players/exportPlayers','PlayerController@exportPlayers');

  Route::get('users/poc','UserController@poc');
  Route::post('users','UserController@store');
  Route::get('users','UserController@index');
  Route::get('users/{id}','UserController@show');
  Route::put('users/{id}','UserController@update');
  Route::put('users/{id}/changePassword', 'UserController@changePassword');


  Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
  Route::post('authenticate', 'AuthenticateController@authenticate');
  Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

  Route::post('upload/image/{id}', 'SportController@upload');

  Route::get('positions','PositionController@index');
  Route::post('positions','PositionController@store');
  Route::get('positions/{id}','PositionController@show');
  Route::get('positions/{id}/players' , 'PositionController@players');

  Route::get('sports','SportController@index');
  Route::post('sports','SportController@store');
  Route::get('sports/{id}','SportController@show');
  Route::get('sports/{id}/positions','SportController@positions');
  Route::get('sports/{id}/players' , 'SportController@players');

  Route::get('sports/players/noteam/{id}', 'SportController@noTeamPlayers');

  Route::resource('drafts', 'DraftController',
              ['only' => ['index', 'store', 'destroy']]);

  Route::post('sports/upload/{id}', 'SportController@upload');

});

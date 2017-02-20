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


	Route::group(['middleware' => 'role:admin'], function() {
		//team
		Route::post('teams/{id}', 'TeamController@update');
		Route::post('teams', 'TeamController@store');

		//players
		Route::get('players/noteam' , 'PlayerController@noTeam');
		Route::get('players/sport/{sport}' , 'PlayerController@getSportPlayers');
		Route::get('players/export/{type}','PlayerController@exportExcel');
	  Route::get('players','PlayerController@index');
	  Route::post('players/{id}','PlayerController@update');
		Route::get('players/exportPlayers','PlayerController@exportPlayers');

		//role

		Route::post('roles','RoleController@store');
			Route::get('roles','RoleController@index');

		//user
		Route::get('users/poc','UserController@poc');
	  Route::post('users','UserController@store');
	  Route::get('users','UserController@index');
	  Route::get('users/{id}','UserController@show');
	  Route::put('users/{id}','UserController@update');

		//upload
		Route::post('upload/image/{id}', 'SportController@upload');

		//position
		Route::get('positions','PositionController@index');
		Route::post('positions','PositionController@store');
		Route::get('positions/{id}','PositionController@show');

		//sports
		Route::get('sports','SportController@index');
		Route::post('sports','SportController@store');
		Route::get('sports/{id}','SportController@show');
		Route::get('sports/{id}/positions','SportController@positions');
		Route::get('sports/{id}/players' , 'SportController@players');
		Route::post('sports/upload/{id}', 'SportController@upload');
		Route::get('sports/players/noteam/{id}', 'SportController@noTeamPlayers');
		//draft
		Route::resource('drafts', 'DraftController',
								['only' => ['index', 'store', 'destroy']]);

	});

		Route::group(['middleware' => 'role:admin,poc'], function() {

			//team
			Route::get('teams', 'TeamController@index');
		  Route::get('teams/{id}', 'TeamController@show');
	;
			//player
			Route::get('players/{id}','PlayerController@show');
			Route::post('players','PlayerController@store');

			//role
			Route::get('roles/poc','RoleController@getPocId');
			Route::get('roles/admin','RoleController@getAdminId');
			Route::get('roles/{id}','RoleController@show');

			//user
			Route::get('users/{id}/team','UserController@pocTeam');
			Route::put('users/{id}/changePassword', 'UserController@changePassword');

			//auth
			Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

			//position
			Route::get('positions/{id}/players' , 'PositionController@players');

		});

		//auth
		Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
		Route::post('authenticate', 'AuthenticateController@authenticate');


});

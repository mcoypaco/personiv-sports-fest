<?php

namespace App\Http\Controllers;

use App\Player;
use App\Team;
use App\Sport;
use Excel;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
    //   $player = Player::all();
      return  response()->json(Player::with('positions', 'team', 'sports')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $player = Player::create($request->except(['sports','positions']));
        $player->sports()->attach($request->input('sports'));
        $player->positions()->attach($request->input('positions'));
        return response()->json(array('success' => true));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $player = Player::find($id);

        return response()->json($player);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $team = new Team();
      $team->addRemovePlayer($request , $id);
      return response()->json($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Player::destroy($id);

        return response()->json(array('success' => true));
    }

    public function noTeam()
    {
      $player = Player::where('team_id', null);
      return response()->json($player->get());
    }

    public function exportPlayers() {
        $filename = 'players';
        $players = Player::all()->toArray();
        // $players = Player::select('id', 'employee_id', 'first_name', 'last_name')->get();
        Excel::create($filename, function($excel) use($players) {
             $excel->setTitle('All Players');
            $excel->sheet('players', function($sheet) use($players) {
                $sheet->fromArray($users);
            });
        })->store('xls');
        // Excel::create($filename)->store('xls');
        // return response()->download('exports/'.$filename.'.xls');
    }
}

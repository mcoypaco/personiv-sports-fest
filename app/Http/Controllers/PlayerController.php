<?php

namespace App\Http\Controllers;

use App\Player;
use App\Team;
use App\Sport;
use App\Events\DraftPlayer;
use App\Events\AddPlayers;
use App\Draft;
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
        event(new AddPlayers($player));
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
        // $player = Player::find($id);

        // return response()->json($player);
        return response()->json(Player::with('positions', 'team', 'sports')->find($id));
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
      $player = Player::find($id);
      $player->team_id = $request->team_id;
      $player->push();

      event(new DraftPlayer($player));
      return response()->json(["message"=>"success"]);
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
        $player = Player::with('positions', 'team', 'sports')->where('team_id', null);
        return response()->json($player->get());
    }


    public function exportExcel($type) {
        return Excel::create('Players', function($excel) use ($data) {
            $excel->sheet('sheet1', function($sheet) use ($data)
            {
                $sheet->fromArray($data);
            });
        })->download($type);
    }
}

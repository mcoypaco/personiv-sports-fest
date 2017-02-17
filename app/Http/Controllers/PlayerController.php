<?php

namespace App\Http\Controllers;

use App\Player;
use App\Team;
use App\Sport;
use App\Events\DraftPlayers;
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
        event(new AddPlayers(Player::all()));
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
      event(new DraftPlayers(Team::all()));
      $team->addRemovePlayer($request , $id);
      $draft= new Draft();
      $draft->addRemovePlayer($request->team_id , $id);
      $player = Player::find($id);
      $player->team_id = $request->team_id;
      $player->push();
      return response()->json(array('success' => true));
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
        // $filename = 'players';
        // $players = Player::with('positions', 'team', 'sports')->get();

        // $players = Player::select('id', 'employee_id', 'first_name', 'last_name')->get();

        // Excel::create($filename, function($excel) use ($players) {
        //     $excel->setTitle('All Players');
        //     $excel->sheet('players', function($sheet) use ($players) {
        //         $sheet->fromArray($users);
        //     });
        // })->store('xls', storage_path('excel/exports'));

        // return response()->json(array('success' => true));
        // Excel::create($filename)->store('xls');
        // return response()->download('exports/'.$filename.'.xls');

        $data = Player::get()->toArray();
        return Excel::create('WATATA', function($excel) use ($data) {
            $excel->sheet('mySheet', function($sheet) use ($data)
            {
                $sheet->fromArray($data);
            });
        })->download($type);
    }
}

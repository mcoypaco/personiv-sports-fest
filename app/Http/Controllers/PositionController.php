<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Position;
use App\Sport;
use Illuminate\Support\Facades\Input;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Position::get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $position = new Position();
        $position->name = Input::get('name');
        $sport = Sport::find(Input::get('id'));
        $position->sport()->associate($sport);
        $position->save();
        return response()->json($position);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Position::destroy($id);
    
        return response()->json(array('success' => true));
    }
}

<?php

namespace App\Http\Controllers;

use App\Sport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use File;

class SportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return response()->json(Sport::with('positions')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sport = Sport::create(array(
            'name' => Input::get('name'),
            'description' => Input::get('description')
            ));
        return response()->json(array('success' => true, 'id' => $sport->id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Sport::with(['positions', 'players'])->find($id));
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
        $sport = Sport::find($id);
        $sport->name = Input::get('name');
        $sport->description = Input::get('description');
        $sport->push();
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
        Sport::destroy($id);
        return response()->json(array('success' => true));
    }

    public function upload(Request $request, $id)
    {
        $file = $request->file('file');
        if ($file != null) {
            $file = $request->file;
            $extension = $request->file->extension();
            $sport = Sport::find($id);
            $sport->img_extension = $extension;
            $sport->push();
            if (!file_exists(public_path().'/uploads/sports')) {
                File::makeDirectory(public_path().'/uploads/sports', 0777, true);
            }
            $request->file->storeAs('/uploads/sports', ''.$id.'.'.$extension);
            response()->json(array('success' => "lolol"));
        }
    }

    public function getPlayers($id)
    {
        return response()->json(Sport::find($id)->players()->with('positions')->where('team_id', null)->get());
    }

}

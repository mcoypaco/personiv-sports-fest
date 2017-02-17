<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // $user = User::all();
        return response()->json(User::with('role')->get());
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
        $user = User::create([
          'email' => $request->email,
          'password' => bcrypt($request->password),
          'first_name' => $request->first_name,
          'last_name' => $request->last_name,
          'cellphone_number' => $request->cellphone_number,
          'role_id' => $request->role_id,
        ]);

        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(User::find($id));
        // return response()->json(User::with('team')->find($id));
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
        // echo $id;
        $user = User::find($id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->cellphone_number = $request->cellphone_number;
        $user->role_id = $request->role_id;
        $user->email = $request->email;
        $user->save();
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function poc()
    {
      $user = new User();
      return response()->json($user->poc());
    }

    public function changePassword(Request $request, $id)
    {
        $user = User::find($id);
        $userPassword = $user->getAuthPassword();
        if (Hash::check($request->oldPassword, $userPassword)) {
            // The passwords match...
            $user->password = Hash::make($request->newPassword);
            $user->save();
            return response()->json(array('success' => true));
        }
        else {
            return response()->json(array('success' => false));
        }
    }
}

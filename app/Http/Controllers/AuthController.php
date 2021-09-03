<?php

namespace App\Http\Controllers;

class AuthController extends Controller{

    public function signin(){
        return view('auth/connect');
    }

    
}
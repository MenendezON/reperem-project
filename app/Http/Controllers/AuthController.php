<?php

namespace App\Http\Controllers;

class AuthController extends Controller{
    public function login(){
        return view('auth/connect');
    }


    public function subscribe(){
        return view('auth/subscribe');
    }
}
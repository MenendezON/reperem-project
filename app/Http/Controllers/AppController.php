<?php

namespace App\Http\Controllers;

class AppController extends Controller{

    public function index(){
        return view('index');
    }

    public function showById($id){
        return view('voir', compact('id'));
    }
}
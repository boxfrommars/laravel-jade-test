<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {

    $characters = [
        ['name' => 'Doctor'],
        ['name' => 'TARDIS'],
        ['name' => 'Master'],
        ['name' => 'Sarah-Jane'],
        ['name' => 'Meddling-Monk'],
        ['name' => 'Susan'],
        ['name' => 'Brigadier'],
    ];

    return view('frontend.page', compact('characters'));
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Lab;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('labs', 'LabController@index');
    Route::get('labs/{lab}', 'LabController@show');
    Route::group([
        'middleware' => 'admin'
    ], function () {
        Route::post('labs', 'LabController@store');
        Route::put('labs/{lab}', 'LabController@update');
        Route::delete('labs/{lab}', 'LabController@delete');
    });
});



<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//,'middleware'=>'jwt.auth'
//adcionar JWT Global Pra Interceptar as Rotas
Route::group(['namespace'=>'Autentication'],function (){
    Route::get('/','AutenticationController@index');
    Route::post('/signup','AutenticationController@signup');
    Route::post('/signin','AutenticationController@signin');
    Route::get('/teste',function (){
        return "Teste Funcionando";
    });
});


//,'middleware'=>'jwt.auth'
Route::group(['prefix'=>'api','middleware'=>'jwt.auth'],function (){
    Route::get('/restrita',function (){
       $res = [
           "Status"=>200,
           "msg" =>"sucesso"
       ];
        return $res;
    });
});

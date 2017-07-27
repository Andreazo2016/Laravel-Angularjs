<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{

    public function __construct()
    {
        //middleware não deixa a passagem das URl idgame
        $this->middleware('auth')
            ->only([
                'idGame'
            ]);
    }
    //metodoa ser chamado e retornado pela a rota inicial
    public function index(){
        return "Funcionando o meu Primeiro Controller";
    }
    public function idGame($id){
        return "cod do game {$id}";
    }
}

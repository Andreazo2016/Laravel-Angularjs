<?php

namespace App\Http\Controllers\Autentication;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Mockery\Exception;
use App\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;


class AutenticationController extends Controller
{
    public function index(){
        return view('spa');
    }
    //Registra-se
    public function signup(Request $request,Response $response){
        $credenciais = $request->only('name','email','password');
        //Criar Senha Encripitada
        $credencial['password'] = Hash::make($credenciais['password']);
        try{
            $user = User::create($credenciais);
        }
        catch (Exception $e){
            return Response::json(['error' => 'Usuario Já Existe.'], HttpResponse::HTTP_CONFLICT);

        }
        $token = JWTAuth::fromUser($user);
        $UserToken = JWTAuth::setToken($token);


        $userToken = [
            'User' =>$user->name,
            'Token' =>$token
        ];
       return response()->json(compact('token'));

    }
    //logar
    public function  signin (Request $request,Response $response){
        $credencial = $request->only(['email', 'password']);


        if(!$token = JWTAuth::attempt($credencial)){
            return response()->json(['msg' =>'Usuario nao autorizado'], $response::HTTP_UNAUTHORIZED);
        }

        $userToken = [
            'token' =>$token
        ];
       // return response()->json(compact('token'));

        return $userToken;
    }
}

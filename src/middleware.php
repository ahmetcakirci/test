<?php
// Application middleware

use Slim\Middleware\TokenAuthentication;

$authenticator = function($request, TokenAuthentication $tokenAuth){
    $token = $tokenAuth->findToken($request);
    $tokenAuth->getUserByToken($token);
};
$error = function($request, $response, TokenAuthentication $tokenAuth) {
    $output = [
        'msg' => $tokenAuth->getResponseMessage(),
        'token' => $tokenAuth->getResponseToken(),
        'status' => 401,
        'error' => true
    ];
    return $response->withJson($output, 401);
};

$app->add(new TokenAuthentication($app,[
    'path' =>   ['/UserList','/UserGet'],
    'authenticator' => $authenticator,
    'header' => 'Token-Authorization-X',
    'regex' => '/Basic\s+(.*)$/i',
    'secure' => false,
    'error' => $error
]));

<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../../vendor/autoload.php';

$settings = require __DIR__ . '/../../src/settings.php';
$app = new \Slim\App($settings);

require __DIR__ . '/../../src/dependencies.php';
require __DIR__ . '/../../src/middleware.php';

$app->post('/Login', function (Request $request, Response $response) {
    $username = $request->getParam('username');
    $password = $request->getParam('password');

    $sth = $this->db->prepare("SELECT * FROM tbl_users WHERE username='$username' and password='$password'");
    $sth->execute();
    $user = $sth->fetch();

    $error=true;
    $token="";

    if ($user != null) {
        $sth = $this->db->prepare("UPDATE tbl_users SET
                    token = :token
                    WHERE id = :id");
        $token=md5(uniqid());
        $update = $sth->execute(array(
            "token" =>$token,
            "id" => $user['id']
        ));
        if ( $update ){
            $error=false;
        }
    }

    $output = [
        'msg' => (!$error?'Login success':'Login failed'),
        'token' => $token,
        'status' => (!$error?200:401),
        'error' => $error
    ];

    return $this->response->withJson($output);
});

$app->get('/Logout', function (Request $request, Response $response) {
    $output = [
        'msg' => 'Logout success',
        'token' => '',
        'status' => 200,
        'error' => false
    ];
    return $this->response->withJson($output);
});

$app->get('/UserGet/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $sth = $this->db->prepare("SELECT * FROM tbl_users WHERE id=$id");
    $sth->execute();
    $todos = $sth->fetch();
    return $this->response->withJson($todos);
});

$app->get('/UserList', function (Request $request, Response $response) {
    $sth = $this->db->prepare("SELECT * FROM tbl_users");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

$app->run();
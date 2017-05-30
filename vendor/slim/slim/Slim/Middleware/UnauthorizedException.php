<?php

namespace Slim\Middleware;

use Slim\Middleware\TokenAuthentication\UnauthorizedExceptionInterface;

class UnauthorizedException extends \Exception implements UnauthorizedExceptionInterface
{

}
<?php

namespace App\Exceptions;

use Exception;

class InvalidServiceStructureException extends Exception
{
    protected $message = 'The service does not implement the required interface or has invalid structure.';
}
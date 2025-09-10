<?php

namespace App\Http\Controllers;

use App\Services\RouterService;
use Illuminate\Support\Str;

class ServicesController extends Controller
{
    protected array $validatedData = [];
    
    public function __call($service, $method)
    {
        $servicePascal = Str::pascal($service);
        $methodCamel = $method ? Str::camel($method) : 'index';

        /** @var \App\Services\ServiceInterface $serviceClass */
        $serviceClass = RouterService::getServiceClass($servicePascal, $methodCamel);
        if (!$serviceClass) {
            return $this->respondNotFound("Service '{$service}' or method '{$method}' not found.");
        }

        $validateRequest = $serviceClass->validateRequest();
        if (is_array($validateRequest)) {
            return $this->respondWithError('Invalid request data.', $validateRequest, 400);
        }

        return $serviceClass->$methodCamel( $serviceClass->getValidatedData() );
    }

    protected function respondWithError($message, $details, $status = 400)
    {
        return response()->json(['error' => $message, 'details' => $details], $status);
    }

    protected function respondWithSuccess($data, $status = 200)
    {
        return response()->json($data, $status);
    }

    protected function respondNotFound($message = 'Resource not found')
    {
        return $this->respondWithError($message, 404);
    }
}

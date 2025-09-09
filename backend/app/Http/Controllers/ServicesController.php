<?php

namespace App\Http\Controllers;

use App\Services\RouterService;


class ServicesController extends Controller
{
    protected array $validatedData = [];
    
    public function __call($service, $method)
    {
        /** @var \App\Services\ServiceInterface $serviceClass */
        $serviceClass = RouterService::getServiceClass($service, $method);
        if (!$serviceClass) {
            return $this->respondNotFound("Service '$service' not found.");
        }

        $validateRequest = $serviceClass->validateRequest();
        if (is_array($validateRequest)) {
            return $this->respondWithError('Invalid request data.', $validateRequest, 400);
        }

        return $serviceClass->$method( $serviceClass->getValidatedData() );
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

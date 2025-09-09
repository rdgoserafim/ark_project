<?php

namespace App\Http\Controllers;

use App\Services\RouterService;


class ServicesController extends Controller
{
    public function __call($service, $method)
    {
        $serviceClass = RouterService::getServiceClass($service);
        if (!$serviceClass) {
            return $this->respondNotFound("Service '$service' not found.");
        }

        $request = request();
        return response()->json([$service, $method, $request->all()]);
    }

    protected function respondWithError($message, $status = 400)
    {
        return response()->json(['error' => $message], $status);
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

<?php

namespace App\Services;

use App\Exceptions\InvalidServiceStructureException;
use Exception;
use Illuminate\Support\Facades\Log;

class RouterService
{
    public static function getServiceClass(string $service, $method): ?DomainService
    {

        $serviceClassName = 'App\\Services\\' . $service. '\\' . $service. 'Service';
        $serviceClassName = class_exists($serviceClassName) ? $serviceClassName : null;

        if($serviceClassName) {

            /** @var DomainService $serviceClass */
            $serviceClass = new $serviceClassName();

            if( !$serviceClass instanceof DomainService ) {
                return self::launchError('The service must extend DomainService.');
            }

            if( !$serviceClass instanceof \App\Interfaces\ServicesInterface ){
                return self::launchError('The service must implement ServicesInterface.');
            }

            if ( !method_exists($serviceClass, $method) ) {
                // throw new Exception('Method ' . $method . ' does not exist in service ' . $service);
                return null;
            }

            return $serviceClass;
        }

        return null;
    }

    private static function launchError(string $message)
    {
        // Log the error message
        Log::error($message);
        throw new InvalidServiceStructureException();
        return null;
    }
}
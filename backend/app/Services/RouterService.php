<?php

namespace App\Services;

use App\Exceptions\InvalidServiceStructureException;

class RouterService
{
    public static function getServiceClass(string $service, $method): ?AbstractService
    {
        $serviceClassName = 'App\\Services\\' . ucfirst($service). '\\' . ucfirst($service). 'Service';
        $serviceClassName = class_exists($serviceClassName) ? $serviceClassName : null;

        if($serviceClassName) {
            $serviceClass = new $serviceClassName();
            if( !$serviceClass instanceof AbstractService ) {
                return self::launchError('The service must extend AbstractService.');
            }

            if( !$serviceClass instanceof \App\Interfaces\ServicesInterface ){
                return self::launchError('The service must implement ServicesInterface.');
            }

            if (method_exists($serviceClass, $method)) {
                try {
                    $result = $serviceClass->$method();
                    return $serviceClass;
                } catch (\Exception $e) {
                    return self::launchError('Service method error.', $e->getMessage(), 500);
                }
            }

            return $serviceClass;
        }

        return null;
    }

    private static function launchError(string $message)
    {
        // Log the error message
        error_log($message);
        throw new InvalidServiceStructureException();
        return null;
    }
}
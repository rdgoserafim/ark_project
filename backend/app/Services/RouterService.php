<?php

namespace App\Services;

use App\Exceptions\InvalidServiceStructureException;

class RouterService
{
    public static function getServiceClass(string $service): ?AbstractService
    {
        $serviceClassName = 'App\\Services\\' . ucfirst($service). '\\' . ucfirst($service). 'Service';
        $serviceClassName = class_exists($serviceClassName) ? $serviceClassName : null;

        if($serviceClassName) {
            $serviceClass = new $serviceClassName();
            if(
                !($serviceClass instanceof AbstractService)
                && !($serviceClass instanceof \App\Interfaces\ServicesInterface)
                ) {
                throw new InvalidServiceStructureException();
                return null;
            }
            return $serviceClass;
        }

        return null;
    }
}
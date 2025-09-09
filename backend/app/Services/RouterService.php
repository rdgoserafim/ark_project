<?php

namespace App\Services;

class RouterService
{
    public static function getServiceClass(string $service): ?string
    {
        $serviceClass = 'App\\Services\\' . ucfirst($service) . 'Service';
        return class_exists($serviceClass) ? $serviceClass : null;
    }
}
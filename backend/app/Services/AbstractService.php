<?php

namespace App\Services;

use App\DTOs\PaginatedResponseDTO;

abstract class AbstractService
{
    public function validateRequest()
    {
        // $request = request();
        $class = $this->getCallerClass();
        if (!in_array(\App\Interfaces\ServicesInterface::class, class_implements($class))) {
            throw new \App\Exceptions\InvalidServiceStructureException();
        }
        $instance = new $class();
        $requestClass = $instance->getRequestClass();

        if ($requestClass) {
            $request = app($requestClass);
            $request->validateResolved();
        }
    }

    protected function getCallerClass(): string
    {
        return get_class($this);
    }

    protected function formatPaginationResponse(array $data): PaginatedResponseDTO
    {
        $total = count($data);
        $per_page = 10;
        $current_page = 1;
        $last_page = (int) ceil($total / $per_page);

        return new PaginatedResponseDTO(
                $data, 
                $total, 
                $per_page, 
                $current_page, 
                $last_page
            );
    }
}

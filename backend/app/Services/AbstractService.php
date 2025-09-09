<?php

namespace App\Services;

use App\DTOs\PaginatedResponseDTO;

abstract class AbstractService
{
    // Common functionality for all services can be defined here
    public function validateRequest()
    {
        // $request = request();
        return $this->getCallerClass();

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

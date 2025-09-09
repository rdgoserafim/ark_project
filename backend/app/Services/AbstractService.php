<?php

namespace App\Services;

use App\DTOs\PaginatedResponseDTO;
use Illuminate\Support\Facades\Validator;

abstract class AbstractService
{
    private array $validatedData = [];

    public function validateRequest(): array|bool
    {
        $request = request();
        $class = $this->getCallerClass();
        if (!in_array(\App\Interfaces\ServicesInterface::class, class_implements($class))) {
            throw new \App\Exceptions\InvalidServiceStructureException();
        }
        $instance = new $class();
        $requestClass = $instance->getRequestClass();

        if ($requestClass) {
            $rules = (new $requestClass)->rules();
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return $validator->errors()->toArray();
            }

            $this->validatedData = $validator->validated();
        }
        return true;
    }

    protected function getCallerClass(): string
    {
        return get_class($this);
    }

    protected function getValidatedData(): array
    {
        return $this->validatedData;
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

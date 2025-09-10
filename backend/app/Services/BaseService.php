<?php

namespace App\Services;

use App\DTOs\PaginatedResponseDTO;
use Illuminate\Support\Facades\Validator;

abstract class BaseService extends AbstractService
{
    const DEFAULT_PER_PAGE = 10;
    const DEFAULT_CURRENT_PAGE = 1;
    const VALIDATE_METHODS = ['post', 'put', 'patch'];

    private array $validatedData = [];
    
    public function validateRequest( ?int $id = null): array|bool
    {
        $request = request();
        $class = get_class($this);
        if (!in_array(\App\Interfaces\ServicesInterface::class, class_implements($class))) {
            throw new \App\Exceptions\InvalidServiceStructureException();
        }
        $instance = new $class();
        $requestClass = $instance->getRequestClass();

        if ($requestClass && in_array(strtolower($request->method()), self::VALIDATE_METHODS)) {
            $rules = (new $requestClass)->rules();
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return $validator->errors()->toArray();
            }

            $this->validatedData = $validator->validated();

            if($id){
                $this->validatedData['id'] = $id;
            }
        }
        return true;
    }

    public function getValidatedData(): array
    {
        return $this->validatedData;
    }

    protected function formatPaginationResponse(array $data): \Illuminate\Http\JsonResponse
    {
        $total = count($data);
        $per_page = self::DEFAULT_PER_PAGE;
        $current_page = self::DEFAULT_CURRENT_PAGE;
        $last_page = (int) ceil($total / $per_page);

        return response()->json($this->formatResponse( new PaginatedResponseDTO($data, $total, $per_page, $current_page, $last_page ) ));
    }

    protected function formatResponse( mixed $data ): array
    {
        if( $data instanceof PaginatedResponseDTO ) {
            return [
                'result' => 'success',
                'data' => $data->data,
                'meta' => $data->meta
            ];
        }

        if (is_array($data)) {
            return [
                'result' => 'success',
                'data' => $data
            ];
        }

        return [
            'result' => 'success',
            'data' => [$data]
        ];
    }
}

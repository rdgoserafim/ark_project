<?php

namespace App\Services;

use App\DTOs\PaginatedResponseDTO;
use Illuminate\Support\Facades\Validator;

abstract class AbstractService
{
    const DEFAULT_PER_PAGE = 10;
    const DEFAULT_CURRENT_PAGE = 1;
    const VALIDATE_METHODS = ['post', 'put', 'patch'];

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

        if ($requestClass && in_array(strtolower($request->method()), self::VALIDATE_METHODS)) {
            $rules = (new $requestClass)->rules();
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return $validator->errors()->toArray();
            }

            $this->validatedData = $validator->validated();
        }
        return true;
    }

    public function getCallerClass(): string
    {
        return get_class($this);
    }

    public function getValidatedData(): array
    {
        return $this->validatedData;
    }

    protected function formatPaginationResponse(array $data): array
    {
        $total = count($data);
        $per_page = self::DEFAULT_PER_PAGE;
        $current_page = self::DEFAULT_CURRENT_PAGE;
        $last_page = (int) ceil($total / $per_page);

        return $this->formatResponse( new PaginatedResponseDTO($data, $total, $per_page, $current_page, $last_page ) );
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

    public function index() //: PaginatedResponseDTO
    {
        /** @var string $modelClass */
        $modelClass = $this->getModelClass();
        
        if (!$modelClass) {
            throw new \Exception('Model class not defined in the service.');
        }

        if (!class_exists($modelClass) || !is_subclass_of($modelClass, \Illuminate\Database\Eloquent\Model::class)) {
            throw new \Exception('Invalid model class: ' . $modelClass);
        }

        $data = $modelClass::all()->toArray();
        // return response()->json(['modelClass' => $modelClass]);
        
        return $this->formatPaginationResponse($data);
    }
}

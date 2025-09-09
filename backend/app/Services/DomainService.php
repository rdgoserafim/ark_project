<?php

namespace App\Services;

abstract class DomainService extends BaseService
{
    public function index(): \Illuminate\Http\JsonResponse
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
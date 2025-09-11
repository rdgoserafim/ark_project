<?php

namespace App\Services;

abstract class DomainService extends BaseService
{
    protected function errorModelClassNotDefined(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'result' => 'error',
            'message' => 'Model class not defined in the service.'
        ], 500);
    }

    protected function errorInvalidModelClass(string $modelClass): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'result' => 'error',
            'message' => 'Invalid model class: ' . $modelClass
        ], 500);
    }

    protected function getId() : int|null
    {
        return request()->input('id') ?? request()->route('id') ?? request()->segment(3) ?? ($this->getValidatedData()['id'] ?? null);
    }

    public function index(): \Illuminate\Http\JsonResponse
    {
        /** @var string $modelClass */
        $modelClass = $this->getModelClass();
        
        if (!$modelClass) {
            return $this->errorModelClassNotDefined();
        }

        if (!class_exists($modelClass) || !is_subclass_of($modelClass, \Illuminate\Database\Eloquent\Model::class)) {
            return $this->errorInvalidModelClass($modelClass);
        }

        try {

            $query = $modelClass::query();

            // $data = $query->get()->map( fn($m) => $m->toArray())->toArray();
            $data = $query->get();

            $dto = $this->getDtoClass();
            if (!$dto || !class_exists($dto) || !method_exists($dto, 'fromModel')) {
                return $this->formatPaginationResponse($data->toArray());
            }

            return $this->formatPaginationResponse($data->map(fn($item) => $dto::fromModel($item) )->toArray());

        } catch (\Exception $e) {
            return response()->json([
                'result' => 'error',
                'message' => 'Failed to retrieve data: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(array $validatedData = []): \Illuminate\Http\JsonResponse
    {
        $validation = $this->validateRequest();
        if (is_array($validation)) {
            return response()->json([
                'result' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation
            ], 422);
        }

        /** @var string $modelClass */
        $modelClass = $this->getModelClass();
        
        if (!$modelClass) {
            return $this->errorModelClassNotDefined();
        }

        if (!class_exists($modelClass) || !is_subclass_of($modelClass, \Illuminate\Database\Eloquent\Model::class)) {
            return $this->errorInvalidModelClass($modelClass);
        }

        try {
            $data = empty($validatedData) ? $this->getValidatedData() : $validatedData;
            $model = $modelClass::create($data);
            
            return response()->json($this->formatResponse($model->toArray()), 201);
        } catch (\Exception $e) {
            return response()->json([
                'result' => 'error',
                'message' => 'Failed to create resource: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(array $validatedData = []): \Illuminate\Http\JsonResponse
    {
        /** @var string $modelClass */
        $modelClass = $this->getModelClass();
        
        if (!$modelClass) {
            return $this->errorModelClassNotDefined();
        }

        if (!class_exists($modelClass) || !is_subclass_of($modelClass, \Illuminate\Database\Eloquent\Model::class)) {
            return $this->errorInvalidModelClass($modelClass);
        }

        $id = $this->getId();

        if (!$id) {
            return response()->json([
                'result' => 'error',
                'message' => 'ID parameter is required'
            ], 400);
        }

        try {
            $model = $modelClass::find($id);
            
            if (!$model) {
                return response()->json([
                    'result' => 'error',
                    'message' => 'Resource not found'
                ], 404);
            }
            
            return response()->json($this->formatResponse($model->toArray()));
        } catch (\Exception $e) {
            return response()->json([
                'result' => 'error',
                'message' => 'Failed to retrieve resource: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(array $validatedData = []): \Illuminate\Http\JsonResponse
    {
        $id = $this->getId();
        
        if (!$id) {
            return response()->json([
                'result' => 'error',
                'message' => 'ID parameter is required'
            ], 400);
        }

        $validation = $this->validateRequest($id);
        if (is_array($validation)) {
            return response()->json([
                'result' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation
            ], 422);
        }

        /** @var string $modelClass */
        $modelClass = $this->getModelClass();
        
        if (!$modelClass) {
            return $this->errorModelClassNotDefined();
        }

        if (!class_exists($modelClass) || !is_subclass_of($modelClass, \Illuminate\Database\Eloquent\Model::class)) {
            return $this->errorInvalidModelClass($modelClass);
        }

        try {
            $model = $modelClass::find($id);
            
            if (!$model) {
                return response()->json([
                    'result' => 'error',
                    'message' => 'Resource not found'
                ], 404);
            }

            $data = empty($validatedData) ? $this->getValidatedData() : $validatedData;
            
            // Remove o ID dos dados para não tentar atualizá-lo
            unset($data['id']);
            
            $model->update($data);
            
            return response()->json($this->formatResponse($model->fresh()->toArray()));
        } catch (\Exception $e) {
            return response()->json([
                'result' => 'error',
                'message' => 'Failed to update resource: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(array $validatedData = []): \Illuminate\Http\JsonResponse
    {
        /** @var string $modelClass */
        $modelClass = $this->getModelClass();
        
        if (!$modelClass) {
            return $this->errorModelClassNotDefined();
        }

        if (!class_exists($modelClass) || !is_subclass_of($modelClass, \Illuminate\Database\Eloquent\Model::class)) {
            return $this->errorInvalidModelClass($modelClass);
        }

        $id = $this->getId();
        
        if (!$id) {
            return response()->json([
                'result' => 'error',
                'message' => 'ID parameter is required'
            ], 400);
        }

        try {
            $model = $modelClass::find($id);
            
            if (!$model) {
                return response()->json([
                    'result' => 'error',
                    'message' => 'Resource not found'
                ], 404);
            }
            
            $model->delete();
            
            return response()->json([
                'result' => 'success',
                'message' => 'Resource deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'result' => 'error',
                'message' => 'Failed to delete resource: ' . $e->getMessage()
            ], 500);
        }
    }
}
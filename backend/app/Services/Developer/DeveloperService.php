<?php

namespace App\Services\Developer;

use App\Interfaces\ServicesInterface;

class DeveloperService extends \App\Services\DomainService implements ServicesInterface
{
    public function getDTOClass(): ?string
    {
        return \App\DTOs\DeveloperDTO::class;
    }

    public function getModelClass(): ?string
    {
        return \App\Models\Developer::class;
    }

    public function getRequestClass(): ?string
    {
        return \App\Http\Requests\DeveloperRequest::class;
    }

    public function customMethod(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'result' => 'success',
            'message' => 'This is a custom method in DeveloperService.'
        ]);
    }
}

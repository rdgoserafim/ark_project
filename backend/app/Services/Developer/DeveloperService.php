<?php

namespace App\Services\Developer;

use App\Interfaces\ServicesInterface;

class DeveloperService extends \App\Services\AbstractService implements ServicesInterface
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
}

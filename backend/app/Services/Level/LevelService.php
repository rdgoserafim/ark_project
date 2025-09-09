<?php

namespace App\Services\Level;

class LevelService extends \App\Services\AbstractService implements \App\Interfaces\ServicesInterface
{
    public function getDTOClass(): ?string
    {
        return \App\DTOs\LevelDTO::class;
    }

    public function getModelClass(): ?string
    {
        return \App\Models\Level::class;
    }

    public function getRequestClass(): ?string
    {
        return \App\Http\Requests\LevelRequest::class;
    }
}

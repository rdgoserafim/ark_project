<?php

namespace App\DTOs;

class LevelDTO
{
    public string $name;

    public function __construct(array $data)
    {
        $this->name = $data['name'];
    }
}

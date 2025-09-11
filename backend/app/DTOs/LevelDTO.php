<?php

namespace App\DTOs;

class LevelDTO
{
    public string $name;
    public int $id;

    public function __construct(array $data)
    {
        $this->name = $data['name'];
        $this->id = $data['id'];
    }

    static public function fromModel($model): LevelDTO
    {
        return new LevelDTO([
            'id' => $model->id,
            'name' => $model->name,
        ]);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}

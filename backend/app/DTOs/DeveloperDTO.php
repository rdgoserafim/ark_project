<?php

namespace App\DTOs;

use App\Models\Developer;

class DeveloperDTO
{
    public int $id;
    public string $name;
    public string $sexo;
    public string $data_nascimento;
    public string $hobby;
    public int $level_id;
    public ?object $level = null;

    public function __construct(array $data)
    {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->sexo = $data['sexo'];
        $this->data_nascimento = $data['data_nascimento'];
        $this->hobby = $data['hobby'];
        $this->level_id = $data['level_id'];
        $this->level = isset($data['level']) ? (object)$data['level'] : null;
    }

    static public function fromModel(Developer $model): DeveloperDTO
    {
        return new DeveloperDTO([
            'id' => $model->id,
            'name' => $model->name,
            'sexo' => $model->sexo,
            'data_nascimento' => $model->data_nascimento->format('Y-m-d'),
            'hobby' => $model->hobby,
            'level_id' => $model->level_id,
            'level' => [
                'id' => $model->level->id,
                'name' => $model->level->name,
            ]
        ]);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sexo' => $this->sexo,
            'data_nascimento' => $this->data_nascimento,
            'hobby' => $this->hobby,
            'level_id' => $this->level_id,
            'level' => [
                'id' => $this?->level?->id ?? null,
                'name' => $this?->level?->name ?? null,
            ]
        ];
    }
}

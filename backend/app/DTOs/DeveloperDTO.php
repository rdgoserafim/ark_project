<?php

namespace App\DTOs;

class DeveloperDTO
{
    public string $name;
    public string $sexo;
    public string $data_nascimento;
    public string $hobby;
    public int $level_id;

    public function __construct(array $data)
    {
        $this->name = $data['name'];
        $this->sexo = $data['sexo'];
        $this->data_nascimento = $data['data_nascimento'];
        $this->hobby = $data['hobby'];
        $this->level_id = $data['level_id'];
    }
}

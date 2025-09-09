<?php

namespace App\DTOs;

class PaginatedResponseDTO
{
    public array $data;
    public array $meta;

    public function __construct(array $data, int $total, int $per_page, int $current_page, int $last_page)
    {
        $this->data = $data;
        $this->meta = [
            'total' => $total,
            'per_page' => $per_page,
            'current_page' => $current_page,
            'last_page' => $last_page,
        ];
    }
}

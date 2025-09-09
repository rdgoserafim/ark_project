<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LevelRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
        ];
    }
}

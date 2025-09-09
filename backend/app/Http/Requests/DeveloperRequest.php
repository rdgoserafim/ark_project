<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeveloperRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'sexo' => 'required|in:M,F,O,N/A',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string|max:255',
            'level_id' => 'required|exists:levels,id',
        ];
    }
}

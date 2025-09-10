<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'sexo', 'data_nascimento', 'hobby', 'level_id'];

    protected $casts = [
        'data_nascimento' => 'date',
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}

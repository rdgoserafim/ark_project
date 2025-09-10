<?php

namespace Database\Factories;

use App\Models\Developer;
use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Developer>
 */
class DeveloperFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Developer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'sexo' => $this->faker->randomElement(['M', 'F', 'O', 'N/A']),
            'data_nascimento' => $this->faker->date,
            'hobby' => $this->faker->word,
            'level_id' => Level::factory(),
        ];
    }
}

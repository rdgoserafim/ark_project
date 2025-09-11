<?php

namespace Tests\Unit\Services;

use App\Models\Developer;
use App\Models\Level;
use App\Services\Developer\DeveloperService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class DeveloperServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $developerService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->developerService = new DeveloperService();
    }

    public function testIndex()
    {
        $level = Level::factory()->create();
        Developer::factory()->create(['level_id' => $level->id]);
        Developer::factory()->create(['level_id' => $level->id]);

        $response = $this->developerService->index();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertCount(2, $data['data']);
    }

    public function testStore()
    {
        $level = Level::factory()->create();
        $data = ['name' => 'New Developer', 'sexo' => 'M', 'data_nascimento' => '1990-01-01', 'hobby' => 'Coding', 'level_id' => $level->id];

        $this->app['request'] = Request::create('/', 'POST', $data);

        $response = $this->developerService->store();

        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertDatabaseHas('developers', ['name' => 'New Developer']);
    }

    public function testShow()
    {
        $level = Level::factory()->create();
        $developer = Developer::factory()->create(['level_id' => $level->id, 'name' => 'John Doe']);

        $this->app['request'] = Request::create("/{$developer->id}", 'GET')->merge(['id' => $developer->id]);

        $response = $this->developerService->show();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertEquals('John Doe', $data['data']['name']);
    }

    public function testShowNotFound()
    {
        $this->app['request'] = Request::create('/999', 'GET')->merge(['id' => 999]);

        $response = $this->developerService->show();

        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('error', $data['result']);
    }

    public function testUpdate()
    {
        $level = Level::factory()->create();
        $developer = Developer::factory()->create(['level_id' => $level->id, 'name' => 'John Doe']);

        $data = [
            'name' => 'Updated Developer',
            'sexo' => 'M',
            'data_nascimento' => '1990-01-01',
            'hobby' => 'Coding',
            'level_id' => $level->id
        ];

        $this->app['request'] = Request::create("/{$developer->id}", 'PUT', $data)->merge(['id' => $developer->id]);

        $response = $this->developerService->update();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertDatabaseHas('developers', ['name' => 'Updated Developer']);
    }

    public function testDestroy()
    {
        $level = Level::factory()->create();
        $developer = Developer::factory()->create(['level_id' => $level->id]);

        $this->app['request'] = Request::create("/{$developer->id}", 'DELETE')->merge(['id' => $developer->id]);

        $response = $this->developerService->destroy();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertDatabaseMissing('developers', ['id' => $developer->id]);
    }

    public function testCustomMethod()
    {
        $response = $this->developerService->customMethod();

        $this->assertEquals(204, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertEquals('This is a custom method in DeveloperService.', $data['message']);
    }
}

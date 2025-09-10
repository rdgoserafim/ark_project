<?php

namespace Tests\Unit\Services;

use App\Models\Level;
use App\Services\Level\LevelService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class LevelServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $levelService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->levelService = new LevelService();
    }

    public function testIndex()
    {
        Level::factory()->create(['name' => 'Junior']);
        Level::factory()->create(['name' => 'Senior']);

        $response = $this->levelService->index();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertCount(2, $data['data']);
    }

    public function testStore()
    {
        $data = ['name' => 'Pleno'];

        $this->app['request'] = Request::create('/', 'POST', $data);

        $response = $this->levelService->store();

        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertDatabaseHas('levels', ['name' => 'Pleno']);
    }

    public function testShow()
    {
        $level = Level::factory()->create(['name' => 'Junior']);

        $this->app['request'] = Request::create("/{$level->id}", 'GET')->merge(['id' => $level->id]);

        $response = $this->levelService->show();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertEquals('Junior', $data['data']['name']);
    }

    public function testShowNotFound()
    {
        $this->app['request'] = Request::create('/999', 'GET')->merge(['id' => 999]);

        $response = $this->levelService->show();

        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('error', $data['result']);
    }

    public function testUpdate()
    {
        $level = Level::factory()->create(['name' => 'Junior']);

        $data = ['name' => 'Updated Level'];

        $this->app['request'] = Request::create("/{$level->id}", 'PUT', $data)->merge(['id' => $level->id]);

        $response = $this->levelService->update();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertDatabaseHas('levels', ['name' => 'Updated Level']);
    }

    public function testDestroy()
    {
        $level = Level::factory()->create(['name' => 'Junior']);

        $this->app['request'] = Request::create("/{$level->id}", 'DELETE')->merge(['id' => $level->id]);

        $response = $this->levelService->destroy();

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('success', $data['result']);
        $this->assertDatabaseMissing('levels', ['id' => $level->id]);
    }
}

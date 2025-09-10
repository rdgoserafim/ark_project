<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicesController;


Route::middleware('api')->group(function () {
    Route::any('/{service}/{method?}/{id?}', [ServicesController::class, '__call'])->where('id', '[0-9]+');
});
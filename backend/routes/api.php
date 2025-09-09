<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicesController;


Route::middleware('api')->group(function () {
    Route::any('/{service}/{method?}', [ServicesController::class, '__call']);
});
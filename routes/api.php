<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
// Route::group([
//     "middleware" => ['auth:sanctum']
// ], function(){
//     Route::post('auth/logout', [AuthController::class, 'logout']);
//     Route::get('user-profile', [AuthController::class, 'userProfile']);
//     Route::apiResource('products', ProductController::class);
//     // Route::post('refresh-tokens',[ApiController::class, 'logout']);


// });
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::apiResource('contacts', ContactsController::class);
});


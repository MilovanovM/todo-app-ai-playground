<?php

use Illuminate\Support\Facades\Route;

Route::prefix('todos')->group(function () {
    Route::get('/',  [App\Http\Controllers\ToDoController::class, 'index']);
    Route::post('/', [App\Http\Controllers\ToDoController::class, 'store']);
    Route::delete('/{id}', [App\Http\Controllers\ToDoController::class, 'destroy']);
});

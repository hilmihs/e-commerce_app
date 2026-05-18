<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\MidtransWebhookController;
use App\Http\Controllers\Api\OrderLookupController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShippingQuoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product:slug}', [ProductController::class, 'show']);
    Route::post('/shipping/quote', ShippingQuoteController::class)->middleware('throttle:30,1');
    Route::post('/checkout', CheckoutController::class)->middleware('throttle:20,1');
    Route::get('/orders/{order:order_number}', OrderLookupController::class);
    Route::post('/payments/midtrans/webhook', MidtransWebhookController::class)->middleware('throttle:120,1');

    Route::prefix('admin')->group(function (): void {
        Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

        Route::middleware(['auth:sanctum', 'admin'])->group(function (): void {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);
            Route::apiResource('/products', AdminProductController::class);
            Route::get('/orders', [AdminOrderController::class, 'index']);
            Route::get('/orders/{order}', [AdminOrderController::class, 'show']);
            Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus']);
        });
    });
});

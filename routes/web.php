<?php

use App\Http\Controllers\SpaController;
use App\Imports\EkramImport;
use App\Models\Child;
use Illuminate\Support\Facades\Route;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/migrate/fresh', function () {
    Artisan::call("migrate:fresh");
});

Route::get('/import', function () {
    Excel::import(new EkramImport, "ekram.xls", "ekram");
});


// Route::get("office",[CreditController::class,"office"]);

Route::get('{path}', SpaController::class)->where('path', '(.*)');

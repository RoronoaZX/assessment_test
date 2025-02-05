<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Laptop',
                'price' => 1200.00,
                'total_cost' => 1200.00,
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Smartphone',
                // 'description' => 'Latest smartphone with 128GB storage.',
                'price' => 800.00,
                // 'stock' => 25,
                'total_cost' => 1200.00,
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Wireless Headphones',
                // 'description' => 'Noise-canceling wireless headphones.',
                'price' => 150.00,
                // 'stock' => 30,
                'total_cost' => 1200.00,
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

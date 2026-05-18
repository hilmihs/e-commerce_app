<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Everyday Sling Bag',
                'slug' => 'everyday-sling-bag',
                'description' => 'Tas selempang ringan dengan kompartemen rapi untuk kerja harian dan perjalanan singkat.',
                'price' => 249000,
                'stock' => 30,
                'weight_grams' => 700,
                'url' => 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'name' => 'Desk Organizer Set',
                'slug' => 'desk-organizer-set',
                'description' => 'Organizer meja minimalis untuk alat tulis, kabel, dan aksesori kecil.',
                'price' => 159000,
                'stock' => 42,
                'weight_grams' => 900,
                'url' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'name' => 'Travel Tumbler',
                'slug' => 'travel-tumbler',
                'description' => 'Tumbler stainless 600ml dengan insulasi panas dan dingin untuk aktivitas mobile.',
                'price' => 189000,
                'stock' => 55,
                'weight_grams' => 500,
                'url' => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
            ],
        ];

        foreach ($products as $item) {
            $product = Product::query()->updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'name' => $item['name'],
                    'description' => $item['description'],
                    'price' => $item['price'],
                    'stock' => $item['stock'],
                    'weight_grams' => $item['weight_grams'],
                    'is_active' => true,
                ]
            );

            $product->images()->updateOrCreate(
                ['sort_order' => 0],
                [
                    'path' => 'seed/'.$item['slug'].'.jpg',
                    'url' => $item['url'],
                    'alt_text' => $item['name'],
                ]
            );
        }
    }
}

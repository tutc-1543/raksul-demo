<?php

use Illuminate\Database\Seeder;

class CardImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('card_images')->delete();
        $cardImages = [
            [
                'id' => '1',
                'card_id' => '1',
                'name' => 'ILLUST1',
                'image' => '/images/ILLUST1.jpg',
                'width' => '83.022',
                'height' => '66.04',
                'x' => '8.75',
                'y' => '5.75',
                'order' => '0',
            ],
            [
                'id' => '2',
                'card_id' => '1',
                'name' => 'TITLE1',
                'image' => '/images/TITLE1.jpg',
                'width' => '79.901',
                'height' => '5.806',
                'x' => '10.25',
                'y' => '72.95',
                'order' => '0',
            ],
            [
                'id' => '3',
                'card_id' => '1',
                'name' => 'TEXT1',
                'image' => '/images/TEXT1.png',
                'width' => '77.004333',
                'height' => '13.483167',
                'x' => '11.50',
                'y' => '84.99',
                'order' => '0',
            ],
            [
                'id' => '4',
                'card_id' => '1',
                'name' => 'ADDRESS1',
                'image' => '/images/ADDRESS1.png',
                'width' => '83.999917',
                'height' => '3.249083',
                'x' => '7.99',
                'y' => '120.74',
                'order' => '0',
            ],
            [
                'id' => '5',
                'card_id' => '1',
                'name' => 'FAMILY_NAME1',
                'image' => '/images/FAMILY_NAME1.png',
                'width' => '20.182417',
                'height' => '5.259917',
                'x' => '24.80',
                'y' => '126.50',
                'order' => '0',
            ],
            [
                'id' => '6',
                'card_id' => '1',
                'name' => 'FIRST_NAME1',
                'image' => '/images/FIRST_NAME1.png',
                'width' => '20.182417',
                'height' => '5.259917',
                'x' => '55.06',
                'y' => '126.50',
                'order' => '0',
            ],
            [
                'id' => '7',
                'card_id' => '1',
                'name' => 'FIRST_NAME2',
                'image' => '/images/FIRST_NAME2.png',
                'width' => '20.182417',
                'height' => '5.259917',
                'x' => '55.06',
                'y' => '132.74',
                'order' => '0',
            ]
        ];
        foreach ($cardImages as $cardImage) {
            DB::table('card_images')->insert([
                'id' => $cardImage['id'],
                'card_id' => $cardImage['card_id'],
                'name' => $cardImage['name'],
                'image' => $cardImage['image'],
                'width' => $cardImage['width'],
                'height' => $cardImage['height'],
                'x' => $cardImage['x'],
                'y' => $cardImage['y'],
                'order' => $cardImage['order'],
            ]);
        }
    }
}

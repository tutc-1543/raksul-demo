<?php

use Illuminate\Database\Seeder;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cards')->delete();
        DB::table('cards')->insert([
            'id' => '1',
            'name' => 'card-1',
            'width' => '100',
            'height' => '148'
        ]);
    }
}

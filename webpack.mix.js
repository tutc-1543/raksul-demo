const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .ts('resources/ts/index.ts', 'public/js/tab.js')
   .ts('resources/ts/card/index.ts', 'public/js/card.js')
   .ts('resources/ts/card/card-interact.ts', 'public/js/card-interact.js')
   .less('resources/less/app.less', 'public/css/card.css');

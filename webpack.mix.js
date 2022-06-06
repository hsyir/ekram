const mix = require('laravel-mix');
const path  = require("path");

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

mix.alias({
    '@v': path.join(__dirname, 'resources/js/vue')
});

mix.webpackConfig({
    plugins: [
        new VuetifyLoaderPlugin()
    ],
});


mix.js('resources/js/app.js', 'public/js').vue()
    .sass('resources/sass/app.scss', 'public/css')

    .options({
        processCssUrls: false,
    })
    .sourceMaps();

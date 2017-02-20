const { mix } = require('laravel-mix');

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

mix.js(
  ['public/app/auth/AuthController.js',
  'public/app/auth/AuthFactory.js',
	'public/app/authorization/AuthorizeFactory.js',
	'public/app/authorization/AuthorizeController.js',
  'public/app/draft/DraftController.js',
  'public/app/draft/DraftFactory.js',
  'public/app/home/HomeController.js',
  'public/app/index/IndexController.js',
  'public/app/index/MenuItems.js',
  'public/app/player/PlayerController.js',
  'public/app/player/PlayerFactory.js',
  'public/app/position/PositionFactory.js',
  'public/app/sport/SportController.js',
  'public/app/sport/SportFactory.js',
  'public/app/team/TeamFactory.js',
  'public/app/team/TeamController.js',
  'public/app/user/RoleFactory.js',
  'public/app/user/UserController.js',
  'public/app/user/UserFactory.js',
  'public/js/directives/MenuLink.js',
  'public/js/directives/MenuToggle.js'

], 'public/js/components.js')

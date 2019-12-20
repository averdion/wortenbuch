const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        polyfill: '@babel/polyfill',
        main: helpers.root('src', 'main'),
    },
	resolve: {
	  extensions: [ '.js', '.vue' ],
	  alias: {
	    'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
	    '@': helpers.root('src')
	  }
	},
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
	output: {
	  path: helpers.root('dist'),
	  publicPath: '/',
	  filename: 'js/[name].bundle.js',
	  chunkFilename: 'js/[id].chunk.js'
	}
}
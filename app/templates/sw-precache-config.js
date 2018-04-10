module.exports = {
  staticFileGlobs: [
    'node_modules/webcomponentsjs/webcomponents-loader.js',
    'manifest.json',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/node_modules\/@webcomponents\/webcomponentsjs\/.*.js/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache',
        },
      },
    },
  ],
};


const resolve = require('../utils/resolve')
const HTMLPlugin = require('html-webpack-plugin')
const copyPlugins = require('copy-webpack-plugin')

const plugins = [
  new copyPlugins(
    ['sounds', 'images', 'sprites', 'spines'].map(assetsType =>
      ({
        from: `static/${ assetsType }`,
        to: `static/${ assetsType }/`,
      })
    ),
    {
      copyUnmodified: true,
    }
  ),
  new HTMLPlugin({
    template: resolve('index.html'),
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  }),
]

module.exports = plugins

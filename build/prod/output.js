const resolve = require('../utils/resolve');
const deployConfig = require('../../deploy.config')

const output = {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkHash].js',
    path: resolve('output'),
    publicPath: deployConfig.cdn.publicPath
}


module.exports = output
const merge = require('webpack-merge')
const commonConfig = require('./common');
const devConfig = require('./dev')
const prodConfig = require('./prod')

const isDev = require('./utils/isDev')

let config = {}

if(isDev) {
    config = merge(commonConfig, devConfig)
}else {
    config = merge(commonConfig, prodConfig)
}

module.exports = config

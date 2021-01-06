
const entry = require('./entry');
const output = require('./output');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./devServer');
const devtool = require('./devTool')


const devConfig = {
    entry,
    output,
    module: {
        rules,
    },
    plugins,
    devServer,
    devtool
}

module.exports = devConfig
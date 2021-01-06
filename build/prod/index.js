
const entry = require('./entry');
const output = require('./output');
const rules = require('./rules');
const plugins = require('./plugins');
const devtool = require('./devTool');
const optimization = require('./optimization');
const externals = require('./externals')

const devConfig = {
    entry,
    output,
    module: {
        rules,
    },
    plugins,
    optimization,
    externals,
    devtool
}

module.exports = devConfig
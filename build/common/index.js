
const mode = require('./mode');
const target = require('./target')
const resolve = require('./resolve');
const plugins = require('./plugins');
const rules = require('./rules')

module.exports = {
    mode,
    target,
    resolve,
    module: {
        rules,
    },
    plugins
}
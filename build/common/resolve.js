const path = require('path')

const resolve = {
    extensions: ['.js', '.ts', '.jsx', '.json'],
    alias: {
        "@root": path.resolve(__dirname, '../../'),
    }
}

module.exports = resolve
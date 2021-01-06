const path = require('path');

const resolve = (dir) => {
    let base = '../../';

    if (/^build$/.test(__dirname)) {
        base = '..'
    }

    return path.join(__dirname, base, dir)
}

module.exports = resolve
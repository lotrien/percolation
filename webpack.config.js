const merge = require('webpack-merge');

const commonConfig = require('./common.webpack.config');
const devConfig = require('./dev.webpack.config');
const prodConfig = require('./prod.webpack.config');

module.exports = mode => {
    if (mode === 'production') {
        return merge.smart(commonConfig, prodConfig, { mode });
    }

    return merge.smart(commonConfig, devConfig, { mode })
};

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        sourceMap: true,
    },
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets'));
    },
};

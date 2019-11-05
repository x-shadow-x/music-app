const path = require('path');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SHOULD_OPTIMIZING = false;
const CDN = {
    js: [
        'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    ],
};

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
        port: 8881, // 端口号
        host: '0.0.0.0',
    },
    configureWebpack: (config) => {
        const _config = config;
        if (IS_PRODUCTION && SHOULD_OPTIMIZING) {
            _config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
                axios: 'axios',
                swiper: 'Swiper',
            };
        } else {
            _config.externals = {
                swiper: 'Swiper',
            };
        }
    },
    chainWebpack: (config) => {
        if (IS_PRODUCTION && SHOULD_OPTIMIZING) {
            config.plugin('html')
                .tap((args) => {
                    const _args = args;
                    _args[0].cdn = CDN;
                    return _args;
                });
        }
        config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets'));
    },
};

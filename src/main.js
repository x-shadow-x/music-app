import Vue from 'vue';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './assets/stylus/index.styl';
import './registerServiceWorker';

const loadingImg = require('assets/images/common/logo.png');

Vue.config.productionTip = false;

fastclick.attach(document.body);
Vue.use(VueLazyload, {
    preload: 1.3, // 预加载的宽高
    loading: loadingImg,
    error: '', // img加载失败时现实的图片的路径
    attempt: 3, // 尝试加载的次数
    listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'], // 你想让vue监听的事件
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

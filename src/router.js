import Vue from 'vue';
import Router from 'vue-router';

const Rank = () => import(/* webpackChunkName: "rank" */ '@/views/rank/rank.vue');
const Reocmmend = () => import(/* webpackChunkName: "reocmmend" */ '@/views/recommend/recommend.vue');
const Search = () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue');
const Singer = () => import(/* webpackChunkName: "singer" */ '@/views/singer/singer.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/rank',
        component: Rank,
    }, {
        path: '/reocmmend',
        component: Reocmmend,
    }, {
        path: '/search',
        component: Search,
    }, {
        path: '/singer',
        component: Singer,
    }],
});

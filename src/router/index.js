import Vue from 'vue';
import PageRouter from './page-router';

const Rank = () => import(/* webpackChunkName: "rank" */ '@/views/rank/rank.vue');
const Recommend = () => import(/* webpackChunkName: "recommend" */ '@/views/recommend/recommend.vue');
const Search = () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue');
const Singer = () => import(/* webpackChunkName: "singer" */ '@/views/singer/singer.vue');

Vue.use(PageRouter);

const router = new PageRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/recommend',
    }, {
        path: '/rank',
        component: Rank,
    }, {
        path: '/recommend',
        component: Recommend,
    }, {
        path: '/search',
        component: Search,
    }, {
        path: '/singer',
        component: Singer,
    }],
});

router.beforeEach((to, from, next) => {
    next();
});

router.onError((res) => {
    console.log(res);
});

export default router;

export const PM = router.pm;

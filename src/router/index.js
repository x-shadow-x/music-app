import Vue from 'vue';
import PageRouter from './page-router';

const Rank = () => import(/* webpackChunkName: "rank" */ '@/views/rank/rank.vue');
const RankDetail = () => import(/* webpackChunkName: "rankDetail" */ '@/views/rank/rank-detail/rank-detail.vue');
const Recommend = () => import(/* webpackChunkName: "recommend" */ '@/views/recommend/recommend.vue');
const Diss = () => import(/* webpackChunkName: "diss" */ '@/views/recommend/diss/diss.vue');
const Search = () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue');
const Singer = () => import(/* webpackChunkName: "singers" */ '@/views/singer/singer.vue');
const SingerDetail = () => import(/* webpackChunkName: "singer" */ '@/views/singer/singer-detail/singer-detail.vue');

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
        children: [
            {
                path: ':id',
                component: RankDetail,
                meta: {
                    animate: {
                        enter: 'slide_enter',
                        leave: 'slide_leave',
                    },
                },
            },
        ],
    }, {
        path: '/recommend',
        component: Recommend,
        children: [
            {
                path: ':id',
                component: Diss,
                meta: {
                    animate: {
                        enter: 'slide_enter',
                        leave: 'slide_leave',
                    },
                },
            },
        ],
    }, {
        path: '/search',
        component: Search,
    }, {
        path: '/singer',
        component: Singer,
        children: [
            {
                path: ':id',
                component: SingerDetail,
                meta: {
                    animate: {
                        enter: 'slide_enter',
                        leave: 'slide_leave',
                    },
                },
            },
        ],
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

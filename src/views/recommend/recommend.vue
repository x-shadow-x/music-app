<template>
    <div class="main">
        <div class="banner_module" v-if="slider.length > 0">
            <swiper>
                <div v-for="item in slider" :key="item.id" class="swiper-slide">
                    <a :href="item.linkUrl" class="slider_link">
                        <img :src="item.picUrl" alt="轮播图片" class="slider_img">
                    </a>
                </div>
                <div slot="pagination" class="swiper-pagination"></div>
            </swiper>
        </div>
        <h2 class="title">热门歌单推荐</h2>
    </div>
</template>

<script>
import { SUCC } from '@/api/config';
import { getRecommend, getDiscList } from '@/api/recommend';
import Swiper from '@/base/swiper/swiper.vue';

export default {
    data() {
        return {
            slider: [],
        };
    },

    created() {
        this._getRecommend();
        this._getDiscList();
    },

    methods: {
        async _getRecommend() {
            try {
                const res = await getRecommend();
                if (res.code === SUCC) {
                    this.slider = res.data.slider;
                }
            } catch (err) {
                console.error(err);
            }
        },

        async _getDiscList() {
            try {
                const res = await getDiscList();
                if (res.code === SUCC) {
                    this.slider = res.data.slider;
                }
            } catch (err) {
                console.error(err);
            }
        },
    },

    components: {
        Swiper,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
.slider_link
    display block
    height 300px
.slider_img
    width 100%
    height 100%
.title
    line-height 100px
    text-align center
    color $color-theme
    font-size $font-size-medium
</style>

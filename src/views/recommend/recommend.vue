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
        <ul>
            <li v-for="item in discList" :key="item.dissid" class="disc_item">
                <img :src="item.imgurl" :alt="item.dissname" class="disc_img">
                <div class="disc_text">
                    <h2 class="discname" v-html="item.creator.name">{{item.dissname}}</h2>
                    <p class="desc" v-html="item.dissname"></p>
                </div>
            </li>
        </ul>
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
            discList: [],
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
                    this.discList = res.data.list;
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
.disc_item
    display flex
    align-items center
    padding 20px 40px
.disc_img
    width 140px
    height 140px
    margin-right 40px
    flex none
.disc_text
    flex 1
    font-size $font-size-medium
    line-height 1.6
.desc
    margin-top 20px
    font-size $font-size-small
    color $color-text-d
</style>

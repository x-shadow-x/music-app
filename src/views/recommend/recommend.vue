<template>
    <div>
        <div class="main">
            <scroll :data="dissList" ref="scroll">
                <div>
                    <div class="banner_module" v-if="slider.length > 0">
                        <swiper>
                            <div v-for="item in slider" :key="item.id" class="swiper-slide">
                                <a :href="item.linkUrl" class="slider_link">
                                    <img
                                        :src="item.picUrl"
                                        @load="loadImage"
                                        alt="轮播图片"
                                        class="slider_img">
                                </a>
                            </div>
                            <div slot="pagination" class="swiper-pagination"></div>
                        </swiper>
                    </div>
                    <h2 class="title" v-if="slider.length > 0">热门歌单推荐</h2>
                    <ul>
                        <li v-for="item in dissList" :key="item.dissid" class="diss_item" @click="selectDiss(item)">
                            <img class="diss_img" v-lazy="item.imgurl" :alt="item.dissname">
                            <div class="diss_text">
                                <h2 class="dissname" v-html="item.creator.name">{{item.dissname}}</h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </scroll>
        </div>
        <transition
            :enter-class="transitionClass.enter"
            :enter-active-class="transitionClass.enterActive"
            :enter-to-class="transitionClass.enterTo"
            :leave-class="transitionClass.leave"
            :leave-active-class="transitionClass.leaveActive"
            :leave-to-class="transitionClass.leaveTo">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { SUCC } from '@/api/config';
import { getRecommend, getDissList } from '@/api/recommend';
import Swiper from '@/base/swiper/swiper.vue';
import Scroll from '@/base/scroll/scroll.vue';
import scrollMixin from '@/mixin/scroll-mixin';
import { mapMutations } from 'vuex';

export default {
    mixins: [
        scrollMixin,
    ],
    data() {
        return {
            slider: [],
            dissList: [],
        };
    },
    computed: {
        transitionClass() {
            return {
                enter: this.pm.enterClass,
                enterActive: `${this.pm.enterClass}-active`,
                enterTo: `${this.pm.enterClass}-to`,
                leave: this.pm.leaveClass,
                leaveActive: `${this.pm.leaveClass}-active`,
                leaveTo: `${this.pm.leaveClass}-to`,
            };
        },
    },

    created() {
        this._getRecommend();
        this._getDissList();
    },

    methods: {
        loadImage() {
            if (!this.hasLoad) {
                this.hasLoad = true;
                this.$refs.scroll.refresh();
            }
        },

        selectDiss(diss) {
            this.setDiss(diss);
            this.$router.push(`/recommend/${diss.dissid}`);
        },

        _adjustScroll(playList) {
            if (playList.length > 0 && this.$refs.scroll) {
                this.$refs.scroll.$el.style.height = 'calc(100% - 70px)';
                this.$refs.scroll.refresh();
            }
        },

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

        async _getDissList() {
            try {
                const res = await getDissList();
                if (res.code === SUCC) {
                    this.dissList = res.data.list;
                }
            } catch (err) {
                console.error(err);
            }
        },

        ...mapMutations({
            setDiss: 'SET_DISS',
        }),
    },

    components: {
        Swiper,
        Scroll,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"

.banner_module
    height 300px
.slider_link
    display block
    height 100%
.slider_img
    width 100%
    height 100%
.title
    line-height 100px
    text-align center
    color $color-theme
    font-size $font-size-medium
.diss_item
    display flex
    align-items center
    padding 20px 40px
.diss_img
    width 140px
    height 140px
    margin-right 40px
    flex none
.diss_text
    flex 1
    line-height 1.6
.desc
    margin-top 20px
    font-size $font-size-small
    color $color-text-d
</style>

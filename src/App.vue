<template>
    <div id="app">
        <m-header />
        <tab />
        <transition
            :enter-class="transitionClass.enter"
            :enter-active-class="transitionClass.enterActive"
            :enter-to-class="transitionClass.enterTo"
            :leave-class="transitionClass.leave"
            :leave-active-class="transitionClass.leaveActive"
            :leave-to-class="transitionClass.leaveTo">
            <keep-alive>
                <router-view class="transition_view"></router-view>
            </keep-alive>
        </transition>
        <x-player ref="xPlay" />
        <toast ref="toast" />
    </div>
</template>
<script>
import Vue from 'vue';
import { PM } from '@/router/index';
import Tab from '@/components/tab/tab.vue';
import MHeader from '@/components/m-header/m-header.vue';
import XPlayer from '@/components/x-player/x-player.vue';
import Toast from '@/base/toast/toast.vue';

export default {
    computed: {
        transitionClass() {
            return {
                enter: PM.enterClass,
                enterActive: `${PM.enterClass}-active`,
                enterTo: `${PM.enterClass}-to`,
                leave: PM.leaveClass,
                leaveActive: `${PM.leaveClass}-active`,
                leaveTo: `${PM.leaveClass}-to`,
            };
        },
    },
    mounted() {
        Vue.prototype.toast = this.$refs.toast; // 将吐司组件挂载到全局
        Vue.prototype.xPlay = this.$refs.xPlay; // 将吐司组件挂载到全局
    },
    components: {
        Tab,
        MHeader,
        XPlayer,
        Toast,
    },
};
</script>

<style lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/animate.styl"
// .main
//     position fixed
//     width 100%
//     top 172px
//     bottom 0
//     background $color-background
//     overflow hidden
.main
    position relative
    width 100%
    height calc(100vh - 172px)
    background $color-background
    overflow hidden
</style>

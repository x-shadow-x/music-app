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
    </div>
</template>
<script>
import MHeader from '@/components/m-header/m-header.vue';
import Tab from '@/components/tab/tab.vue';
import { PM } from '@/router/index';

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
    components: {
        MHeader,
        Tab,
    },
};
</script>

<style lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/animate.styl"
.main
    position fixed
    width 100%
    top 172px
    bottom 0
</style>

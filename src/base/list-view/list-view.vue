<template>
    <scroll
        class="list_view"
        :data="data"
        ref="listView"
        :should-listen-scroll="shouldListenScroll"
        @scroll="onScroll">
        <ul class="group">
            <li class="group_item" v-for="group in data" :key="group.groupId" ref="listGroups">
                <h2 class="group_tag">{{group.title}}</h2>
                <ul class="sub_list">
                    <li class="sub_item" v-for="item in group.singerlist" :key="item.singer_id">
                        <img v-lazy="item.singer_pic" :alt="item.singer_name" class="singer_pic">
                        <p class="singer_name">{{item.singer_name}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="shortcut_list">
            <li
                class="shortcut_item"
                v-for="(item, index) in shortcutList"
                :key="item.id"
                :data-index="index"
                @touchstart="onShortcutTouchStart"
                @touchmove.stop.prevent="onShortcutTouchMove">
                {{item.name}}
            </li>
        </ul>
    </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue';
import { getData } from 'assets/js/dom';

const ANCHO_HEIGHT = 18;
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            shouldListenScroll: true,
            scrollY: -1,
            currentIndex: 0,
        };
    },
    computed: {
        shortcutList() {
            return this.data.map(group => ({
                id: group.groupId,
                name: group.title.charAt(0),
            }));
        },
    },
    created() {
        this.touch = {};
    },
    methods: {
        onScroll(pos) {
            this.scrollY = pos.y;
        },
        onShortcutTouchStart(e) {
            const anchoIndex = getData(e.target, 'index');
            this.touch.startTouchY = e.touches[0].pageY;
            this.touch.anchoIndex = anchoIndex;
            this._scrollTo(anchoIndex);
        },
        onShortcutTouchMove(e) {
            this.touch.moveTouchY = e.touches[0].pageY;
            const distance = this.touch.moveTouchY - this.touch.startTouchY;
            const delta = parseFloat(distance / ANCHO_HEIGHT);
            const anchoIndex = parseInt(this.touch.anchoIndex, 10) + delta;
            this._scrollTo(anchoIndex);
        },
        _scrollTo(index) {
            this.$refs.listView.scrollToElement(this.$refs.listGroups[index], 320);
        },
    },
    components: {
        Scroll,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
.group_tag
    font-size $font-size-medium
    background $color-highlight-background
    line-height 80px
    padding-left 20px

.sub_item
    display flex
    align-items center
    padding 20px 0 20px 40px

.singer_pic
    width 90px
    height 90px
    border-radius 100%

.singer_name
    margin-left 20px
    color $color-text-d
    font-size $font-size-medium

.shortcut_list
    position fixed
    right 10px
    top 58%
    transform translateY(-50%)
    display flex
    flex-direction column
    align-items center
    font-size $font-size-small-s
    background $color-highlight-background
    color $color-text-l
    border-radius 22px
    padding 12px 0

.shortcut_item
    padding 3PX 4PX
</style>

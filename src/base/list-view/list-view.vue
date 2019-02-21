<template>
    <scroll
        class="list_view"
        :data="data"
        ref="listView"
        :probe-type="probeType"
        :should-listen-scroll="shouldListenScroll"
        @scroll="onScroll">
        <ul class="group">
            <li class="group_item" v-for="group in data" :key="group.groupId" ref="listGroups">
                <h2 class="group_tag">{{group.title}}</h2>
                <ul class="sub_list">
                    <li
                        class="sub_item"
                        v-for="item in group.singerlist"
                        :key="item.singer_id"
                        @click="selectItem(item)">
                        <img v-lazy="item.singer_pic" :alt="item.singer_name" class="singer_pic">
                        <p class="singer_name">{{item.singer_name}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="shortcut_list">
            <li
                class="shortcut_item"
                :class="{'active': currentIndex === index}"
                v-for="(item, index) in shortcutList"
                :key="item.id"
                :data-index="index"
                @touchstart="onShortcutTouchStart"
                @touchmove.stop.prevent="onShortcutTouchMove">
                {{item.name}}
            </li>
        </ul>
        <div class="fixed_title" ref="fixedTitle">
            <h2 class="group_tag" v-show="currentTitle">{{currentTitle}}</h2>
        </div>
    </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue';
import { getData } from 'assets/js/dom';
import scrollMixin from '@/mixin/scroll-mixin';

const ANCHO_HEIGHT = 18; // 右侧快速入口栏每一项的高度

export default {
    mixins: [
        scrollMixin,
    ],
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
            probeType: 3,
            diff: 0,
        };
    },
    computed: {
        shortcutList() {
            return this.data.map(group => ({
                id: group.groupId,
                name: group.title.charAt(0),
            }));
        },
        currentTitle() {
            if (this.scrollY > 0) {
                return '';
            }
            const currentGroup = this.data[this.currentIndex];
            return (currentGroup && this.data[this.currentIndex].title) || '';
        },
    },
    created() {
        this.touch = {};
        this.listHeight = [];
        this.$nextTick(() => {
            this.fixedTitleHeight = this.$refs.fixedTitle.clientHeight;
        });
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
            const delta = Math.floor(distance / ANCHO_HEIGHT);
            const anchoIndex = parseInt(this.touch.anchoIndex, 10) + delta;
            this._scrollTo(anchoIndex);
        },

        selectItem(item) {
            this.$emit('select', item);
        },
        _scrollTo(anchoIndex) {
            let index = anchoIndex;
            if (anchoIndex < 0) {
                index = 0;
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2;
            }
            this.scrollY = -this.listHeight[index];
            this.$refs.listView.scrollToElement(this.$refs.listGroups[index], 320);
        },
        _calculateHeight() {
            this.listHeight = [];
            const list = this.$refs.listGroups;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0, len = list.length; i < len; i++) {
                height += list[i].clientHeight;
                this.listHeight.push(height);
            }
        },
        _adjustScroll(playList) {
            if (playList.length > 0 && this.$refs.listView) {
                this.$refs.listView.$el.style.height = 'calc(100% - 70px)';
                this.$refs.listView.refresh();
            } else {
                this.$refs.listView.$el.style.height = '100%';
                this.$refs.listView.refresh();
            }
        },
    },

    watch: {
        data() {
            this.$nextTick(() => {
                this._calculateHeight();
            });
        },

        scrollY(nv) {
            const scrollY = -nv;
            const listHeight = this.listHeight;
            if (nv > 0) {
                this.currentIndex = 0;
                return;
            }
            for (let i = 0, len = listHeight.length - 1; i < len; i++) {
                const lowHeight = listHeight[i];
                const upHeight = listHeight[i + 1];
                if (scrollY >= lowHeight && scrollY < upHeight) {
                    this.diff = upHeight - scrollY;
                    this.currentIndex = i;
                    return;
                }
            }
            this.currentIndex = listHeight.length - 2;
        },

        diff(nv) {
            let topY = 0;
            if (nv < this.fixedTitleHeight) {
                topY = nv - this.fixedTitleHeight;
            }
            this.$refs.fixedTitle.style.transform = `translate3d(0, ${topY}px, 0)`;
        },
    },
    components: {
        Scroll,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.group_tag
    font-size $font-size-medium
    background $color-highlight-ld
    line-height 80px
    padding-left 20px

.sub_item
    display flex
    align-items center
    padding 20px 60px 20px 40px

.singer_pic
    width 90px
    height 90px
    border-radius 100%
    background url('~assets/images/common/logo.png')
    background-size 100% 100%

.singer_name
    flex-basis 0
    flex-grow 1
    margin-left 20px
    color $color-text-l
    no-wrap()

.shortcut_list
    position fixed
    right 10px
    top 182px
    bottom 10px
    display flex
    flex-direction column
    align-items center
    font-size $font-size-small
    background $color-background-d
    color $color-text-ll
    border-radius 22px
    padding 12px 0
    z-index 2

.shortcut_item
    padding 0 4PX
    flex 1

.shortcut_item.active {
    color $color-theme
}

.fixed_title
    position absolute
    top 0
    left 0
    width 100%
    height 80px
</style>

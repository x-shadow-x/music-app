<template>
    <hover class="hover" :class="{'hide': !showModule}" @touchHover="handleTouchHover">
        <transition
            enter-active-class="animated slideInUp"
            leave-active-class="animated slideOutDown">
            <div class="playing_list_panel" v-if="showModule">
                <div class="content_box" @click.stop="emptyFn">
                    <div class="top_bar">
                        <div class="play_mode">
                            <i class="fa fa-list mode_icon" :class="modeIcon" @click="toggleMode"></i>
                            随机播放
                        </div>
                        <i class="fa fa-trash-o clear_all" @click="clear"></i>
                    </div>
                    <div class="playing_list_box">
                        <scroll :data="playList" ref="scroll">
                            <ul class="playing_list">
                                <li
                                    ref="playingItem"
                                    class="playing_item"
                                    :class="{active: currentIndex == index}"
                                    v-for="(item, index) in playList"
                                    :key="item.songid"
                                    @click.stop="selectSong(index)">
                                    <div class=" ">
                                        <i
                                            class="fa fa-play-circle-o playing_icon"
                                            v-show="currentIndex == index"></i>
                                        <i class="blank" v-show="currentIndex != index">空</i>
                                        {{item.songname}}
                                    </div>
                                    <div class="handle_module">
                                        <i class="fa fa-heart-o handle_icon" @click.stop="toggleFav(item)"></i>
                                        <i class="fa fa-close handle_icon" @click.stop="remove(index)"></i>
                                    </div>
                                </li>
                            </ul>
                        </scroll>
                    </div>
                </div>
            </div>
        </transition>
        <modal ref="modal" @confirm="confirm" tip="是否清空播放列表？" />
    </hover>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import modalMixin from '@/mixin/modal-mixin';
import PLAY_MODE from '@/store/config';
import Hover from '@/base/hover/hover.vue';
import Scroll from '@/base/scroll/scroll.vue';

const ICON_MAP = {
    [PLAY_MODE.SEQUENCE]: 'fa-list',
    [PLAY_MODE.RANDOM]: 'fa-random',
    [PLAY_MODE.LOOP]: 'fa-retweet',
};
const ICON_MAP_LEN = Object.keys(ICON_MAP).length;

export default {
    name: 'playingList',
    mixins: [
        modalMixin,
    ],
    data() {
        return {
            showModule: false,
        };
    },
    computed: {
        modeIcon() {
            return ICON_MAP[this.mode];
        },
        ...mapGetters([
            'mode',
            'playList',
            'currentIndex',
        ]),
    },
    methods: {
        show() {
            this.showModule = true;
        },
        hide() {
            this.showModule = false;
        },
        clear() {
            this.modal.show();
        },
        confirm() {
            const currentIndex = this.currentIndex;
            const list = [];
            this.updatePlayList({
                list,
                currentIndex,
                playing: false,
            });
            this.hide();
        },
        toggleMode() {
            this.setMode((this.mode + 1) % ICON_MAP_LEN);
        },
        selectSong(index) {
            this.setCurrentIndex(index);
        },
        toggleFav(song) {
            console.info(song);
        },
        remove(index) {
            const currentIndex = this.currentIndex;
            const playList = [...this.playList];
            playList.splice(index, 1);
            this.updatePlayList({
                list: playList,
                currentIndex,
            });
        },
        handleTouchHover() {
            this.hide();
        },
        emptyFn() {},
        ...mapMutations({
            setMode: 'SET_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayList: 'SET_PLAY_LIST',
        }),
        ...mapActions([
            'updatePlayList',
        ]),
    },
    watch: {
        currentIndex(nv) {
            const el = this.$refs.playingItem && this.$refs.playingItem[nv];
            if (el) {
                this.$refs.scroll.scrollToElement(el, 300, true, true);
            }
        },
    },
    components: {
        Scroll,
        Hover,
    },
};
</script>

<style lang='stylus' scoped>
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.hover
    opacity 1
    transition opacity .5s
.hide
    opacity 0
    left -100%
    transition left 0s .4s, opacity .5s
.playing_list_panel
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    display flex
    justify-content center
    align-items center
.content_box
    position absolute
    left 0
    right 0
    bottom 0
    padding 0 40px
    background $color-highlight-background
.top_bar
    display flex
    justify-content space-between
    align-items center
    height 100px
.play_mode
    display inline-flex
    font-size $font-size-medium-x
    align-items center
.mode_icon
    font-size $font-size-large
    margin-right 20px
    extend-click()
.clear_all
    font-size $font-size-large
    extend-click()
.playing_list_box
    height 40vh
    color $color-text-l
.playing_item
    display flex
    justify-content space-between
    align-items center
    height 80px
    &.active
        color $color-text
.blank,
.playing_icon
    margin-right 10px
.blank
    color transparent
.handle_module
    display inline-flex
    align-items center
.handle_icon
    extend-click()
    & + .handle_icon
        margin-left 40px
</style>

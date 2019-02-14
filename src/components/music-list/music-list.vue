<template>
    <div class="song_list_main">
        <header>
            <i class="fa fa-angle-left back" @click="back"></i>
            <h1 class="title">{{title}}</h1>
        </header>
        <div
            class="bg_area bg_box"
            ref="bgBox"
            :style="{ transform: 'scale(' + scale + ')' }">
            <div class="hover" :style="{backgroundImage: 'url(' + bgPic + ')'}"></div>
        </div>
        <div class="song_list_box">
            <div class="bg_area"></div>
            <div class="list_contain">
                <scroll
                    class="list"
                    ref="scroll"
                    :data="songs"
                    :probe-type="probeType"
                    :should-listen-scroll="shouldListenScroll"
                    @scroll="scroll">
                    <div>
                        <button class="play_btn" v-show="songs.length > 0" @click="play">
                            <i class="fa fa-play-circle-o play_icon"></i>
                            随机播放全部
                        </button>
                        <ul class="music_list">
                            <li
                                v-for="(item, index) in songs"
                                :key="item.songid"
                                @click="select(index)"
                                class="music_item">
                                <span class="order_num" v-if="showOrder">{{index > 2 ? index + 1 : ''}}</span>
                                <div class="music_info">
                                    <h2 class="song_name">{{item.songname}}</h2>
                                    <p class="song_dec">{{item.singer}}-{{item.albumname}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </scroll>
            </div>
        </div>
    </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue';
import scrollMixin from '@/mixin/scroll-mixin';
import { mapActions, mapGetters } from 'vuex';

export default {
    mixins: [
        scrollMixin,
    ],
    data() {
        return {
            probeType: 3,
            shouldListenScroll: true,
            scale: 1,
        };
    },
    props: {
        prevPath: {
            type: String,
            default: '/',
        },
        songs: {
            type: Array,
            default: () => [],
        },
        showOrder: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        bgPic: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapGetters([
            'isInit',
        ]),
    },
    components: {
        Scroll,
    },
    mounted() {
        this.bgHeight = this.$refs.bgBox.clientHeight;
    },

    methods: {
        scroll(pos) {
            let present = pos.y / this.bgHeight;
            present = present > 0 ? present : 0;
            this.scale = 1 + present;
        },

        back() {
            this.$router.replace(this.prevPath);
        },

        play() {
            console.info(this.isInit);
        },

        select(index) {
            this.updateSong({
                list: this.songs,
                currentIndex: index,
            });
        },

        _adjustScroll(playList) {
            if (playList.length > 0) {
                this.$refs.scroll.$el.style.height = 'calc(100% - 70px)';
                this.$refs.scroll.refresh();
            }
        },

        ...mapActions([
            'updateSong',
        ]),
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.song_list_main
    position fixed
    left 0
    top 0
    bottom 0
    right 0
    z-index 3
    background $color-background
header
    position fixed
    left 0
    right 0
    top 0
    display flex
    align-items center
    justify-content center
    height  80px
    z-index 2
    background-size 100% auto
    background-position top center
    background-repeat no-repeat
.back
    position absolute
    left 0
    top 0
    bottom 0
    z-index 2
    font-size $font-size-large-x
    padding 0 20px
    display flex
    align-items center
    justify-content center
.title
    position relative
    z-index 2
    font-size $font-size-medium-x
.hover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-repeat no-repeat
    background-size cover
    filter brightness(75%)
.play_btn
    border 1px solid $color-theme
    height 60px
    border-radius 60px
    color $color-theme
    position absolute
    left 50%
    top -100px
    transform translateX(-50%)
    padding 0 26px
.play_icon
    font-size $font-size-large
    margin-right 14px
.bg_area
    padding-top 74%
.bg_box
    position absolute
    top 0
    left 0
    width 100%
    z-index -1
    overflow hidden
    transform-origin top
    background-size cover
.song_list_box
    display flex
    flex-direction column
    position absolute
    left 0
    right 0
    top 80px
    bottom 0
    overflow hidden
    .bg_area
        padding-top calc(74% - 80px)
.list_contain
    position relative
    overflow visible
    height 1px
    flex-grow 1
.list
    overflow visible

.music_list
    background-color $color-background

.music_item
    display flex
    padding 20px 0

.music_info
    flex-grow 1

.order_num
    display flex
    flex none
    width 50px
    margin-left 40px
    align-items center
    justify-content center
    font-size $font-size-large
    color $color-theme
    background-size 50px
    background-position center
    background-repeat no-repeat

.music_item:nth-child(even)
    background-color $color-background-d

.music_item:nth-child(1)
    .order_num
        bg-image('first')

.music_item:nth-child(2)
    .order_num
        bg-image('second')

.music_item:nth-child(3)
    .order_num
        bg-image('third')

.music_info
    line-height 1.8
    margin-left 40px

.song_name
    font-size $font-size-medium

.song_dec
    color $color-text-d
    font-size $font-size-medium
</style>

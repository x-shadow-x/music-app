<template>
    <div class="player_panel" v-show="playList.length > 0" >
        <div class="bg" :style="{backgroundImage: 'url(' + currentSong.img + ')'}"></div>
        <div class="full_player" v-show="fullScreen">
            <header>
                <i class="fa fa-angle-down retract" @click="retract"></i>
                <h1 class="song_title">{{currentSong.songname}}</h1>
            </header>
            <h2 class="singer">{{currentSong.singer}}</h2>
            <div
                class="content_module"
                @touchstart.prevent="slideStart"
                @touchmove.prevent="slideMove"
                @touchend.prevent="slideEnd">
                <div class="dish_module" :style="opacityStyle">
                    <div class="dish_container">
                        <div class="dish_box" :class="{'pause': !playing}">
                            <img :src="currentSong.img" :alt="currentSong.songname" class="dish_img">
                        </div>
                    </div>
                </div>
                <div
                    class="lyric_list"
                    :style="slideStyle"
                    @touchstart="scrollTouchStart"
                    @touchend="scrollTouchEnd">
                    <scroll :data="lyric.lyrics" ref="scroll">
                        <ul>
                            <li class="balance_line"></li>
                            <li
                                v-for="(item, index) in lyric.lyrics"
                                :key="item.time"
                                :class="{active : currentLyricIndex == index}"
                                ref="lyricItem">{{item.lyric}}</li>
                            <li class="balance_line"></li>
                        </ul>
                    </scroll>
                </div>
            </div>
            <div class="control_module">
                <div class="progress_module">
                    <progress-bar :current-time="currentTime" :interval="interval" @updateCurTime="updateCurTime" />
                </div>
                <div class="btn_module">
                    <i class="fa fa-list" :class="modeIcon" @click="toggleMode"></i>
                    <i class="fa fa-backward" @click="prevSong"></i>
                    <i class="fa" :class="[playing ? 'fa-pause' : 'fa-play']" @click.stop="togglePlay"></i>
                    <i class="fa fa-forward" @click="nextSong"></i>
                    <i class="fa fa-heart-o"></i><!-- heart-o heart -->
                </div>
            </div>
        </div>
        <div class="min_player" v-show="!fullScreen" @click="spread">
            <img
                class="min_dish_img"
                 :class="{'pause': !playing}"
                :src="currentSong.img"
                :alt="currentSong.songname">
            <div class="song_info">
                <h2 class="min_song_title">{{currentSong.songname}}</h2>
                <h3 class="min_singer">{{currentSong.singer}}</h3>
            </div>
            <div class="min_progress_module">
                <progress-circle :current-time="currentTime" :interval="interval">
                    <div @click.stop="togglePlay" class="min_play_btn">
                        <i class="fa min_play" :class="[playing ? 'fa-pause' : 'fa-play']"></i>
                    </div>
                </progress-circle>
            </div>
            <i class="fa fa-music music_icon" @click.stop="showPlayingList"></i>
        </div>
        <audio
            ref="audio"
            :src="musicSrc"
            @canplay="handleCanPlay"
            @ended="handleEnded"
            @timeupdate="handleTimeUpdate"></audio>
        <playing-list ref="playingList" />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { SUCC } from '@/api/config';
import { getVkey, getLyric } from '@/api/song';
import { setItem, getItem } from '@/helper/storage';
import PLAY_MODE from '@/store/config';
import LyricParser from '@/helper/lyric-parser';
import Scroll from '@/base/scroll/scroll.vue';
import ProgressBar from '@/base/progress-bar/progress-bar.vue';
import ProgressCircle from '@/base/progress-circle/progress-circle.vue';
import PlayingList from '@/components/playing-list/playing-list.vue';

const ICON_MAP = {
    [PLAY_MODE.SEQUENCE]: 'fa-list',
    [PLAY_MODE.RANDOM]: 'fa-random',
    [PLAY_MODE.LOOP]: 'fa-retweet',
};
const FUNCTION_MAP = {
    [PLAY_MODE.LOOP]() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
    },
    [PLAY_MODE.SEQUENCE]() {
        const index = (this.currentIndex + 1) % this.playList.length;
        this.setCurrentIndex(index);
    },
    [PLAY_MODE.RANDOM]() {
        let index = Math.floor(this.playList.length * Math.random());
        while (index === this.currentIndex) {
            index = Math.floor(this.playList.length * Math.random());
        }
        this.setCurrentIndex(index);
    },
};
const ICON_MAP_LEN = Object.keys(ICON_MAP).length;

export default {
    data() {
        return {
            musicSrc: '',
            canPlay: false,
            currentTime: 0,
            lyric: {
                lyrics: [],
            },
            currentLyricIndex: 0,
            slideStyle: {
                transform: 'translate3d(0, 0, 0)',
                transition: 'all 0 ease 0',
            }, // 左右滑动切换歌词与唱片页面的偏移样式
            opacityStyle: {
                opacity: 1,
            }, // 唱片透明度
        };
    },
    computed: {
        modeIcon() {
            return ICON_MAP[this.mode];
        },
        currentSong() {
            return (this.playList && this.playList[this.currentIndex]) || {};
        },
        interval() {
            return (this.currentSong && this.currentSong.interval) || 0;
        },
        ...mapGetters([
            'playList',
            'isInit',
            'currentIndex',
            'fullScreen',
            'playing',
            'mode',
        ]),
    },
    created() {
        this.preventAutoScroll = false; // 阻止歌词自动滚动
        this.slideStartX = 0; // 左右滑动切换歌词与唱片页面时touchStart的坐标点
        this.slideStartY = 0; // 左右滑动切换歌词与唱片页面时touchStart的坐标点
        this.slideDis = 0; // 左右滑动切换歌词与唱片页面时手指滑动的水平距离
        this.opacity = 1;
        this.windowWidth = window.innerWidth;
        this.playedList = getItem('SONG_HISTORY') || [];
    },
    mounted() {
        this.playingList = this.$refs.playingList;
    },
    methods: {
        retract() {
            this.setFullScreen(false);
        },
        spread() {
            this.setFullScreen(true);
        },
        toggleMode() {
            this.setMode((this.mode + 1) % ICON_MAP_LEN);
        },
        togglePlay() {
            if (!this.isInit) {
                this.$refs.audio.play();
                this.setIsInit(true);
            }
            this.setPlaying(!this.playing);
        },
        prevSong() {
            if (!this.canPlay) {
                return;
            }
            this.canPlay = false;
            const index = this.currentIndex > 0 ? this.currentIndex - 1 : this.playList.length - 1;
            this.setCurrentIndex(index);
            !this.playing && this.togglePlay();
        },
        nextSong() {
            if (!this.canPlay) {
                return;
            }
            this.canPlay = false;
            const index = (this.currentIndex + 1) % this.playList.length;
            this.setCurrentIndex(index);
            !this.playing && this.togglePlay();
        },
        handleCanPlay() {
            this.canPlay = true;
        },
        updateCurTime(payLoad) {
            this.$refs.audio.currentTime = payLoad;
        },
        handleTimeUpdate(e) {
            this.currentTime = e.target.currentTime;
            this.lyric.currentTime = this.currentTime;
        },
        handleEnded() {
            FUNCTION_MAP[this.mode].call(this);
        },
        slideStart(e) {
            this.slideStartX = e.changedTouches[0].pageX;
            this.slideStartY = e.changedTouches[0].pageY;
        },
        slideMove(e) {
            const offsetX = e.changedTouches[0].pageX - this.slideStartX;
            const offsetY = e.changedTouches[0].pageY - this.slideStartY;
            if (Math.abs(offsetY) < 10) {
                this.slideStyle = {
                    transform: `translate3d(${this.slideDis + offsetX}PX, 0, 0)`,
                };
                this.opacityStyle = {
                    opacity: this.opacity + (offsetX / this.windowWidth),
                };
            }
        },
        slideEnd(e) {
            const offsetX = e.changedTouches[0].pageX - this.slideStartX;
            if (offsetX > 80) {
                this.slideDis = 0;
            } else if (offsetX < -60) {
                this.slideDis = -this.windowWidth;
            }
            this.slideStyle = {
                transform: `translate3d(${this.slideDis}PX, 0, 0)`,
                transition: 'transform .32s',
            };
            this.opacity = 1 + this.slideDis / this.windowWidth;
            this.opacityStyle = {
                opacity: this.opacity,
                transition: 'opacity .32s',
            };
        },
        scrollTouchStart() {
            this.preventAutoScroll = true;
        },
        scrollTouchEnd() {
            this.preventAutoScroll = false;
        },
        showPlayingList() {
            this.playingList.show();
        },
        async _getMusicSrc(songmid) {
            if (songmid) {
                const res = await getVkey(songmid);
                const data = (res.req_0 && res.req_0.data) || {};
                const purl = (data.midurlinfo[0] && data.midurlinfo[0].purl) || '';
                if (!purl) {
                    this.toast.set({
                        icon: 'ERR',
                        tip: '拿不到qq的音乐，换一首试试',
                    }).show();
                    return;
                }
                this.musicSrc = `http://dl.stream.qqmusic.qq.com/${purl}`;
            }
        },
        async _getLyric(songmid) {
            if (songmid) {
                try {
                    const res = await getLyric(new Date().getTime, songmid);
                    if (res.code === SUCC) {
                        this.lyric = new LyricParser(res.lyric, (currentTime) => {
                            const lyrics = this.lyric.lyrics;
                            for (let i = 0, len = lyrics.length; i < len; i++) {
                                if (currentTime < lyrics[i].time) {
                                    this.currentLyricIndex = i - 1;
                                    break;
                                }
                            }
                            const el = this.$refs.lyricItem[this.currentLyricIndex];
                            if (!this.preventAutoScroll) {
                                this.$refs.scroll.scrollToElement(el, 300, true, true);
                            }
                        }).lyric;
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        },
        _savePlayingSong(song) {
            let index = -1;
            for (let i = 0, len = this.playedList.length; i < len; i++) {
                const item = this.playedList[i];
                if (item.songid === song.songid) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                this.playedList.splice(index, 1);
            }
            this.playedList.unshift(song);
            setItem('SONG_HISTORY', JSON.stringify(this.playedList));
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlaying: 'SET_PLAYING',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setIsInit: 'SET_IS_INIT',
            setMode: 'SET_MODE',
        }),
    },
    watch: {
        currentSong(nv, ov) {
            if (nv && nv.songmid) {
                if (this.playing && this.isInit) {
                    this._savePlayingSong(nv);
                }
                if (!ov || nv.songmid !== ov.songmid) {
                    const songmid = nv.songmid;
                    this._getMusicSrc(songmid);
                    this._getLyric(songmid);
                }
            }
        },
        musicSrc(nv) {
            if (nv) {
                this.$nextTick(() => {
                    if (this.isInit) {
                        this.$refs.audio.play();
                    }
                });
            }
        },
        playing(nv) {
            if (nv && this.musicSrc && this.isInit) {
                this._savePlayingSong(this.currentSong);
                this.$refs.audio.play();
            } else if (!nv && this.musicSrc && this.isInit) {
                this.$refs.audio.pause();
            }
        },
    },
    components: {
        Scroll,
        ProgressBar,
        PlayingList,
        ProgressCircle,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.player_panel
    position fixed
    left 0
    right 0
    bottom 0
    z-index 10
    background $color-background
    overflow hidden
.full_player
    height 100vh
header
    position relative
    display flex
    align-items center
    justify-content center
    height  80px
    z-index 2
    background-size 100% auto
    background-position top center
    background-repeat no-repeat
.retract
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
.song_title
    position relative
    z-index 2
    font-size $font-size-large
.singer
    text-align center
    margin 10px auto 60px auto
.bg
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow hidden
    opacity .8
    z-index -1
    background-size cover
    background-position center
    background-repeat no-repeat
    margin -40px
    filter blur(40px)
.content_module
    display flex
    flex-wrap nowrap
    overflow hidden
.dish_module
    width 100%
    flex none
.dish_container
    position relative
    width 80%
    padding-top 80%
    margin 0 auto
    overflow hidden
.dish_box
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    overflow hidden
    border-radius 100%
    box-sizing border-box
    border 20px solid $color-dialog-background
    animation rotateAnimate 8s linear infinite
    &.pause
        animation-play-state paused
.dish_img
    width 100%
    height 100%
.lyric_list
    flex none
    position relative
    width 100%
    height 60vh
    text-align center
    line-height 3
    mask-image linear-gradient(to bottom,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, .2) 15%,
        rgba(255, 255, 255, .4) 25%,
        rgba(255, 255, 255, .8) 35%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, .8) 65%,
        rgba(255, 255, 255, .4) 75%,
        rgba(255, 255, 255, .2) 85%,
        rgba(255, 255, 255, 0) 100%)
    .active
        color $color-theme
.balance_line
    height 24vh
.control_module
    position absolute
    left 50%
    bottom 80px
    width 80%
    transform translateX(-50%)
.progress_module
    margin-bottom 40px
.btn_module
    display flex
    justify-content space-between
    align-content center
    font-size 20PX
    .fa
        extend-click()
.min_player
    display flex
    align-items center
    background $color-highlight-background
    padding 10px 40px
.min_dish_img
    width 80px
    border-radius 100%
    animation rotateAnimate 8s linear infinite
    &.pause
        animation-play-state paused
.song_info
    flex-grow 1
    padding 0 20px
    line-height 1.6
.min_singer
    font-size $font-size-small
    color $color-text-l
.min_progress_module
    width 80px
    height 80px
    margin-right 40px
.min_play_btn
    position absolute
    left 0
    top 0
    width 100%
    height 100%
.min_play
    position absolute
    top 50%
    transform-origin center
    transform translate(-50%, -50%) scale(.5)
    font-size 32PX
    &.fa-play
        left 52%
    &.fa-pause
        left 50%
.music_icon
    font-size 40px
@keyframes rotateAnimate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>

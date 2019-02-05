<template>
    <div class="player_panel" v-show="playList.length > 0" >
        <div
            class="bg"
            :style="{backgroundImage: 'url(' + currentSong.img + ')'}"></div>
        <div class="full_player" v-show="fullScreen">
            <header>
                <i class="fa fa-angle-down retract" @click="retract"></i>
                <h1 class="song_title">{{currentSong.songname}}</h1>
            </header>
            <h2 class="singer">{{currentSong.singer}}</h2>
            <div class="content_module">
                <div class="dish_container">
                    <div class="dish_box" :class="{'pause': !playing}">
                        <img :src="currentSong.img" :alt="currentSong.songname" class="dish_img">
                    </div>
                </div>
            </div>
            <div class="control_module">
                <i class="fa fa-list"></i><!-- random list retweet -->
                <i class="fa fa-backward" @click="prevSong"></i>
                <i
                    class="fa"
                    :class="[playing ? 'fa-pause' : 'fa-play']"
                    @click.stop="togglePlay"></i>
                <i class="fa fa-forward" @click="nextSong"></i>
                <i class="fa fa-heart-o"></i><!-- heart-o heart -->
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
            <div class="progress">
                <i
                    class="fa"
                    :class="[playing ? 'fa-pause' : 'fa-play']"
                    @click.stop="togglePlay"></i>
            </div>
            <i class="fa fa-music music_icon"></i>
        </div>
        <audio ref="audio" :src="musicSrc" @canplay="handleCanPlay"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getVkey } from '@/api/singer';

export default {
    data() {
        return {
            musicSrc: '',
            canPlay: false,
        };
    },
    computed: {
        currentSong() {
            return (this.playList && this.playList[this.currentIndex]) || {};
        },
        ...mapGetters([
            'playList',
            'currentIndex',
            'fullScreen',
            'playing',
        ]),
    },
    methods: {
        retract() {
            this.setFullScreen(false);
        },
        spread() {
            this.setFullScreen(true);
        },
        togglePlay() {
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
        async _getMusicSrc(songmid) {
            if (songmid) {
                const res = await getVkey(songmid);
                const data = (res.req_0 && res.req_0.data) || {};
                const purl = (data.midurlinfo[0] && data.midurlinfo[0].purl) || '';
                this.musicSrc = `http://dl.stream.qqmusic.qq.com/${purl}`;
            }
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlaying: 'SET_PLAYING',
            setCurrentIndex: 'SET_CURRENT_INDEX',
        }),
    },
    watch: {
        currentSong(nv) {
            if (nv && nv.songmid) {
                const songmid = nv.songmid;
                this._getMusicSrc(songmid);
            }
        },
        musicSrc(nv) {
            if (nv) {
                this.$nextTick(() => {
                    this.$refs.audio.play();
                });
            }
        },
        playing(nv) {
            if (nv && this.musicSrc) {
                this.$refs.audio.play();
            } else if (!nv && this.musicSrc) {
                this.$refs.audio.pause();
            }
        },
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"

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
    font-size $font-size-medium
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
.control_module
    position absolute
    left 50%
    bottom 80px
    width 80%
    transform translateX(-50%)
    display flex
    justify-content space-around
    align-content center
    font-size 20PX
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
.min_song_title
    font-size $font-size-medium
.min_singer
    font-size $font-size-small
    color $color-text-l
.progress
    display inline-flex
    justify-content center
    align-items center
    width 60px
    height 60px
    border 2PX solid $color-text-l
    border-radius 100%
    margin-right 40px
.music_icon
    font-size 40px
@keyframes rotateAnimate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>

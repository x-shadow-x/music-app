<template>
    <div class="music_list">
        <header>
            <i class="fa fa-angle-left back"></i>
            <h1 class="title">{{title}}</h1>
        </header>
        <div class="bg_box">
            <img :src="singerPic" :alt="title" class="bg">
            <div class="hover"></div>
            <button class="play_btn">
                <i class="fa fa-play-circle-o play_icon"></i>
                随机播放全部
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: () => [],
        },
        title: {
            type: String,
            default: '',
        },
        singerPic: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
header
    position relative
.back
    position absolute
    left 10px
    top 50%
    transform translateY(-50%)
.title
    position absolute
    left 50%
    top 10px
    transform translateX(-50%)
    font-size $font-size-medium-x
.bg_box
    position relative
    width 100%
    padding-top 74%
    z-index -1
    overflow hidden
.bg
    position absolute
    left 0
    top 0
    width 100%
.hover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background $color-background-d
.play_btn
    border 1px solid $color-theme
    height 60px
    border-radius 60px
    color $color-theme
    position absolute
    bottom 20px
    left 50%
    transform translateX(-50%)
    padding 0 26px
.play_icon
    font-size $font-size-large
    margin-right 14px
</style>

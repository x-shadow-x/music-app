<template>
    <div class="progress_bar" ref="progressBar">
        <span class="play_time">{{playTime}}</span>
        <div
            ref="progressBox"
            class="progress_box"
            @touchstart.stop.prevent="touchStart"
            @touchmove.stop.prevent="touchMove"
            @touchend.stop.prevent="touchEnd">
            <span class="progress" :style="{ width: progressPct }">
                <i class="fa fa-circle progress_dot"></i>
            </span>
        </div>
        <span class="total_time">{{totalTime}}</span>
    </div>
</template>
<script>
export default {
    name: 'ProgressBar',
    data() {
        return {
            subCurrentTime: 0,
        };
    },
    props: {
        currentTime: {
            type: Number,
            default: 0,
        },
        interval: {
            type: Number,
            default: 0,
        },
    },
    created() {
        this.canParentControl = true; // 进度条是否可以由外部currentTime影响
        this.touch = {};
    },
    mounted() {
        this.touch.leftX = this.$refs.progressBox.getBoundingClientRect().left;
    },
    computed: {
        playTime() {
            return this._formatTime(this.subCurrentTime);
        },
        progressPct() {
            return `${(this.subCurrentTime / this.interval) * 100}%`;
        },
        totalTime() {
            return this._formatTime(this.interval);
        },
    },
    watch: {
        currentTime(nv) {
            if (this.canParentControl) {
                this.subCurrentTime = nv || 0;
            }
        },
    },

    methods: {
        touchStart(e) {
            this.canParentControl = false;
            this.touch.barWidth = this.touch.barWidth || this.$refs.progressBox.clientWidth;
            this.touch.leftX = this.touch.leftX || this.$refs.progressBox.getBoundingClientRect().left;
            const dis = Math.max(0, e.touches[0].pageX - this.touch.leftX);
            this.subCurrentTime = Math.floor(this.interval * (dis / this.touch.barWidth));
        },
        touchMove(e) {
            const dis = Math.max(0, e.touches[0].pageX - this.touch.leftX);
            const _currentTime = Math.floor(this.interval * (dis / this.touch.barWidth));
            this.subCurrentTime = Math.min(this.interval, _currentTime);
        },
        touchEnd() {
            this.canParentControl = true;
            this.$emit('updateCurTime', this.subCurrentTime);
        },
        _formatTime(time) {
            const _time = time || 0;
            const minute = Math.floor(_time / 60);
            const second = Math.floor(_time % 60);
            return second < 10 ? `${minute}:0${second}` : `${minute}:${second}`;
        },
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.progress_bar
    display flex
    justify-content space-between
    align-items center
    color $color-text
.progress_box
    position relative
    flex-grow 1
    margin 0 40px
    background $color-background-d
    height 6px
    border-radius 6px
    &:before
        content ''
        position absolute
        left 0
        right 0
        top -30px
        bottom -30px
.progress
    position absolute
    left 0
    top 0
    height 100%
    border-radius 6px
    background $color-light-background
.progress_dot
    position absolute
    right -10px
    top 50%
    transform translateY(-50%)
    font-size 11PX
</style>

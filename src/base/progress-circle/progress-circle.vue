<template>
    <div class="progress_circle" ref="progressCircle">
        <svg :width="radius" :height="radius" viewBox="0 0 100 100">
            <circle class="circle_in" r="46" cx="50" cy="50" fill="transparent"></circle>
            <circle
                class="progress"
                r="46" cx="50" cy="50" fill="transparent"
                :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffSet"></circle>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ProgressCircle',
    data() {
        return {
            dashArray: Math.PI * 100,
        };
    },
    props: {
        radius: {
            type: Number,
            default: 32,
        },
        currentTime: {
            type: Number,
            default: 0,
        },
        interval: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        dashOffSet() {
            return Math.floor(this.dashArray * (1 - this.currentTime / this.interval));
        },
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"

.progress_circle
    position relative
    width 100%
    height 100%
svg
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
circle
    stroke-width: 4pt
    transform-origin: center
.circle_in
    stroke: $color-lowlight-background
.progress
    transform rotate(270deg)
    stroke: $color-light-background
</style>

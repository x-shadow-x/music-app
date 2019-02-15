<template>
    <div class="hover_main" @click="touchHover">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'hover',
    methods: {
        touchHover() {
            this.$emit('touchHover');
        },
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.hover_main
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background $color-background-dd
    z-index 100
</style>

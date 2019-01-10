<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';

export default {
    name: 'swiper',
    props: {
        loop: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
        interval: {
            type: Number,
            default: 14000,
        },
    },
    mounted() {
        this.$nextTick(() => {
            this._initSwiper();
        });
    },

    methods: {
        _initSwiper() {
            const mySwiper = new Swiper('.swiper-container', {
                autoplay: this.autoplay,
                loop: this.loop,
                interval: this.interval,
            });
            return mySwiper;
        },
    },
};
</script>

<style scoped lang="stylus">
@import '~swiper/dist/css/swiper.min.css'
.swiper
    overflow-x auto
.swiper_content
    white-space nowrap

.swiper_item
    display inline-block
</style>

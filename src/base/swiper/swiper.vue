<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <slot name="pagination"></slot>
        <slot name="navigation"></slot>
    </div>
</template>

<script>
const Swiper = require('swiper');

export default {
    name: 'swiper',
    props: {
        loop: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Object,
            default: () => ({
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            }),
        },
    },
    mounted() {
        this.$nextTick(() => {
            this._initSwiper();
        });
    },

    methods: {
        _initSwiper() {
            const pagination = this.$slots.pagination;
            const navigation = this.$slots.navigation;
            const swiperOption = {
                autoplay: this.autoplay,
                loop: this.loop,
                interval: this.interval,
            };

            if (pagination) {
                Object.assign(swiperOption, {
                    pagination: {
                        el: `.${pagination[0].data.staticClass.replace(/\s/g, '.')}`,
                    },
                });
            }

            if (navigation && navigation.length === 2) {
                Object.assign(swiperOption, {
                    navigation: {
                        nextEl: `.${navigation[0].data.staticClass.replace(/\s/g, '.')}`,
                        prevEl: `.${navigation[1].data.staticClass.replace(/\s/g, '.')}`,
                    },
                });
            }

            const mySwiper = new Swiper('.swiper-container', swiperOption);
            return mySwiper;
        },
    },
};
</script>

<style scoped lang="stylus">
@import 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/css/swiper.min.css'
</style>

<style lang="stylus">
@import "~assets/stylus/variable.styl"

.swiper-pagination-bullet
    width 8PX
    height 8PX

.swiper-container-horizontal
    >.swiper-pagination-bullets
        .swiper-pagination-bullet
            margin 0 10px
.swiper-pagination-bullet-active
    background $color-theme
</style>

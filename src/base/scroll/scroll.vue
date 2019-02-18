<template>
    <div ref="wrapper" class="wrapper">
        <slot></slot>
        <div class="loading_box" v-show="isLoading && !data.length">
            <loading />
        </div>
        <div class="empty_status" v-show="!isLoading && !data.length && !Object.keys(data).length">
            <slot name="empty">
                <i class="fa fa-frown-o"></i>列表为空
            </slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import Loading from '@/base/loading/loading.vue';

export default {
    name: 'scroll',
    props: {
        isLoading: {
            type: Boolean,
            default: true,
        },
        probeType: {
            type: Number,
            default: 1,
        },
        click: {
            type: Boolean,
            default: true,
        },
        shouldListenScroll: {
            type: Boolean,
            default: false,
        },
        pullup: {
            type: Boolean,
            default: false,
        },
        data: {
            type: [Array, Object],
            default: () => [],
        },
    },

    mounted() {
        this.$nextTick(() => {
            this._initScroll();
        });
    },

    components: {
        Loading,
    },

    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
            });

            if (this.shouldListenScroll) {
                const _self = this;
                this.scroll.on('scroll', (pos) => {
                    _self.$emit('scroll', pos);
                });
            }

            if (this.pullup) {
                const _self = this;
                this.scroll.on('scrollEnd', () => {
                    _self.$emit('scrollEnd');
                });
            }
        },

        enable() {
            this.scroll && this.scroll.enable();
        },

        disable() {
            this.scroll && this.scroll.disable();
        },

        refresh() {
            this.scroll && this.scroll.refresh();
        },

        scrollTo(...args) {
            this.scroll && this.scroll.scrollTo(...args);
        },

        scrollToElement(...args) {
            this.scroll && this.scroll.scrollToElement(...args);
        },
    },

    watch: {
        data() {
            this.$nextTick(() => {
                this.refresh();
            });
        },
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"

.wrapper
    height 100%
    overflow hidden
.loading_box,
.empty_status
    display flex
    width 100%
    height 100%
    align-items center
    justify-content center
.empty_status
    color $color-text-d
    .fa
        margin-right 10px
        font-size $font-size-large-x
        vertical-align middle
</style>

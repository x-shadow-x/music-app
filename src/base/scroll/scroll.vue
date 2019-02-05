<template>
    <div ref="wrapper" class="wrapper">
        <slot></slot>
        <div class="loading_box" v-show="!data.length">
            <loading />
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import Loading from '@/base/loading/loading.vue';

export default {
    props: {
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
        data: {
            type: Array,
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
.wrapper
    height 100%
    overflow hidden
.loading_box
    display flex
    justify-content center
    width 100%
    height 100%
    align-items center
</style>

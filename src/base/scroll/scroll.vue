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
            defualt: true,
        },
        data: {
            type: Array,
            defualt: null,
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
</style>

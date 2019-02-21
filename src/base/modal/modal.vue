<template>
    <hover :class="{'hide': !showModule}">
        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceOut">
            <div class="modal_panel" v-if="showModule">
                <div class="content_box">
                    <h2 class="title">{{title}}</h2>
                    <p class="tip">{{tip}}</p>
                    <div class="button_module">
                        <button
                            class="btn cancel_btn"
                            v-if="showCancel"
                            @click.stop="cancel">{{cancelText}}</button>
                        <button
                            class="btn confirm_btn"
                            v-if="showConfirm"
                            @click.stop="confirm">{{confirmText}}</button>
                    </div>
                </div>
            </div>
        </transition>
    </hover>
</template>

<script>
import Hover from '@/base/hover/hover.vue';

export default {
    name: 'modal',
    data() {
        return {
            showModule: false,
        };
    },
    props: {
        title: {
            type: String,
            default: '提示',
        },
        tip: {
            type: String,
            default: '',
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        confirmText: {
            type: String,
            default: '确定',
        },
        showCancel: {
            type: Boolean,
            default: true,
        },
        showConfirm: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        show() {
            this.showModule = true;
        },
        hide() {
            this.showModule = false;
        },
        cancel() {
            this.hide();
            this.$emit('cancel');
        },
        confirm() {
            this.hide();
            this.$emit('confirm');
        },
    },
    components: {
        Hover,
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"

.hide
    left -100%
    transition all 0s 1.2s
.modal_panel
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    display flex
    justify-content center
    align-items center
.content_box
    width 80%
    border-radius 20px
    padding-top 30px
    color $color-text-lll
    background $color-highlight-ld
    text-align center
    font-size $font-size-medium
.tip
    padding 30px
    line-height 1.4
.button_module
    display flex
    height 90px
    border-top 1px solid $color-background-d
.btn
    flex 1
    position relative
    & + .btn:before
        content ''
        position absolute
        left 0
        top -1px
        bottom 0
        width 1px
        background $color-background-d
.cancel_btn
    color $color-text-l
.confirm_btn
    color $color-text-lll
</style>

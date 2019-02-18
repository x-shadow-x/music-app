<template>
    <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div class="toast_main" v-if="showToast" @click.stop="emptyFn">
            <div class="toast">
                <img :src="src" class="tip_icon" v-if="src">
                <p class="tip">{{tip}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
const SUCCESS_ICON = require('@/assets/images/common/success_icon.png');
const ERR_ICON = require('@/assets/images/common/err_icon.png');

export default {
    name: 'Toast',
    data() {
        return {
            tip: '',
            icon: '',
            showToast: false,
            duration: 2000,
        };
    },
    computed: {
        src() {
            if (this.icon === 'SUCCESS') {
                return SUCCESS_ICON;
            }
            if (this.icon === 'ERR') {
                return ERR_ICON;
            }
            return this.icon;
        },
    },
    methods: {
        emptyFn() {},
        show() {
            this.showToast = true;
            setTimeout(() => {
                this.hide();
            }, this.duration);
        },
        hide() {
            this.showToast = false;
        },
        set(options) {
            this.tip = options.tip || this.tip;
            this.icon = options.icon || this.icon;
            this.duration = options.duration || this.duration;
            return this;
        },
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"

.toast_main
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    z-index 1000
.toast
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    text-align center
    background $color-background-dd
    border-radius 10px
    padding 20px
.tip_icon
    width 64px
    margin-bottom 20px
</style>

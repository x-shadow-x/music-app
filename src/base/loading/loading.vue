<template>
    <div class="loading">
        <img src="./loading.gif" alt="loading" class="loading_icon">
        <p class="desc">{{title}}</p>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: 'loading...',
        },
    },
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl'

.loading
    text-align: center
.loading_icon
    width 40px
.desc
    line-height 2.4
    font-size $font-size-small
    color $color-text-l
</style>

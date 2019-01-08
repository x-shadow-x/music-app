<template>
    <header class="header_bar">
        <i class="logo_icon"></i>
        <h1 class="app_title">Xx music</h1>
    </header>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'
.header_bar
    display flex
    height 90px
    justify-content center
    align-items center
    color $color-theme

.logo_icon
    width 50px
    height 50px
    bg-image('logo')
    background-size 100% 100%

.app_title
    margin-left 10px
</style>

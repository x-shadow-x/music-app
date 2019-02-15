<template>
    <nav class="tab_nav">
        <router-link
            v-for="item in tabList"
            :key="item.to"
            :to="item.to"
            class="tab_item">
            <span class="tab_text">{{item.text}}</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            tabList: [{
                to: '/recommend',
                text: '推荐',
            }, {
                to: '/singer',
                text: '歌手',
            }, {
                to: '/rank',
                text: '排行',
            }, {
                to: '/search',
                text: '搜索',
            }],
        };
    },
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable.styl';

.tab_nav
    display flex
    justify-content space-between
    height 80px

.tab_item
    flex 1
    display inline-flex
    justify-content center
    align-items center
    position relative
    text-align center
    &.router-link-active
        color: $color-theme
    &:before
        content ''
        position absolute
        width 0
        height 2px
        background $color-theme
        left 50%
        transform translateX(-50%)
        bottom 0
        transition width .2s linear
    &.router-link-active:before
        width 100%
</style>

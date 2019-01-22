<template>
    <scroll class="list_view" :data="data">
        <ul class="group">
            <li class="group_item" v-for="group in data" :key="group.groupId">
                <ul class="sub_list">
                    <li class="sub_item" v-for="item in group.singerlist" :key="item.singer_id">
                        <img v-lazy="item.singer_pic" :alt="item.singer_name" class="singer_pic">
                        <p class="singer_name">{{item.singer_name}}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue';

export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        Scroll,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"

.sub_item
    display flex
    align-items center
    padding 20px 0 20px 40px

.singer_pic
    width 90px
    height 90px
    border-radius 100%

.singer_name
    margin-left 20px
    color $color-text-d
    font-size $font-size-medium
</style>

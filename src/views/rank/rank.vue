<template>
    <div>
        <div class="main">
            <scroll :data="topList" ref="scroll">
                <ul class="rank_list">
                    <li class="rank_item" v-for="item in topList" :key="item.id" @click="selectRank(item)">
                        <img :src="item.picUrl" alt="item.topTitle" class="rank_pic">
                        <ol class="song_list">
                            <li class="song_item" v-for="(song, songIndex) in item.songList" :key="song.songname">
                                {{songIndex + 1}}、{{song.songname}}-{{song.singername}}
                            </li>
                        </ol>
                    </li>
                </ul>
            </scroll>
        </div>
        <transition
            :enter-class="transitionClass.enter"
            :enter-active-class="transitionClass.enterActive"
            :enter-to-class="transitionClass.enterTo"
            :leave-class="transitionClass.leave"
            :leave-active-class="transitionClass.leaveActive"
            :leave-to-class="transitionClass.leaveTo">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { SUCC } from '@/api/config';
import { getRank } from '@/api/rank';
import { mapMutations } from 'vuex';
import Scroll from '@/base/scroll/scroll.vue';

export default {
    data() {
        return {
            topList: [],
        };
    },

    computed: {
        transitionClass() {
            return {
                enter: this.pm.enterClass,
                enterActive: `${this.pm.enterClass}-active`,
                enterTo: `${this.pm.enterClass}-to`,
                leave: this.pm.leaveClass,
                leaveActive: `${this.pm.leaveClass}-active`,
                leaveTo: `${this.pm.leaveClass}-to`,
            };
        },
    },

    created() {
        this._getRank();
    },

    methods: {
        selectRank(rank) {
            this.setRank(rank);
            this.$router.push(`/rank/${rank.id}`);
        },

        async _getRank() {
            const res = await getRank();
            if (res.code === SUCC) {
                this.topList = res.data.topList || [];
            }
        },

        ...mapMutations({
            setRank: 'SET_RANK',
        }),
    },

    components: {
        Scroll,
    },
};
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.rank_list
    padding 30px
.rank_item
    display flex
    & + .rank_item
        margin-top 30px
.rank_pic
    flex none
    width 180px
    height 180px
.song_list
    flex-direction column
    width 80px
    flex-basis 80px
    flex-grow 1
    display flex
    align-items center
    padding 20px
    font-size $font-size-small
    background $color-highlight-background
.song_item
    width 100%
    color $color-text-d
    line-height 2
    no-wrap()
</style>

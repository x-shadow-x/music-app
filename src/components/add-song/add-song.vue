<template>
    <div class="add_panel" @click.stop="emptyFn">
        <div class="top_bar">
            添加歌曲列表
            <i class="fa fa-close close_icon" @click="hidePanel"></i>
        </div>
        <div class="main_module">
            <search-box @selectItem="selectItem" :out-key-word="outKeyWord"></search-box>
            <div class="list_module">
                <ul class="tab">
                    <li
                        class="tab_item"
                        :class="{ active: currentIndex == item.id }"
                        v-for="item in tabList" :key="item.id"
                        @click="toggleTab(item.id)">
                        {{item.text}}
                    </li>
                </ul>
                <transition
                    mode="out-in"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
                    <div v-if="currentIndex == 1" class="list_panel" key="1">
                        <scroll :data="playList">
                            <ul>
                                <li
                                    v-for="item in playList"
                                    :key="item.songid"
                                    class="history_song"
                                    @click="selectSong(item)">
                                    <p class="song_name">{{item.songname}}</p>
                                    <p class="singer_info">{{item.singer}}·{{item.albumname}}</p>
                                </li>
                            </ul>
                        </scroll>
                    </div>
                    <div v-if="currentIndex == 2" class="list_panel" key="2">
                        <scroll :data="historyList" :is-loading="isLoading">
                            <ul>
                                <li
                                    class="search_history_item"
                                    v-for="(item, index) in historyList"
                                    :key="item"
                                    @click="selectKey(item)">
                                    {{item}}<i class="fa fa-close remove_icon" @click.stop="remove(index)"></i>
                                </li>
                            </ul>
                            <template slot="empty">
                                <div class="empty_module">
                                    <i class="fa fa-hand-spock-o empty_icon"></i>暂无搜索历史
                                </div>
                            </template>
                        </scroll>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { setItem, getItem } from '@/helper/storage';
import Scroll from '@/base/scroll/scroll.vue';
import SearchBox from '@/base/search-box/search-box.vue';

export default {
    name: 'addSong',
    data() {
        return {
            tabList: [{
                id: 1,
                text: '最近播放',
            }, {
                id: 2,
                text: '搜索历史',
            }],
            outKeyWord: '',
            historyList: [],
            currentIndex: 1,
            isLoading: true,
        };
    },
    computed: {
        ...mapGetters([
            'playList',
        ]),
    },
    mounted() {
        this._getHistoryList();
    },
    methods: {
        emptyFn() {},
        toggleTab(id) {
            this.currentIndex = id;
        },
        selectItem(keyWord) {
            console.info(keyWord);
            // this.historyList = Array.from(new Set([...this.historyList, keyWord]));
        },
        selectSong(song) {
            console.info(song);
        },
        hidePanel() {
            this.$emit('songPanelHide');
        },
        remove(index) {
            const res = this.historyList;
            res.splice(index, 1);
            this.historyList = [...res];
        },
        _getHistoryList() {
            const historyListStr = getItem('HISTORY');
            if (historyListStr) {
                this.historyList = `${historyListStr}`.split(',');
            }
            this.isLoading = false;
        },
    },
    watch: {
        historyList(nv) {
            setItem('HISTORY', nv.join(','));
        },
    },
    components: {
        Scroll,
        SearchBox,
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.add_panel
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 101
    background $color-background
    display flex
    flex-direction column
.top_bar
    flex none
    position relative
    display flex
    height 80px
    align-items center
    justify-content center
.close_icon
    position absolute
    right 20px
    top 50%
    transform translateY(-50%)
    extend-click-absolute()
.main_module
    flex-basis 0
    flex-grow 1
    position relative
.list_module
    position absolute
    left 0
    right 0
    top 120px
    bottom 0
    display flex
    flex-direction column
.tab
    display flex
    justify-content space-around
    width 80%
    margin 30px auto
    border: 1px solid $color-highlight-background
    border-radius 10px
    height 60px
    overflow hidden
.tab_item
    flex 1
    display inline-flex
    justify-content center
    align-items center
    color $color-text-l
    &.active
        color $color-text
        background $color-highlight-background
.list_panel
    flex-basis 0
    flex-grow 1
    overflow hidden
    padding 0 40px
.history_song
    & + .history_song
        margin-top 40px
.song_name,
.singer_info
    no-wrap()
.singer_info
    margin-top 20px
    color $color-text-l
    font-size $font-size-small
.search_history_item
    display flex
    justify-content space-between
    align-items center
    padding-right 10px
    color $color-text-d
    height 80px
.remove_icon
    extend-click()
.empty_module
    margin-top -30%
</style>

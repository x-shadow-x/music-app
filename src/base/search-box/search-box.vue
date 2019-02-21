<template>
    <div class="search_panel" :class="{ full: keyWord }">
        <div class="search_bar">
            <i class="fa fa-search search_icon"></i>
            <input type="text" class="search_input" placeholder="搜索歌曲" v-model="keyWord">
            <i class="fa fa-times-circle clear_icon" v-if="keyWord" @click="clear"></i>
        </div>
        <div class="search_result" v-if="keyWord">
            <scroll ref="scroll" :data="searchList" :pullup="pullup" @scrollEnd="loadMore" :is-loading="isLoading">
                <ul class="search_list">
                    <li
                        class="search_item"
                        v-for="item in searchList"
                        :key="item.songid"
                        @click="selectItem(item)">
                        <i class="fa fa-music item_icon"></i>
                        <p class="song_info">
                            {{item.songname}}-{{item.singer}}
                        </p>
                    </li>
                    <li class="search_item loading" v-if="hasMore">
                        <i class="fa fa-spinner fa-pulse"></i>
                    </li>
                </ul>
                <template slot="empty">
                    <div class="empty_module">
                        <i class="fa fa-frown-o"></i>你输得啥玩意~臣妾搜不到
                    </div>
                </template>
            </scroll>
        </div>
    </div>
</template>

<script>
import { SUCC } from '@/api/config';
import { search } from '@/api/search';
import Scroll from '@/base/scroll/scroll.vue';
import createSong from '@/type/song';
import scrollMixin from '@/mixin/scroll-mixin';

export default {
    name: 'searchBox',
    mixins: [
        scrollMixin,
    ],
    data() {
        return {
            pullup: true,
            keyWord: '',
            searchList: [],
            hasMore: true,
            isLoading: true,
        };
    },
    props: {
        outKeyWord: {
            type: String,
            default: '',
        },
    },
    created() {
        this.pageIndex = 1;
    },
    methods: {
        clear() {
            this.keyWord = '';
        },
        selectItem(item) {
            this.$emit('selectItem', item, this.keyWord);
        },
        async loadMore() {
            if (!this.hasMore) {
                return;
            }
            this._search(this.keyWord);
        },
        _reset() {
            this.hasMore = true;
            this.pageIndex = 1;
            this.searchList = [];
        },
        async _search(keyWord) {
            try {
                this.isLoading = true;
                const res = await search(keyWord, this.pageIndex);
                if (res.code === SUCC) {
                    const list = this._normalizeSongs((res.data && res.data.song && res.data.song.list) || []);
                    this.searchList = [...this.searchList, ...list];
                    this.pageIndex += 1;
                    this.hasMore = this.searchList.length < res.data.song.totalnum;
                }
                this.isLoading = false;
            } catch (err) {
                console.error(err);
            }
        },
        _adjustScroll(playList) {
            if (playList.length > 0 && this.$refs.scroll) {
                this.$refs.scroll.$el.style.height = 'calc(100% - 70px)';
                this.$refs.scroll.refresh();
            } else {
                this.$refs.scroll.$el.style.height = '100%';
                this.$refs.scroll.refresh();
            }
        },
        _normalizeSongs(list) {
            const ret = [];
            list.forEach((item) => {
                ret.push(createSong(item));
            });
            return ret;
        },
    },
    watch: {
        keyWord(nv) {
            this._reset();
            if (nv) {
                this._search(nv);
            }
        },
        outKeyWord(nv) {
            if (nv) {
                this.keyWord = nv;
            }
        },
    },
    components: {
        Scroll,
    },
};
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.search_panel
    position absolute
    left 0
    right 0
    top 0
    z-index 10
    background $color-background
    &.full
        bottom 0
.search_bar
    display flex
    align-items center
    height 80px
    border-radius 10px
    background $color-highlight-ld
    margin 20px 20px 0 20px
    padding 0 20px
.search_input
    height  80px
    border none
    outline none
    background none
    flex-grow 1
    color $color-text
    margin-left 20px
.search_icon,
.clear_icon
    font-weight lighter
    color $color-black
    extend-click()
.search_result
    position absolute
    left 0
    right 0
    top 120px
    bottom 0
.search_list
    padding 25px 0
.search_item
    display flex
    align-items center
    padding 25px 0
    &:nth-child(even)
        background $color-highlight-ld
.item_icon
    flex none
    margin 0 20px 0 40px
.song_info
    no-wrap()
    flex-grow 1
    padding-right 40px
.loading
    justify-content space-around
.empty_module
    margin-top -30%
</style>

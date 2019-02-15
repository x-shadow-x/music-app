<template>
    <div class="main">
        <search-box @selectItem="selectItem" :out-key-word="outKeyWord"></search-box>
        <div class="search_main">
            <scroll :data="historyList" ref="scroll">
                <div>
                    <div class="hot_module">
                        <div class="title_box">
                            <h2 class="module_title">热门搜索</h2>
                        </div>
                        <ul class="hot_key_list">
                            <li
                                class="hot_key"
                                v-for="item in hotkey"
                                :key="item.k"
                                @click="selectKey(item.k)">
                                {{item.k}}
                            </li>
                        </ul>
                    </div>
                    <div class="history_module">
                        <div class="title_box">
                            <h2 class="module_title">搜索历史</h2>
                            <i
                                class="fa fa-trash-o clear_all"
                                @click="clearHistory"
                                v-show="historyList.length > 0"></i>
                        </div>
                        <ul class="history_list">
                            <li
                                class="history_item"
                                v-for="(item, index) in historyList"
                                :key="item"
                                @click="selectKey(item)">
                                {{item}}<i class="fa fa-close" @click.stop="remove(index)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </scroll>
        </div>
        <modal ref="modal" @confirm="confirm" tip="是否清空历史搜索记录？" />
    </div>
</template>

<script>
import { SUCC } from '@/api/config';
import { getHotKey } from '@/api/search';
import modalMixin from '@/mixin/modal-mixin';
import scrollMixin from '@/mixin/scroll-mixin';
import { setItem, getItem } from '@/helper/storage';
import Scroll from '@/base/scroll/scroll.vue';
import SearchBox from '@/base/search-box/search-box.vue';

export default {
    mixins: [
        modalMixin,
        scrollMixin,
    ],
    data() {
        return {
            outKeyWord: '',
            hotkey: [],
            historyList: [],
        };
    },

    created() {
        this._getHotKey();
        this._getHistoryList();
    },

    methods: {
        selectItem(keyWord) {
            this.historyList = Array.from(new Set([...this.historyList, keyWord]));
        },
        selectKey(keyWord) {
            this.outKeyWord = keyWord;
        },
        remove(index) {
            const res = this.historyList;
            res.splice(index, 1);
            this.historyList = [...res];
        },

        clearHistory() {
            this.modal.show();
        },

        confirm() {
            this.historyList = [];
        },

        async _getHotKey() {
            try {
                const res = await getHotKey();
                if (res.code === SUCC) {
                    this.hotkey = (res.data && res.data.hotkey) || [];
                }
            } catch (err) {
                console.error(err);
            }
        },

        _adjustScroll(playList) {
            if (playList.length > 0) {
                this.$refs.scroll.$el.style.height = 'calc(100% - 70px)';
                this.$refs.scroll.refresh();
            }
        },

        _getHistoryList() {
            const historyListStr = getItem('HISTORY');
            if (historyListStr) {
                this.historyList = `${historyListStr}`.split(',');
            }
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

<style scoped lang="stylus">
@import "~assets/stylus/variable.styl"
@import "~assets/stylus/mixin.styl"

.search_main
    position absolute
    top 100px
    bottom 0
    padding 0 20px
.title_box
    display flex
    justify-content space-between
    padding 40px 10px 20px 0
    color $color-text-l
.clear_all
    extend-click()
.module_title
    font-size $font-size-medium
.hot_key_list
    display flex
    flex-wrap wrap
.hot_key
    display inline-block
    padding 10px 20px
    white-space nowrap
    background $color-highlight-background
    color $color-text-d
    border-radius 10px
    margin 20px 0
    margin-right 20px
    extend-click()
.history_item
    display flex
    justify-content space-between
    align-items center
    padding-right 10px
    color $color-text-d
    height 80px
.asd
    extend-click()
</style>

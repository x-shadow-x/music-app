<template>
    <div class="main">
        <list-view :data="singerlist"/>
    </div>
</template>

<script>
import { SUCC } from '@/api/config';
import { getSingers } from '@/api/singer';
import ListView from '@/base/list-view/list-view.vue';

export default {

    data() {
        return {
            singerlist: [],
        };
    },

    mounted() {
        this._loadData();
    },

    methods: {
        async _loadData() {
            const tags = await this._getTags();
            await this._getSingers(tags);
        },

        async _getTags(param) {
            try {
                const res = await getSingers(param);
                if (res.code === SUCC) {
                    const data = res.data || {};
                    return (data.tags && data.tags.index) || [];
                }

                return [];
            } catch (err) {
                console.error(err);
                return [];
            }
        },

        _getSingers(tags) {
            return tags.reduce((res, item) => (
                res.then((list) => {
                    if (list) {
                        this.singerlist = [...this.singerlist, list];
                    }
                    return this._getSingersFn(tags, {
                        index: item.id,
                    });
                })
            ), Promise.resolve()).then((list) => {
                if (list) {
                    this.singerlist = [...this.singerlist, list];
                }
            });
        },

        _getSingersFn(tags, param) {
            return getSingers(param).then((res) => {
                const data = res.data || {};
                const tag = tags.filter(item => item.id === data.index)[0];
                return {
                    title: tag.name,
                    groupId: tag.id,
                    singerlist: (data.singerlist || []).slice(0, 30),
                };
            });
        },
    },

    components: {
        ListView,
    },
};
</script>

<style scoped lang="stylus">
</style>

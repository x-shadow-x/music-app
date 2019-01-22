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

    created() {
        this._loadData();
    },

    methods: {
        async _loadData() {
            const tags = await this._getTags();
            await this._getSingers(tags);
            console.info(this.singerlist);
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
            const promiseList = tags.map(item => (
                this._getSingersFn(tags, {
                    index: item.id,
                })
            ));

            return Promise.all(promiseList).then((res) => {
                this.singerlist = [...res];
            });
        },

        _getSingersFn(tags, param) {
            return getSingers(param).then((res) => {
                if (res.code === SUCC) {
                    const data = res.data || {};
                    const tag = tags.filter(item => item.id === data.index)[0];
                    return {
                        title: tag.name,
                        groupId: tag.id,
                        singerlist: data.singerlist || [],
                    };
                }

                const tag = tags.filter(item => item.id === param.index)[0];
                return {
                    title: tag.name,
                    groupId: tag.id,
                    singerlist: [],
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

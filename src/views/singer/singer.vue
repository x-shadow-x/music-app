<template>
    <div class="main">
        <list-view :data="singerlist" @select="select" />
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
import { getSingers } from '@/api/singer';
import { mapMutations } from 'vuex';
import ListView from '@/base/list-view/list-view.vue';

export default {

    data() {
        return {
            singerlist: [],
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

    mounted() {
        this._loadData();
    },

    methods: {
        select(item) {
            this.setSinger(item);
            this.$router.push({
                path: `/singer/${item.singer_id}`,
            });
        },

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
                    singerlist: (data.singerlist || []).slice(0, 10),
                };
            });
        },

        ...mapMutations({
            setSinger: 'SET_SINGER',
        }),
    },

    components: {
        ListView,
    },
};
</script>

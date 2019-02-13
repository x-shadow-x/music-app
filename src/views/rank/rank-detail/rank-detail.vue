<template>
    <music-list
        ref="musicList"
        :songs="songs"
        :title="title"
        :bg-pic="bgPic"
        :showOrder="true"
        prev-path="/rank" />
</template>

<script>
import { SUCC } from '@/api/config';
import { getRankDetail } from '@/api/rank';
import MusicList from '@/components/music-list/music-list.vue';
import createSong from '@/type/song';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            songs: [],
            prevPath: '/rank',
        };
    },
    computed: {
        title() {
            return this.rank.topTitle;
        },
        bgPic() {
            return this.rank.picUrl;
        },
        ...mapGetters([
            'rank',
        ]),
    },

    created() {
        this._getRankDetail(this.rank.id);
    },

    methods: {
        async _getRankDetail(rankId) {
            try {
                if (!rankId) {
                    this.$router.push('/rank');
                }
                const res = await getRankDetail(rankId);
                if (res.code === SUCC) {
                    this.songs = this._normalizeSongs(res.songlist);
                } else {
                    this.songs = [];
                }
            } catch (err) {
                console.error(err);
            }
        },

        _normalizeSongs(list) {
            const ret = [];
            list.forEach((item) => {
                ret.push(createSong(item.data));
            });
            return ret;
        },
    },

    components: {
        MusicList,
    },
};
</script>

<style lang="stylus" scoped>
</style>

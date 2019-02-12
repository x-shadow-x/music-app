<template>
    <music-list
        ref="musicList"
        :songs="songs"
        :title="title"
        :bg-pic="bgPic" />
</template>

<script>
import { SUCC } from '@/api/config';
import { getDissDetail } from '@/api/recommend';
import MusicList from '@/components/music-list/music-list.vue';
import createSong from '@/type/song';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            songs: [],
        };
    },
    computed: {
        title() {
            return this.diss.dissname;
        },
        bgPic() {
            return this.diss.imgurl;
        },
        ...mapGetters([
            'diss',
        ]),
    },

    mounted() {
        this._getDissDetail(this.diss.dissid);
    },

    methods: {
        async _getDissDetail(dissId) {
            const res = await getDissDetail(dissId);
            if (res.code === SUCC) {
                this.songs = this._normalizeSongs(res.cdlist[0].songlist);
                // console.info(this.songs);
            } else {
                this.songs = [];
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

    components: {
        MusicList,
    },
};
</script>

<style lang="stylus" scoped>
.test
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 20
    background black
</style>

<template>
    <music-list
        ref="musicList"
        prev-path="/recommend"
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

    created() {
        this._getDissDetail(this.diss.dissid);
    },

    methods: {
        async _getDissDetail(dissId) {
            try {
                if (!dissId) {
                    this.$router.push('/recommend');
                }
                const res = await getDissDetail(dissId);
                if (res.code === SUCC) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist);
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

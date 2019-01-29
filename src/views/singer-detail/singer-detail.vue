<template>
    <div class="main primary_main">
        <music-list :songs="songs" :title="title" :singer-pic="singerPic" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { SUCC } from '@/api/config';
import { getSingerDetail } from '@/api/singer';
import createSong from '@/type/song';
import MusicList from '@/components/music-list/music-list.vue';

export default {
    data() {
        return {
            songs: [],
        };
    },
    computed: {
        title() {
            return this.singer.singer_name;
        },
        singerPic() {
            return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg?max_age=2592000`;
        },
        ...mapGetters([
            'singer',
        ]),
    },

    created() {
        this._getSingerDetail();
    },

    methods: {
        async _getSingerDetail() {
            try {
                if (!this.singer.singer_mid) {
                    this.$router.push('/singer');
                }
                const res = await getSingerDetail(this.singer.singer_mid);
                if (res.code === SUCC) {
                    this.songs = this._normalizeSongs(res.data.list);
                    console.info(this.songs);
                }
            } catch (err) {
                console.error(err);
            }
        },

        _normalizeSongs(list) {
            const ret = [];
            list.forEach((item) => {
                ret.push(createSong(item.musicData));
            });
            return ret;
        },
    },

    components: {
        MusicList,
    },
};
</script>

<style scoped lang="stylus">
.primary_main
    top 0
    z-index 3
</style>

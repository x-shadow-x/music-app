<template>
    <div class="main">
        this is detail
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { SUCC } from '@/api/config';
import { getSingerDetail } from '@/api/singer';
import createSong from '@/type/song';

export default {
    data() {
        return {
            songs: [],
        };
    },
    computed: {
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
};
</script>

<style scoped lang="stylus">
.main
    z-index 3
</style>

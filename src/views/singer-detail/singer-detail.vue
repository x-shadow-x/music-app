<template>
    <div class="main">
        this is detail
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { SUCC } from '@/api/config';
import { getSingerDetail } from '@/api/singer';

export default {
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
                    console.info(res);
                }
            } catch (err) {
                console.error(err);
            }
        },
    },
};
</script>

<style scoped lang="stylus">
.main
    z-index 3
</style>

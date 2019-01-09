<template>
    <div>推荐页</div>
</template>

<script>
import { getRecommend } from '@/api/recommend';
import { SUCC } from '@/api/config';

export default {
    data() {
        return {
            slider: [],
        };
    },

    created() {
        this._getRecommend();
    },

    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === SUCC) {
                    console.info(res.data.slider);
                    this.slider = res.data.slider;
                }
            });
        },
    },
};
</script>

<style scoped lang="stylus">

</style>

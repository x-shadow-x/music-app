<template>
    <div class="main">
        this is detail
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'singer',
        ]),
    },

    created() {
        console.info(this.singer);
    },
};
</script>

<style scoped lang="stylus">
.main
    z-index 3
</style>

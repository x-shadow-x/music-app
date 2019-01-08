<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/> -->
        <m-header />
    </div>
</template>
<script>
import MHeader from '@/components/m-header/m-header.vue';

export default {
    components: {
        MHeader,
    },
};
</script>

<style lang="stylus">
@import "~assets/stylus/variable.styl"
</style>

import { mapGetters } from 'vuex';

const scrollMixin = {
    computed: {
        ...mapGetters([
            'playList',
        ]),
    },

    mounted() {
        this._adjustScroll(this.playList);
    },

    activated() {
        this._adjustScroll(this.playList);
    },

    watch: {
        playList(nv) {
            this._adjustScroll(nv);
        },
    },

    methods: {
        _adjustScroll() {
            console.error('请在组件中实现_adjustScroll方法');
        },
    },
};

export default scrollMixin;

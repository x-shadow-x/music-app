const modalMixin = {
    data() {
        return {
            modalTitle: '',
            modalTip: '',
            cancelText: '取消',
            confirmText: '确认',
            showCancel: true,
            showConfirm: true,
            modal: null,
        };
    },
    mounted() {
        this.modal = this.$refs.modal;
        if (!this.modal) {
            console.error('引入了modal组件，请在父组件中为modal添加值为“modal”的ref');
        }
    },
};

export default modalMixin;

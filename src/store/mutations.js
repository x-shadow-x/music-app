import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer) {
        const _state = state;
        _state.singer = singer;
    },
};

export default mutations;

import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer) {
        const _state = state;
        _state.singer = singer;
    },

    [types.SET_MODE](state, mode) {
        const _state = state;
        _state.mode = mode;
    },

    [types.SET_IS_INIT](state, isInit) {
        const _state = state;
        _state.isInit = isInit;
    },

    [types.SET_PLAYING](state, playing) {
        const _state = state;
        _state.playing = playing;
    },

    [types.SET_FULL_SCREEN](state, fullScreen) {
        const _state = state;
        _state.fullScreen = fullScreen;
    },

    [types.SET_PLAY_LIST](state, playList) {
        const _state = state;
        _state.playList = playList;
    },

    [types.SET_CURRENT_INDEX](state, currentIndex) {
        const _state = state;
        _state.currentIndex = currentIndex;
    },

    [types.SET_DISS](state, diss) {
        const _state = state;
        _state.diss = diss;
    },

    [types.SET_RANK](state, rank) {
        const _state = state;
        _state.rank = rank;
    },
};

export default mutations;

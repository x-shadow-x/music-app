import * as type from './mutation-types';

export function updateSong({ commit }, payload) {
    commit(type.SET_PLAYING, true);
    commit(type.SET_FULL_SCREEN, true);
    commit(type.SET_PLAY_LIST, payload.list);
    commit(type.SET_ORIANGL_LIST, payload.list);
    commit(type.SET_CURRENT_INDEX, payload.currentIndex);
}

export function temp() {}

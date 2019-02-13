export const singer = state => state.singer || {};

export const mode = state => state.mode;
export const isInit = state => state.isInit;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playList = state => state.playList;
export const currentIndex = state => state.currentIndex;
export const currentSong = state => state.playList[state.currentIndex] || {};

export const diss = state => state.diss || {};

export const rank = state => state.rank || {};

export const singer = state => state.singer;

export const mode = state => state.mode;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playList = state => state.playList;
export const orianglList = state => state.orianglList;
export const currentIndex = state => state.currentIndex;
export const currentSong = state => state.playList[state.currentIndex] || {};

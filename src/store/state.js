import PLAY_MODE from './config';

const state = {
    singer: {},

    mode: PLAY_MODE.LOOP, // 播放模式
    playing: false, // 是否处于正在播放的状态
    fullScreen: false, // 是否处于全屏状态
    playList: [], // 当前播放模式下歌曲列表（随机，顺序）
    orianglList: [], // 原始的歌曲列表
    currentIndex: -1, // 当前正在播放的歌曲的索引
};

export default state;

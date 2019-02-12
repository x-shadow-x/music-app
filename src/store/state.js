import PLAY_MODE from './config';

const state = {
    singer: {},

    mode: PLAY_MODE.SEQUENCE, // 播放模式
    isInit: false, // 标示用户时候手动点击了播放按钮，统一移动端无法自动播放的问题
    playing: false, // 是否处于正在播放的状态
    fullScreen: false, // 是否处于全屏状态
    playList: [], // 当前播放模式下歌曲列表（随机，顺序）
    currentIndex: -1, // 当前正在播放的歌曲的索引

    diss: {}, // 推荐列表项
};

export default state;

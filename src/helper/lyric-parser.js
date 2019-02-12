import Vue from 'vue';

function _getTime(str) {
    const UNIT = 60;
    const list = str.split(':');
    let time = 0;
    for (let i = 0, len = list.length; i < len; i++) {
        time += (UNIT ** (len - i - 1)) * list[i];
    }
    return time;
}

function _parser(data) {
    const reg = /\[(\d\d:\d\d\.\d\d)\]([\s\S]*)/;
    const result = [];
    data.forEach((item) => {
        const res = item.match(reg);
        if (res && res[1]) {
            const time = _getTime(res[1]);
            result.push({
                time: time - 0.2,
                lyric: res[2],
            });
        }
    });
    return result;
}

class LyricParser {
    constructor(data, cb) {
        if (Object.prototype.toString.call(cb) === '[object Function]') {
            this.handle = cb;
        } else {
            this.handle = () => {};
        }
        const _self = this;
        this.lyric = new Vue({
            data() {
                return {
                    lyrics: _parser(data),
                    currentTime: 0,
                };
            },
            watch: {
                currentTime(nv) {
                    _self.handle(nv);
                },
            },
        });
    }
}

export default LyricParser;

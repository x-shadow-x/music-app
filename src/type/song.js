class Song {
    constructor({
        songid,
        songmid,
        songname,
        albumname,
        singer,
        interval,
        img,
    }) {
        this.songid = songid;
        this.songmid = songmid;
        this.songname = songname;
        this.albumname = albumname;
        this.singer = singer;
        this.interval = interval;
        this.img = img;
    }
}

function _getSingers(singer) {
    const ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach((item) => {
        ret.push(item.name);
    });

    return ret.join('/');
}

export default function createSong(musicData) {
    return new Song({
        songid: musicData.songid,
        songmid: musicData.songmid,
        songname: musicData.songname,
        albumname: musicData.albumname,
        singer: _getSingers(musicData.singer),
        interval: musicData.interval,
        img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    });
}

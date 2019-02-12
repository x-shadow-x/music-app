import axios from 'axios';
import { domain, commonQuery } from './config';

export function getVkey(songmid) {
    const data = {
        req: {
            module: 'CDN.SrfCdnDispatchServer',
            method: 'GetCdnDispatch',
            param: {
                guid: '5684075',
                calltype: 0,
                userip: '',
            },
        },
        req_0: {
            module: 'vkey.GetVkeyServer',
            method: 'CgiGetVkey',
            param: {
                guid: '5684075',
                songmid: [songmid],
                songtype: [0],
                uin: '0',
                loginflag: 1,
                platform: '20',
            },
        },
        comm: {
            uin: 0,
            format: 'json',
            ct: 24,
            cv: 0,
        },
    };

    const url = `${domain}/getVKey`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://u.y.qq.com/cgi-bin',
        routeName: 'musicu.fcg',
        referer: 'https://y.qq.com/portal/player.html',
        '-': 'getplaysongvkey18478874071827622',
        g_tk: 0,
        loginUin: 0, // qq号
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: JSON.stringify(data),
    });
    return axios.get(url, {
        params,
    }).then((response) => {
        console.info(response.data);
        return response.data;
    }).catch((err) => {
        console.error(err);
        return err;
    });
}

export function getLyric(pcachetime, songmid) {
    const url = `${domain}/getLyric`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/lyric/fcgi-bin',
        routeName: 'fcg_query_lyric_new.fcg',
        referer: 'https://y.qq.com/portal/player.html',
        '-': 'MusicJsonCallback_lrc',
        pcachetime,
        songmid,
        g_tk: 5381,
        loginUin: 0, // qq号
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
    });
    return axios.get(url, {
        params,
    }).then((response) => {
        console.info(response.data);
        return response.data;
    }).catch((err) => {
        console.error(err);
        return err;
    });
}

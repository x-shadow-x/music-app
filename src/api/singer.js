import axios from 'axios';
import { domain, commonQuery } from './config';

export function getSingers(param = {}) {
    const url = `${domain}/getSingers`;
    const data = {
        comm: {
            ct: 24,
            cv: 0,
        },
        singerList: {
            module: 'Music.SingerListServer',
            method: 'get_singer_list',
            param: {
                area: -100,
                sex: -100,
                genre: -100,
                sin: 0,
                cur_page: 1,
                index: -100,
                ...param,
            },
        },
    };
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://u.y.qq.com/cgi-bin',
        routeName: 'musicu.fcg',
        '-': 'getUCGI8352700688571761',
        g_tk: 741188905,
        loginUin: 2509344578,
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: JSON.stringify(data),
    });

    return axios.get(url, {
        params,
    }).then(response => response.data).catch((err) => {
        console.error(err);
        return err;
    });
}

export function getDiscList() {
    const url = `${domain}/getDiscList`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/splcloud/fcgi-bin',
        routeName: 'fcg_get_diss_by_tag.fcg',
        picmid: 1,
        rnd: Math.random(),
        loginUin: 0, // qq号
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
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

export function getSingerDetail(singerMId) {
    const url = `${domain}/getSingerDetail`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/v8/fcg-bin',
        routeName: 'fcg_v8_singer_track_cp.fcg',
        g_tk: 411520452,
        loginUin: 0, // qq号
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        ct: 24,
        singermid: singerMId,
        order: 'listen',
        begin: 0,
        num: 30,
        songstatus: 1,
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

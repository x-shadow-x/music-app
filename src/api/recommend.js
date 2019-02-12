import axios from 'axios';
import { domain, commonQuery } from './config';

export function getRecommend() {
    const url = `${domain}/getRecommend`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/musichall/fcgi-bin',
        routeName: 'fcg_yqqhomepagerecommend.fcg',
        uin: 0, // 用户qq号
        platform: 'h5',
        needNewCode: 1,
        _: (new Date()).getTime(),
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

export function getDissList() {
    const url = `${domain}/getDissList`;
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

export function getDissDetail(dissId) {
    const url = `${domain}/getDissDetail`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/qzone/fcg-bin',
        routeName: 'fcg_ucc_getcdinfo_byids_cp.fcg',
        origin: 'https://y.qq.com',
        referer: `https://y.qq.com/n/yqq/playlist/${dissId}.html`,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: dissId,
        loginUin: 0,
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

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

/**
 * 占位先，避免只export出去一个函数eslint要求用default
 */
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

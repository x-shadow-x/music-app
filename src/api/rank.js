import axios from 'axios';
import { domain, commonQuery } from './config';

export function getRank() {
    const url = `${domain}/getRank`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/v8/fcg-bin',
        routeName: 'fcg_myqq_toplist.fcg',
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        _: '1550023745248',
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

export function getRankDetail(topId) {
    const url = `${domain}/getRank`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/v8/fcg-bin',
        routeName: 'fcg_v8_toplist_cp.fcg',
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: topId,
        _: '1550023745248',
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

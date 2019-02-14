import axios from 'axios';
import { domain, commonQuery } from './config';

export function search(keyWord, pageIndex, catZhida = 0) {
    const url = `${domain}/getRank`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/soso/fcgi-bin',
        routeName: 'search_for_qq_cp',
        referer: 'https://y.qq.com/m/index.html',
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        w: keyWord,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: pageIndex,
        remoteplace: 'txt.mqq.all',
        _: '1550039806114',
        catZhida,
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

export function getHotKey() {
    const url = `${domain}/getHotKey`;
    const params = Object.assign({}, commonQuery, {
        targetDomain: 'https://c.y.qq.com/splcloud/fcgi-bin',
        routeName: 'gethotkey.fcg',
        referer: 'https://y.qq.com/m/index.html',
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        _: '1550039806114',
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

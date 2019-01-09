import jsonp from '@/assets/js/jsonp';
import { commonQuery, options } from './config';

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const query = Object.assign({}, commonQuery, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
    });

    return jsonp(url, query, options);
}

/**
 * 占位先，避免只export出去一个函数eslint要求用default
 */
export function order() {}

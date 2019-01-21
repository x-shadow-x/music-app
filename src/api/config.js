import { baseDomain } from './config-dev';

export const commonQuery = {
    referer: encodeURIComponent('https://y.qq.com/portal/playlist.html'),
    origin: encodeURIComponent('https://y.qq.com'),
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json',
};

export const options = {
    param: 'jsonpCallback',
};

export const SUCC = 0;

export const domain = baseDomain;

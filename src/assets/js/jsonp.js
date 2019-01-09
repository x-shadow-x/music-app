import orianglJSONP from 'jsonp';

function params(url, data) {
    let query = '';
    const resulting = Object.entries(data);
    for (let i = 0, len = resulting.length; i < len; i++) {
        const item = resulting[i];
        const key = item[0];
        const value = item[1] !== undefined ? item[1] : '';
        query += `&${key}=${encodeURIComponent(value)}`;
    }

    const result = url.indexOf('?') < 0 ? `${url}?${query}` : `${url}${query}`;

    return result;
}

export default function jsonp(url, query, options) {
    return new Promise((resolve, reject) => {
        orianglJSONP(params(url, query), options, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

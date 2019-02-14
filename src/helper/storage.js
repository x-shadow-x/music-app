export function setItem(key, value) {
    if (!window.localStorage) {
        return new Error('浏览器不支持localStorage');
    }
    if (key) {
        if (Object.prototype.toString.call(value) === '[object Object]') {
            try {
                const valueStr = JSON.stringify(value);
                window.localStorage.setItem(key, valueStr);
            } catch (err) {
                console.error(err);
            }
        } else {
            window.localStorage.setItem(key, value);
        }
        return true;
    }
    return false;
}

export function getItem(key) {
    if (!window.localStorage) {
        return new Error('浏览器不支持localStorage');
    }
    if (key) {
        const value = window.localStorage.getItem(key);
        let res = value;
        try {
            res = JSON.parse(value);
            return res;
        } catch (error) {
            return res;
        }
    }
    return '';
}

export function removeItem(key) {
    if (!window.localStorage) {
        return new Error('浏览器不支持localStorage');
    }
    if (key) {
        window.localStorage.removeItem(key);
        return true;
    }
    return false;
}

export function clear() {
    if (!window.localStorage) {
        return new Error('浏览器不支持localStorage');
    }
    window.localStorage.clear();
    return true;
}

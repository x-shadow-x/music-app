export function hasClass(el, className) {
    // const reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
    console.log(reg.test(el.className), el.className, className);
    return reg.test(el.className);
}

export function addClass(el, className) {
    // console.log(el, className);
    if (hasClass(el, className)) {
        return;
    }
    const classNameArr = el.className.split(' ');
    classNameArr.push(className);
    // el.className = classNameArr.join(' ');
    Object.defineProperty(el, 'className', {
        value: classNameArr.join(' '),
    });
}

export function getData(el, name, val) {
    const prefix = 'data-';
    const key = `${prefix}${name}`;
    if (val) {
        return el.setAttribute(key, val);
    }
    return el.getAttribute(key);
}

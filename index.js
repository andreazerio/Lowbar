const _ = {};

_.identity = (val) => val;

_.first = (arr, num = 1) => {
if (typeof arr === 'string') arr = arr.split('');
if (!Array.isArray(arr) || arr.length === 0) return undefined;
return num === 1 ? arr[0] : arr.slice(0,num);
};

_.last = (arr, num) => {
    if (typeof arr === 'string') arr = arr.split('');
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return num === 1 ? arr[arr.length - 1] : arr.slice(-num);
};

_.each = (list, iteratee) => {
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            iteratee(list[i], i, list);
        }
    }
    if (typeof list === 'object' && !Array.isArray(list)) {
        for (let key in list) {
            iteratee(list[key], key, list);
        }
    }

    return list;
};

module.exports = _;
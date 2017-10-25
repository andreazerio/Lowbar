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

module.exports = _;
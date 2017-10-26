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

_.indexOf = (list, val, index = 0) => {
    if (!Array.isArray(list) && typeof list !== 'string') return NaN;
    if (list.length === 0) return -1;
    for (let i = index; i < list.length; i++) {
        if (list[i] === val) return i;
        return -1;
    }
};

_.filter = (list,pred) => {
    let arr = [];
    const fn = (el, index) => {
      if (pred(el, index)) {
          arr.push(el);
      }
  };
    _.each(list,fn);
    return arr;
  };

  _.reject = (list, pred) => {
      const fn = (item) => !pred(item);
      return _.filter(list, fn);
  };

  _.uniq = (arr) => {
    if (typeof arr === 'string') arr = arr.split('');
    if (!Array.isArray(arr)) return [];
    return arr.reduce((acc,elem) => {
        if (acc.indexOf(elem) === -1) acc.push(elem);
        return acc;
        }, []);
  };

  _.map = (list, iteratee) => {
    if (typeof list === 'string') list = list.split('');
    if (typeof list !== 'object') return [];
    let result = [];
    const fn = (item) => result.push(iteratee(item));
    _.each(list, fn);
    return result;
  };

  _.contains = (list,val,fromIndex) => _.indexOf(list,val,fromIndex) > -1;

  _.pluck = (list, property) => {
    let result = [];
    const fn = (item) => result.push(item[property]);
    _.map(list,fn);
    return result;
  };

module.exports = _;
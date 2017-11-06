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

_.each = (list, iteratee, context) => {
    if (context) iteratee = iteratee.bind(context);
    if (typeof list === 'string') list = list.split('');
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

_.filter = (list,pred, context) => {
    if (context) pred.bind(context);
    let arr = [];
    const fn = (el, index) => {
      if (pred(el, index)) {
          arr.push(el);
      }
  };
    _.each(list,fn);
    return arr;
  };

  _.reject = (list, pred, context) => {
    if (context) pred.bind(context);
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

  _.map = (list, iteratee, context) => {
    if (context) iteratee.bind(context);
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

  _.reduce = (list, iteratee, memo, context) => {
    if (context) iteratee = iteratee.bind(context);
      const fn = (item) => iteratee(item);
      _.each(list, fn);
      return memo;
  };

  _.every = (list, iteratee, context) => {
    if (context) iteratee = iteratee.bind(context);
    if ( typeof list === 'string') list = list.split('');
    let result = [];
    const fn = (item) => {
        if (iteratee(item)) result.push(true);
    };
    _.each(list, fn);

    return result.length === list.length ? true : false;
  };

  _.some = (list, iteratee) => {
    if (context) iteratee = iteratee.bind(context);
    if (typeof list === 'string') list = list.split('');
    let result = [];
    const fn = (item) => {
      if (iteratee(item)) result.push(true);
    };
  
    _.each(list,fn);
  
    return result.length >= 1 ? true : false;
  };

  _.extend = (destination, source) => {
    if (typeof destination === 'object' && !Array.isArray(destination)) {
      for (let key in source) {
        destination[key] = source[key]; 
      }
    }
  
    if (Array.isArray(destination)) {
      for (let key in source) {
        destination.push(source[key]);
      }
    }
    return destination;
  };

  _.defaults = function (object) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (!object[key]) {
          object[key] = arguments[i][key];
        }
      }
    }
    return object;
  };

  _.once = function (func) {
    let firstCall = true;
    let result;
  
    return function () {
      if (firstCall) {
        firstCall = false;
        result = func.apply(null, arguments);
      }
      return result;
    };
  };

  _.negate = function (fn) {
    return !fn();
  };

  _.shuffle = function (list) {
    if (typeof list !== 'string' && typeof list !== 'object' && !Array.isArray(list)) return [];
    if (typeof list === 'string') list = list.split('');
    if (!Array.isArray(list) && typeof list === 'object') list = Object.values(list);
    let randomIndex;
    let temporaryVal;
    let currentIndex = list.length;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
    
      temporaryVal = list[currentIndex];
      list[currentIndex] = list[randomIndex];
      list[randomIndex] = temporaryVal;
    }
    return list;
  };

  _.invoke = function (list, methodName, args) {
    if (typeof list !== 'object') return [];
    const func = (el) =>  (methodName instanceof Function) ? methodName.apply(el, args) : el[methodName].apply(el, args);
    return _.map(list, func);
   };

module.exports = _;
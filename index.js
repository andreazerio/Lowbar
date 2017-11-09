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

  _.invoke = (list, methodName, args) => {
    if (typeof list !== 'object') return [];
    const func = (el) =>  (methodName instanceof Function) ? methodName.apply(el, args) : el[methodName].apply(el, args);
    return _.map(list, func);
   };

   _.sortBy = (list, iteratee, context) => {
    if (typeof list !== 'object' && typeof list !== 'string') return [];
    if (context && typeof iteratee === 'function') iteratee = iteratee.bind(context);
    let copy;
    if (typeof iteratee === 'function' && typeof list === 'string') copy = list.split('');
    if (typeof iteratee === 'function' && Array.isArray(list)) copy = list.slice();
    if (typeof iteratee === 'string') {
        copy = list.slice();
        return copy.sort((a,b) => {
            if (a[iteratee] < b[iteratee]) return -1;
            if (a[iteratee] > b[iteratee]) return 1;
            return 0;
        });
    }
    return copy.sort((a,b) => iteratee(a) - iteratee(b));
   };

   _.zip = function () {
    let zipped = [];
    let args = [].slice.apply(arguments);

    const func = (arr) => {
        _.each(arr, (elem, index) => {
            if (zipped[index]) zipped[index].push(elem);
            else zipped[index] = [elem];
        });
    };
    _.each(args, func);
    return zipped;
   };

   _.sortedIndex = (list, value, iteratee, context) => {
    if (context && typeof iteratee === 'function') iteratee.bind(context);
    if (!Array.isArray(list) && typeof list !== 'string') return 0;
    
      let newList = list.slice();
      newList.push(value);
    
      if (iteratee) {
        newList = _.sortBy(newList, iteratee);
    
        let firstIndex = 0;
        let middleIndex;
        let lastIndex = newList.length - 1;

        while (lastIndex >= firstIndex) {
          middleIndex = Math.floor((firstIndex + lastIndex) / 2);
          if (newList[middleIndex][iteratee] === value[iteratee]) {
            return middleIndex;
          }
          else if (newList[middleIndex][iteratee] < value[iteratee]) {
            firstIndex = middleIndex + 1;
          } else {
            lastIndex = middleIndex - 1;
          }
        }
        return -1;
    
      } else newList.sort();
      return newList.indexOf(value);
   };

   _.flatten = (array, shallow) => {
    if (!Array.isArray(array) && typeof array !== 'string') return [];
    if (!shallow) {
        _.each(array, function(el) {
            if (Array.isArray(el)) array = _.flatten([].concat.apply([], array));
        });
    }
    array = [].concat.apply([], array);
    return array;
   };

   _.intersection = function () {
    let args = [].slice.call(arguments);
    let newArgs = _.map(args, (arr) => {
        if (typeof arr === 'object') return _.uniq(arr);
        if (typeof arr === 'string') return _.uniq(arr.split(''));
    });
    const array = _.flatten(newArgs);
    const result = _.filter(array, (elem) => {
        return array.indexOf(elem) !== array.lastIndexOf(elem);
    });
    if (!Array.isArray(args[0]) && typeof args[0] !== 'string') return [];
    return _.uniq(result);
   };

   _.difference = function (array) {
    const args = _.flatten([].slice.call(arguments, 1));
    if (typeof array === 'string') return array.split('');
    return _.filter(array,(elem) => {
        return args.indexOf(elem) === -1;
    });
   };

   _.memoize = (func) => {
    var cache = {};
    return function() {
        var args = [].slice.call(arguments);
        return cache[args] = (args in cache) ? cache[args] : func.apply(this, args);
    };
};

_.delay = (func, time,  ...args) => {
    setTimeout(() => {
        func.apply(null, args);
    }, time);
};

_.where = () => {

};

module.exports = _;
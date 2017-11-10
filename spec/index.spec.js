const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './index.js'));

describe('_', () => {
    'use strict';

    it('is an object', () => {
        expect(_).to.be.an('object');
    });
});

describe('identity', () => {
    it('exists', () => {
        expect(_.identity).to.be.a('function');
    });
    it('returns the argument passed to it unmodified', () => {
        expect(_.identity([1,2,3,4,5])).to.eql([1,2,3,4,5]);
        expect(_.identity(3)).to.equal(3);
        expect(_.identity()).to.equal(undefined);
    });
});

describe('first', () => {
    it('exists', () => {
        expect(_.first).to.be.a('function');
    }),
    it('returns the first n elements of an array', () => {
        expect(_.first([1,2,3])).to.equal(1);
        expect(_.first([1,2,3],2)).to.eql([1,2]);
    });
    it('returns the first n elements of a string', () => {
        expect(_.first('hello'), 1).to.eql('h');
    });
    it('returns undefined if passed the wrong arguments', () => {
        expect(_.first()).to.equal(undefined);
        expect(_.first(12)).to.equal(undefined);
        expect(_.first(true)).to.equal(undefined);
        expect(_.first([])).to.equal(undefined);
    });
});

describe('last', () => {
    it('exists', () => {
        expect(_.last).to.be.a('function');
    });
    it('returns the last n elements of an array', () => {
        expect(_.last([1,2,3],2)).to.eql([2,3]);
    });
    it('returns the last n elements of a string', () => {
        expect(_.last('hello', 2)).to.eql(['l', 'o']);
    });
    it('returns undefined if passed the wrong argument', () => {
        expect(_.last()).to.equal(undefined);
        expect(_.last(12)).to.equal(undefined);
        expect(_.last(true)).to.equal(undefined);
        expect(_.last([])).to.equal(undefined);
    });
});

describe('each', () => {
    it('is a function', () => {
      expect(_.each).to.be.a('function');
    });
    it('calls the iteratee as many times as the number of items in the array', () => {
        const spy = sinon.spy();
        _.each([1,2,3],spy);
      expect(spy.callCount).to.equal(3);
    });
    it('calls the iteratee passing each element of the array as the right argument',() => {
        const spy = sinon.spy();
        _.each([1,2,3],spy);
      expect(spy.firstCall.calledWithExactly(1,0,[1,2,3])).to.equal(true);
      expect(spy.secondCall.calledWithExactly(2,1,[1,2,3])).to.equal(true);
      expect(spy.thirdCall.calledWithExactly(3,2,[1,2,3])).to.equal(true);
    });
    it('calls the iteratee as many times as the number of items in the object', () => {
        const spy = sinon.spy();
        _.each({a:1,b:2,c:3},spy);
      expect(spy.callCount).to.equal(3);
    });
    it('calls the iteratee passing each element of the object as the right argument',() => {
        const spy = sinon.spy();
        _.each({a:1,b:2,c:3},spy);
      expect(spy.firstCall.calledWithExactly(1,'a',{a:1,b:2,c:3})).to.equal(true);
      expect(spy.secondCall.calledWithExactly(2,'b',{a:1,b:2,c:3})).to.equal(true);
      expect(spy.thirdCall.calledWithExactly(3,'c',{a:1,b:2,c:3})).to.equal(true);
    });
    it('binds the iteratee to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.each([1,2,3,4], fn, context);
      expect(result).to.eql([5,5,5,5]);
    });
  });

describe('indexOf', () => {
    it('exists', () => {
      expect(_.indexOf).to.be.a('function');
    });
    it('returns the index of the value requested', () => {
      expect(_.indexOf(['h', 'e','l','l','o'], 'h')).to.equal(0);
    });
    it('returns -1 if the value is not present', () => {
      expect(_.indexOf('hello', 't')).to.equal(-1);
      expect(_.indexOf('hello', 'h',2)).to.equal(-1);
    });
    it('returns NaN if the fisrt argument is not a valid list', () => {
      expect(_.indexOf(3, 'h')).to.eql(NaN);
      expect(_.indexOf(true, 'h')).to.eql(NaN);
      expect(_.indexOf({}, 'h')).to.eql(NaN);
    });
    it('returns -1 if given an empty list', () => {
      expect(_.indexOf('', 'h')).to.eql(-1);
      expect(_.indexOf([], 'h')).to.eql(-1);
    });
  });

describe('filter', () => {
    const fn = (num) => {
        return num > 2;
      };
    it('exists', () => {
      expect(_.filter).to.be.a('function');
    });
    it('calls the iteratee as many times as the number of items in the list', () => {
      const spy = sinon.spy();
      _.filter([1,2,3,4,5],spy);
      expect(spy.callCount).to.equal(5);
    });
    it('only returns elements from the array that satify the predicate', () => {
      expect(_.filter([1,2,3,4,5],fn)).to.eql([3,4,5]);
    });

    it('only returns elements from the object that satify the predicate', () => { 
      expect(_.filter({a:1,b:2, c:3,d:4,e:5},fn)).to.eql([3,4,5]);
    });
    it('tests for edge cases', () => {
      expect(_.filter(3,fn)).to.eql([]);
      expect(_.filter(undefined,fn)).to.eql([]);
      expect(_.filter('',fn)).to.eql([]);
      expect(_.filter(true,fn)).to.eql([]);
      expect(_.filter([],fn)).to.eql([]);
      expect(_.filter({},fn)).to.eql([]);
    });
    it('binds the predicate to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.filter([1,2,3,4], fn, context);
      expect(result).to.eql([5,5,5,5]);
    });
  });

describe('reject', () => {

    const fn = (num) => {
        return num > 2;
      };

    it('exists', () => {
      expect(_.reject).to.be.a('function');
    });
    it('only returns elements from the array that don\'t satisfy the predicate', () => {
      expect(_.reject([1,2,3,4,5],fn)).to.eql([1,2]);
    });
    it('only returns elements from the object that don\'t satisfy the predicate', () => {
      expect(_.reject({a:1,b:2, c:3,d:4,e:5},fn)).to.eql([1,2]);
    });
    it('tests for edge cases', () => {
      expect(_.reject(3,fn)).to.eql([]);
      expect(_.reject(undefined,fn)).to.eql([]);
      expect(_.reject('',fn)).to.eql([]);
      expect(_.reject(true,fn)).to.eql([]);
      expect(_.reject([],fn)).to.eql([]);
      expect(_.reject({},fn)).to.eql([]);
    });
    it('binds the predicate to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.reject([1,2,3,4], fn, context);
      expect(result).to.eql([5,5,5,5]);
    });
  });

describe('uniq', () => {
    it('exists', () => {
      expect(_.uniq).to.be.a('function');
    });
  it('returns an array', () => {
    expect(Array.isArray(_.uniq([1,2,3]))).to.be.true;
  });
  it('returns a duplicate-free array if passed either a string or an array', () => {
    expect(_.uniq([1,2,3,2,5,3])).to.eql([1,2,3,5]);
    expect(_.uniq(['h','e','l','l','o',' ','w','o','r','l','d'])).to.eql(['h','e','l','o',' ','w','r','d']);
    expect(_.uniq('hello')).to.eql(['h','e','l','o']);
  });
  it('tests for edge cases', () => {
    expect(_.uniq()).to.eql([]);
    expect(_.uniq(3)).to.eql([]);
    expect(_.uniq(true)).to.eql([]);
    expect(_.uniq([])).to.eql([]);
    expect(_.uniq('')).to.eql([]);
    expect(_.uniq({})).to.eql([]);
   });
  });

describe('map', () => {
    const fn = (num) => num * 3;
    const fn2 = (item) => item.toUpperCase();

    it('exists', () => {
      expect(_.map).to.be.a('function');
    });
    it('returns an array', () => {
      expect(Array.isArray(_.map([1,2,3], fn))).to.be.true;
    });
    it('Produces a new array of values by mapping each value in list through a transformation function (iteratee)', () => {
      let arr = [1,2,3];
      let obj = {a:1, b:2, c:3};
      expect(_.map(arr, fn)).to.eql([3,6,9]);
      expect(_.map(obj, fn)).to.eql([3,6,9]);
    });
    it('Produces a new array of values by mapping each value in string through a transformation function (iteratee)', () => {
      expect(_.map('hello', fn2)).to.eql(['H', 'E', 'L', 'L', 'O']);
    } );
    it('tests for edge cases', () => {
      expect(_.map(undefined, fn)).to.eql([]);
      expect(_.map(8, fn)).to.eql([]);
      expect(_.map('', fn)).to.eql([]);
      expect(_.map([], fn)).to.eql([]);
      expect(_.map({}, fn)).to.eql([]);
    });
    it('binds the predicate to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.map([1,2,3,4], fn, context);
      expect(result).to.eql([5,5,5,5]);
    });
  });
  
describe('contains', () => {
    it('exists', () => {
      expect(_.contains).to.be.a('function');
    });
    it('returns a boolean', () => {
      expect(typeof _.contains('hello','h',2)).to.equal('boolean');
    });
    it('Returns true if the value is present in the list,use fromIndex to start your search at a given index', () => {
      expect(_.contains('hello','h',2)).to.equal(false);
      expect(_.contains('hello','h')).to.equal(true);
    });
    it('tests for edge cases', () => {
      expect(_.contains(undefined,'h')).to.equal(false);
      expect(_.contains([],'h')).to.equal(false);
      expect(_.contains({},'h')).to.equal(false);
      expect(_.contains('','h')).to.equal(false);
      expect(_.contains(true,'h')).to.equal(false);
      expect(_.contains(3,'h')).to.equal(false);
    });
  });

describe('pluck', () => {
    it('exists', () => {
    expect(_.pluck).to.be.a('function');
    });
    it('should return an array', () => {
      let arr = [
        {a:1, b:2}, 
        {a:3, b:4}
      ];
      expect(Array.isArray(_.pluck(arr, 'a'))).to.be.true;
    });
    it('extracts a list of property values', () => {
      let arr = [
        {a:1, b:2}, 
        {a:3, b:4}
      ];
      expect(_.pluck(arr, 'a')).to.eql([1, 3]);
    });
    it('test for edge cases', () => {
      let obj = {a:1, b:2, c:3};
      expect(_.pluck('hi', 'a')).to.eql([undefined, undefined]);
      expect(_.pluck('hi')).to.eql([undefined, undefined]);
      expect(_.pluck(3)).to.eql([]);
      expect(_.pluck([])).to.eql([]);
      expect(_.pluck({})).to.eql([]);
      expect(_.pluck('')).to.eql([]);
      expect(_.pluck(obj)).to.eql([undefined, undefined, undefined]);
    });
  });

describe('reduce', () => {
    it('exists', () => {
      expect(_.reduce).to.be.a('function');
    });
    it('returns the type of the memo', () => { 
        let memo = []; 
        const fn = (item) => {
            if (item > 2) memo.push(item * 2);
          };
      let arr = [1,2,3,4,5];
      expect(typeof _.reduce(arr,fn,memo)).to.equal(typeof memo);
    });
    it('boils down a list of values into a single value in the same type as the memo', () => {
        let memo = []; 
        const fn = (item) => {
            if (item > 2) memo.push(item * 2);
          };
     let arr = [1,2,3,4,5];
      expect(_.reduce(arr, fn, memo)).to.eql([6,8,10]); 
    });
    it('binds the predicate to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.reduce([1,2,3,4], fn, context);
      expect(result).to.eql([5,5,5,5]);
    });
  });

  describe('every', () => {
    it('exists', () => {
      expect(_.every).to.be.a('function');
    });
    it('returns a boolean', () => {
      let list = [1,2,3,4,5];
      let iteratee = (n) => {
        return n > 2;
      };
      expect (typeof _.every(list,iteratee)).to.equal('boolean');
    });
    it('Returns true if all of the values in the list pass the predicate truth test', () => {
      let list = [1,2,3,4,5];
      let iteratee = (n) => {
        return n > 2;
      };
      expect (_.every(list,iteratee)).to.equal(false);
      expect (_.every(1,iteratee)).to.equal(false);
      expect (_.every([],iteratee)).to.equal(true);
    });
    it('Returns right output when given a string as argument', () => {
      let str = 'hhhhhhhhhhhh';
      let iteratee = (lett) => {
        return lett === 'h';
      };
      expect (_.every(str,iteratee)).to.equal(true);
    });
    it('binds the predicate to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.every([1,2,3,4], fn, context);
      expect(result).to.eql([5,5,5,5]);
    });
  });
  
  describe('some', () => {
    const list = [1,2,3,4,5];
    const iteratee = (n) => {
      return n > 2;
    };
    it('is a function', () => {
      expect(_.some).to.be.a('function');
    });
    it('returns a boolean', () => {
      expect (_.some(list,iteratee)).to.be.a('boolean');
    });
    it('Returns true if any of the values in the list pass the predicate truth test', () => {
      expect(_.some(list,iteratee)).to.equal(true);
    });
    it('Returns right output when given a string as argument', () => {
      let str = 'hhshhashhhfvhhhhtrh';
      let iteratee = (lett) => {
        return lett === 'h';
      };
      expect (_.some(str,iteratee)).to.equal(true);
    });
    it('returns false for edge cases', () => {
      expect(_.some([],iteratee)).to.equal(false);
      expect(_.some({},iteratee)).to.equal(false);
      expect(_.some('',iteratee)).to.equal(false);
      expect(_.some(4,iteratee)).to.equal(false);
    });
  });

  describe('extend', () => {
    let destination = {a:1, b:2, c:3};
    let source = {d:4, e:5};
    it('exists', () => {
      expect(_.extend).to.be.a('function');
    });
    it('returns the same type as the destination object', () => {
      expect(typeof _.extend(destination,source)).to.equal(typeof destination);
    });
    it('shallowly copies all of the properties in the source objects over to the destination object, and return the destination object', () => {
      expect(_.extend(destination,source)).to.eql({a:1, b:2, c:3, d:4, e:5});
    });
    it('shallowly copies all of source object properties into array destination', () => {
      let destination = [1,2,3];
      expect(_.extend(destination, source)).to.eql([1, 2, 3, 4, 5]);
    });
    it('tests for edge cases', () => {
      expect(_.extend(3,source)).to.equal(3);
      expect(_.extend('',source)).to.equal('');
      expect(_.extend(undefined,source)).to.equal(undefined);
      expect(_.extend([],source)).to.eql([4,5]);
      expect(_.extend({},source)).to.eql({d:4, e:5});
      expect(_.extend(true,source)).to.eql(true);
    });
  });

  describe('defaults', () => {
    it('exists', () => {
      expect(_.defaults).to.be.a('function');
    });
    it('fills in undefined properties of first argument with the first value present in the next argument', () => {
      let obj = {a:1, b:2};
      let def = {b:3, c:4};
      expect(_.defaults(obj,def)).to.eql({a:1, b:2, c:4});
    });
    it('fills in undefined properties of first argument with the first value present in the next argument if the second argument is an array', () => {
      expect(_.defaults(['hello', 'world'], ['noPass1', 'noPass2', 'test', 'test1'])).to.eql(['hello', 'world', 'test', 'test1']);
    });
    it('tests for edge cases', () => {
      expect(_.defaults(1234, 5678)).to.equal(1234);
      expect(_.defaults(9876, { number: 5432 })).to.equal(9876);
      expect(_.defaults('pineapple', 'coconut')).to.equal('pineapple');
      expect(_.defaults('pineapple', { type: 'coconut' })).to.equal('pineapple');
      expect(_.defaults(true, false)).to.equal(true);
      expect(_.defaults(true, { isTrue: false })).to.equal(true);
    });
  });

  describe('once', () => {
    it('is a function', () => {
      expect(_.once).to.be.a('function');
    });
    it('only calls the function argument once', () => {
      const spy = sinon.spy();
      _.once(spy());
      expect(spy.calledOnce).to.be.true;
    });
    it('tests that repeated call will not affect the argument function',  () => {
      const spy = sinon.spy();
      let func = _.once(spy);
      func();
      func(); 
      expect(spy.callCount).to.equal(1);
    });
    it('returns the result of the first invocation', () => {
      let fn = _.once(_.identity);
      let result = [];
      result.push(fn(1));
      result.push(fn(2));
      result.push(fn(3));
      expect(result).to.eql([1, 1, 1]);
    });
  });

  describe('negate', () => {
    const fn = (n) => {
      return n > 1 ;
    };
    const func = _.negate(fn);
    it('exists', () => {
      expect(_.negate).to.be.a('function');      
    });
    it('returns negated version of the predicate function', () => {
      expect(func).to.eql(true);
    });
  });

  describe('shuffle', () => {
    it('exists', () => {
      expect(_.shuffle).to.be.a('function');
    });
    it('Returns an array with the same length of the orginal array', () => {
      const arr = [1,2,3,4,5];
      expect(_.shuffle(arr).length).to.equal(arr.length);
    });
    it('returns an array different from the original array', () => {
      const arr = [1,2,3,4,5];
      expect(_.shuffle(arr)).to.not.eql([1,2,3,4,5]);
    });
    it('returns a shuffled array of letters when passed a string', () => {
      const str = 'hello';
      expect(_.shuffle(str)).to.not.eql(['h','e','l','l','o']);
    });
    it('returns a randomised array of values when passed an object', () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d :4
      };
      expect(_.shuffle(obj)).to.not.eql([1,2,3,4,5]);
    });
    it('tests for edge cases', () => {
      expect(_.shuffle(3)).to.eql([]);
      expect(_.shuffle(true)).to.eql([]);
      expect(_.shuffle([])).to.eql([]);
      expect(_.shuffle({})).to.eql([]);
      expect(_.shuffle('')).to.eql([]);
    });
  });

  describe('invoke', () => {
    it('exists', () => {
      expect(_.invoke).to.be.a('function');
    });
    it('returns a sorted list of values when passed the sort method', () => {
      expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    });
    it('returns a collection of upper case strings when passed toUpperCase method', () => {
      expect(_.invoke({a: 'hello',b: 'world'}, 'toUpperCase')).to.eql(['HELLO', 'WORLD']);
    });
    it('tests for edge cases', () => {
      expect(_.invoke(3, 'sort')).to.eql([]);
      expect(_.invoke(true, 'sort')).to.eql([]);
      expect(_.invoke('hello world', 'sort')).to.eql([]);
    });
  });

  describe('sortBy', () => {
    const func = (num) => Math.abs(num); 
    it('exists', () => {
      expect(_.sortBy).to.be.a('function');
    });
    it('returns a new array sorted accord to an iteratee method', () => {
      expect(_.sortBy([-9, 8, 5, -18, 68], func)).to.eql([ 5, 8, -9, -18, 68 ]);
    });
    it('returns a list of objects ordered alphabetically on one common property when iteratee is not a function', () => {
      const data = [{name: 'Andrea', age: '24'}, {name: 'Ciara', age: 22}, {name: 'Anna', age: 21}];
      expect(_.sortBy(data, 'name')).to.eql([{name: 'Andrea', age: '24'}, {name: 'Anna', age: 21}, {name: 'Ciara', age: 22}]);
      expect(_.sortBy(data, 'age')).to.eql([{name: 'Anna', age: 21},{name: 'Ciara', age: 22}, {name: 'Andrea', age: '24'}]);
    });
    it('tests for edge cases', () => {
      expect(_.sortBy(9, func)).to.eql([]);
      expect(_.sortBy(false, func)).to.eql([]);
      expect(_.sortBy(undefined, func)).to.eql([]);
    });
  });

  describe('zip', () => {
    it('exists', () => {
      expect(_.zip).to.be.a('function');
    });
    it('Merges together the values of each of the arrays with the values at the corresponding position', () => {
      expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
    });
    it('merges together letters of strings at the same index', () => {
      expect(_.zip('hello', 'world', 'fooba')).to.eql([['h', 'w', 'f'], ['e', 'o', 'o'], ['l', 'r', 'o'], ['l', 'l', 'b'], ['o', 'd', 'a']]);
    });
    it('tests for edge cases', () => {
      expect(_.zip(true)).to.eql([]);
      expect(_.zip(5)).to.eql([]);
    });
  });

  describe('sortedIndex', () => {
    it('exists', () => {
      expect(_.sortedIndex).to.be.a('function');
    });
    it('returns the index at which the value should be inserted into the list in order to maintain the list order', () => {
      expect(_.sortedIndex([1, 22, 38, 45, 77, 90, 102], 42)).to.equal(4);
    });
    it('returns the index at which the element has been inserted when given a passed a third element to sort the list', () => {
      expect(_.sortedIndex(['table', 'glass', 'laptop', 'photo'], 'honomatopea', 'length')).to.equal(4);
    });
    it('binds the predicate to the context if given one', () => {
      const context = {number: 5};
      const fn = () => {result.push(context.number);};
      const result = [];
      _.sortedIndex([1,4,7,12], 8, fn, context);
      expect(result).to.eql([ 5, 5, 5, 5, 5, 5, 5, 5 ]);
    });
    it('tests for edge cases', () => {
      expect(_.sortedIndex(5, 2)).to.equal(0);
      expect(_.sortedIndex(true, false)).to.equal(0);
      expect(_.sortedIndex({ a: 2, b: 4, c: 6, d: 10 }, { e: 8 })).to.equal(0);
    });
  });

  describe('flatten', () => {
    it('exists', () => {
      expect(_.flatten).to.be.a('function');
    });
    it('flattens a nested array (the nesting can be to any depth)', () => {
      expect(_.flatten([1, [2, [3, [4, [5, [6, [7]]]]], [8]]])).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(_.flatten(['hello',[['world'], ['foo'], ['bar']]])).to.eql(['hello', 'world', 'foo', 'bar']);
    });
    it('only flattens the array to a single level if the "shallow" argument is passed', () => {
      expect(_.flatten([1, [2], [3, [[4]]]], true)).to.eql([1, 2, 3, [[4]]]);
    });
    it('test for edge cases', () => {
      expect(_.flatten(1234)).to.eql([]);
      expect(_.flatten(false)).to.eql([]);
      expect(_.flatten({ a: 'yes', b: 'no', c: 'maybe' })).to.eql([]);
    });
  });

  describe('intersection', () => {
    it('exists', () => {
      expect(_.intersection).to.be.a('function');
    });
    it('Computes the list of values that are the intersection of all the arrays given', () => {
      expect(_.intersection([12,789,73],[12, 98, 73, 273], [96, 73, 88, 12])).to.eql([12, 73]);
      expect(_.intersection([ 17, 3, 'math', false, 'blue'], [false, 'math', 10, true, 99, 17], [ 'math', false, 17])).to.eql([17, 'math', false]);
    });
    it('should return all characters common to each string given', () => {
      expect(_.intersection('paperbag','trowsers')).to.eql(['e', 'r']);
    });
    it('tests for edge cases', () => {
      expect(_.intersection({ a: 'hello' }, { a: 'world' })).to.eql([]);
      expect(_.intersection(1, 2, 3)).to.eql([]);
      expect(_.intersection(true, true, true)).to.eql([]);
    });
  });

  describe('difference', () => {
    it('exists', () => {
      expect(_.difference).to.be.a('function');
    });
    it('returns the values from array that are not present in the other arrays', () => {
      expect(_.difference([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 6, 7])).to.eql([2, 3, 4, 5, 8, 9]);
    });
    it('returns a split string when passed a string as first argument', () => {
      expect(_.difference('hello', 'world')).to.eql(['h', 'e', 'l', 'l', 'o']);
    });
    it('tests for edge cases', () => {
      expect(_.difference(1, 2, 3)).to.eql([]);
      expect(_.difference(true, false, false)).to.eql([]);
    });
  });

  describe('memoize', () => {
    it('exists', () => {
      expect(_.memoize).to.be.a('function');
    });
    it('returns the same value as the original function', () => {
      const double = (num) => num * 2;
      const memoizeDouble = _.memoize(double);
      expect(memoizeDouble(3)).to.eql(double(3));
      expect(memoizeDouble(3)).to.eql(double(3));
      expect(memoizeDouble(3)).to.eql(double(3));
    });
    it('calls the function only once if passed with the same argument ', () => {
      let counter = 0;
      const updateCounter = (num) => counter += num;
      const memoizeUpdateCounter = _.memoize(updateCounter);
      memoizeUpdateCounter(1);
      memoizeUpdateCounter(1);
      memoizeUpdateCounter(1);
      expect(counter).to.equal(1);
    });
    it('calls the function multiple times if passed different arguments', () => {
      let counter = 0;
      const updateCounter = (num) => counter += num;
      const memoizeUpdateCounter = _.memoize(updateCounter);
      memoizeUpdateCounter(1);
      memoizeUpdateCounter(2);
      memoizeUpdateCounter(3);
      expect(counter).to.equal(6);
    });
  });

  describe('delay', () => {
      it('exists', () => {      
          expect(_.delay).to.be.a('function');
        });
          it('executes the function after the set delay', (done) => {
            const spy = sinon.spy();
            _.delay(spy, 1000);
            expect(spy.called).to.equal(false);
            setTimeout(() => {
              expect(spy.called).to.equal(true);
              done();
            }, 1005);
          });
          it('passes the optional arguments to the function if provided', (done) => {
            const spy = sinon.spy();
            _.delay(spy, 1000, 'hello', 'world');
            setTimeout(() => {
                expect(spy.calledWith('hello', 'world')).to.equal(true);
                done();
            }, 1005);
          });
  });

  describe('where', () => {
    const list = [
    {title: 'Cymbeline', author: 'Shakespeare', year: 1611},
    {title: 'The Tempest', author: 'Shakespeare', year: 1611},
    {title: 'Hamlet',  author: 'Shakespeare', year: 1603},
    {title: 'MacBeth',  author: 'Shakespeare', year: 1623}
  ];

  const properties = {year: 1611};
    it('exists', () => {
      expect(_.where).to.be.a('function');
    });
    it('Looks through each value in the list, returning an array of all the values that contain all of the key-value pairs listed in properties', () => {
     expect(_.where(list, properties)).to.eql([{title: 'Cymbeline', author: 'Shakespeare', year: 1611}, {title: 'The Tempest', author: 'Shakespeare', year: 1611}]);
    });
    it('returns an array of letter when passed a string', () => {
      expect(_.where('hello')).to.eql(['h', 'e', 'l', 'l', 'o']);
      expect(_.where('hello world')).to.eql(['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']);
    });
    it('tests for edge cases', () => {
      expect(_.where()).to.eql([]);
      expect(_.where(1)).to.eql([]);
      expect(_.where(true)).to.eql([]);
    });
  });

  describe('throttle', () => {
    it('exists', () => {
      expect(_.throttle).to.be.a('function');
    });
    it('calls the function passed to throttle with the right arguments', () => {
      const spy = sinon.spy();
      const func = _.throttle(spy, 500);
      expect(spy.callCount).to.equal(0);
      func('hello');
      expect(spy.callCount).to.equal(1);
      expect(spy.args).to.eql([['hello']]);
    });
  });
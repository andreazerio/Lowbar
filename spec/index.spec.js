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
  });
  
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

describe('#each', () => {
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
  });

  describe('#indexOf', () => {
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

  describe('#filter', () => {
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
  });

  describe('#reject', () => {

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
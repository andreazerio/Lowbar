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
    it('calls the iteratee as many times as items in the passed array', () => {
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
    it('calls the iteratee as many times as items in the passed object', () => {
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
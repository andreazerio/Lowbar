const path = require('path');
const expect = require('chai').expect;
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
    it('returns the first n elements of the array', () => {
        expect(_.first([1,2,3])).to.equal(1);
        expect(_.first([1,2,3],2)).to.eql([1,2]);
    });
    it('returns the first n elements of a string', () => {
        expect(_.first('hello'), 1).to.eql('h');
    });
    it('returns undefined if passed the wrong arguments', () => {
        expect(_.first()).to.eql(undefined);
        expect(_.first(12)).to.eql(undefined);
        expect(_.first(true)).to.eql(undefined);
        expect(_.first([])).to.eql(undefined);
    });
});
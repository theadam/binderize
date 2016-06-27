import { expect } from 'chai';


import {
  bindFirst
} from '../src/index'
import {
  promise,
  on,
  maybe,
  map
} from '../src/modifiers'

describe('modifiers', () => {
  const add = function(x, y) {
    return x + y;
  };

  describe('on', () => {
    const addField = on('field')::bindFirst(add);

    it('applies the applier to a field on the payload', () => {
      expect({field: 1}::addField(2)).to.deep.equal({field: 3});
    });
  });

  describe('promise', () => {
    const addPromise = promise::bindFirst(add);

    it('applies the applier to a promise', () => {
      return Promise.resolve(1)::addPromise(2).then(v => {
        expect(v).to.equal(3);
      });
    });
  });

  describe('maybe', () => {
    const addMay = maybe::bindFirst(add);

    it('applies the applier to a payload that exists', () => {
      expect((1)::addMay(2)).to.equal(3);
    });

    it('does not apply the applier to an undefined payload', () => {
      expect((undefined)::addMay(2)).to.equal(undefined);
    });

    it('does not apply the applier to a null payload', () => {
      expect((null)::addMay(2)).to.equal(null);
    });
  });

  describe('map', () => {
      const addMap = map::bindFirst(add);

    it('amps the applier over the paylod', () => {
      expect([1, 2, 3]::addMap(2)).to.deep.equal([3, 4, 5]);
    });
  });
});

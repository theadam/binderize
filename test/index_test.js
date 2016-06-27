import { expect } from 'chai';
import {
  apply,
  applyN,
  applyFirst,
  applyLast,
  bind,
  bindFirst,
  bindLast,
  bindN } from '../src/index.js';

describe('binderize', () => {
  describe('apply', () => {
    it('passes this to args', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([1]);
      };
      apply.call(1, fn, 2, 3);
    });
  });

  describe('applyFirst', () => {
    it('passes this as the first arg, with the rest after', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([1, 2, 3]);
      };
      applyFirst.call(1, fn, 2, 3);
    });
  });

  describe('applyLast', () => {
    it('passes this as the last arg, with the rest before', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([2, 3, 1]);
      };
      applyLast.call(1, fn, 2, 3);
    });
  });

  describe('applyN', () => {
    it('passes this as the Nth arg, even with no args', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([undefined, undefined, undefined, 1]);
      };
      const n = 3;
      applyN.call(1, n, fn);
    });

    it('passes this as the Nth arg, with args around it', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([4, 5, 1, 6, 7, 8]);
      };
      const n = 2;
      applyN.call(1, n, fn, 4, 5, 6, 7, 8);
    });
  });

  describe('bind', () => {
    it('passes this to args', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([1]);
      };
      (1)::(bind(fn))(2, 3);
    });
  });

  describe('bindFirst', () => {
    it('passes this as the first arg, with the rest after', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([1, 2, 3]);
      };
      (1)::(bindFirst(fn))(2, 3);
    });
  });

  describe('bindLast', () => {
    it('passes this as the last arg, with the rest before', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([2, 3, 1]);
      };
      (1)::(bindLast(fn))(2, 3);
    });
  });

  describe('bindN', () => {
    it('passes this as the Nth arg, even with no args', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([undefined, undefined, undefined, 1]);
      };
      const n = 3;
      (1)::(bindN(n, fn))();
    });

    it('passes this as the Nth arg, with args around it', () => {
      const fn = (...args) => {
        expect(args).to.deep.equal([4, 5, 1, 6, 7, 8]);
      };
      const n = 2;
      (1)::(bindN(n, fn))(4, 5, 6, 7, 8);
    });
  });
});

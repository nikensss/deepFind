import { expect } from 'chai';
import deepFind from '../src/index.js';

describe('DeepFind test', function () {
  it('should find in first level', () => {
    const o = {
      a: 'a'
    };

    expect(deepFind(o, 'a')).to.equal(o.a);
  });

  it('should find in second level', () => {
    const o = {
      b: {
        a: 'a'
      }
    };

    expect(deepFind(o, 'a')).to.equal(o.b.a);
  });

  it('should find in third level', () => {
    const o = {
      c: {
        b: {
          a: 'a'
        }
      }
    };

    expect(deepFind(o, 'a')).to.equal(o.c.b.a);
  });

  it('should find only one', () => {
    const o = {
      a: 'a',
      c: {
        b: {
          a: 'cba'
        }
      }
    };

    expect(deepFind(o, 'a')).to.equal(o.a);
    expect(deepFind(o, 'a')).to.not.equal(o.c.b.a);
  });

  it('should throw', () => {
    const o = {
      c: {
        b: {}
      }
    };

    expect(() => deepFind(o, 'a')).to.throw('No such property: a');
  });
});

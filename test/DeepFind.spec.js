import { expect } from 'chai';
import { deepFind } from '../src/index.js';

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
        a: 'ba'
      }
    };

    expect(deepFind(o, 'a')).to.equal(o.b.a);
  });

  it('should find in third level', () => {
    const o = {
      c: {
        b: {
          a: 'cba'
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

  it('should throw No Such Property', () => {
    const o = {
      c: {
        b: {}
      }
    };

    expect(() => deepFind(o, 'a')).to.throw('No such property: a');
    expect(() => deepFind({}, 'a')).to.throw('No such property: a');
    expect(() => deepFind([], 'a')).to.throw('No such property: a');
  });

  it('should throw TypeError', () => {
    expect(() => deepFind(null, 'a')).to.throw('Expected object');
    expect(() => deepFind(undefined, 'a')).to.throw('Expected object');
    expect(() => deepFind('a', 'a')).to.throw('Expected object');
    expect(() => deepFind(1, 'a')).to.throw('Expected object');
  });

  it('should not find because of depth limit', () => {
    let o = {
      a: 'a'
    };
    expect(() => deepFind(o, 'a', -1)).to.throw('No such property: a');
    expect(() => deepFind(o, 'a', 0)).to.not.throw('No such property: a');

    o = {
      b: {
        a: 'ba'
      }
    };
    expect(() => deepFind(o, 'a', 0)).to.throw('No such property: a');
    expect(() => deepFind(o, 'a', 1)).to.not.throw('No such property: a');

    o = {
      c: {
        b: {
          a: 'cba'
        }
      }
    };
    expect(() => deepFind(o, 'a', 1)).to.throw('No such property: a');
    expect(() => deepFind(o, 'a', 2)).to.not.throw('No such property: a');
  });
});

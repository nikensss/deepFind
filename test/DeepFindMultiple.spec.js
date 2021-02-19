import { expect } from 'chai';
import { deepFindAll } from '../src/index.js';

describe('DeepFindAll test', function () {
  it('should find in first level', () => {
    const o = {
      a: 'a'
    };

    expect(deepFindAll(o, 'a')).to.deep.equal([o.a]);
  });

  it('should find in second level', () => {
    const o = {
      a: 'a',
      b: {
        a: 'ba'
      }
    };

    expect(deepFindAll(o, 'a')).to.deep.equal([o.a, o.b.a]);
  });

  it('should find in third level', () => {
    const o = {
      a: 'a',
      c: {
        a: 'ca',
        b: {
          a: 'cba',
          t: {
            s: null
          }
        }
      }
    };

    expect(deepFindAll(o, 'a')).to.deep.equal([o.a, o.c.a, o.c.b.a]);
  });

  it('should find limited amount because of depth', () => {
    const o = {
      a: 'a',
      c: {
        a: 'ca',
        b: {
          a: 'cba',
          t: {
            s: null
          }
        }
      }
    };

    expect(deepFindAll(o, 'a', 1)).to.deep.equal([o.a, o.c.a]);
    expect(deepFindAll(o, 'a', 2)).to.deep.equal([o.a, o.c.a, o.c.b.a]);
    expect(deepFindAll(o, 'a', 3)).to.deep.equal([o.a, o.c.a, o.c.b.a]);
  });

  it('should not throw', () => {
    const o = {
      c: {}
    };

    expect(() => deepFindAll(o, 'a')).to.not.throw('No such property: a');
    expect(() => deepFindAll({}, 'a')).to.not.throw('No such property: a');
    expect(() => deepFindAll([], 'a')).to.not.throw('No such property: a');
  });

  it('should throw TypeError', () => {
    expect(() => deepFindAll(null, 'a')).to.throw('Expected object');
    expect(() => deepFindAll(undefined, 'a')).to.throw('Expected object');
    expect(() => deepFindAll('a', 'a')).to.throw('Expected object');
    expect(() => deepFindAll(1, 'a')).to.throw('Expected object');
  });
});

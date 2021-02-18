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
          a: 'cba'
        }
      }
    };

    expect(deepFindAll(o, 'a')).to.deep.equal([o.a, o.c.a, o.c.b.a]);
  });

  it('should find throw exception', () => {
    const o = {
      c: {}
    };

    expect(() => deepFindAll(o, 'a')).to.throw('No such property: a');
  });
});

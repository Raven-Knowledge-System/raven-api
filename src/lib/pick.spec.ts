import { pick } from './pick';

describe('pick function tests', () => {
  const testObj = {
    name: 'Test Object',
    id: 1,
    active: true,
    details: {
      nested: true,
    },
    tags: ['test', 'pick'],
  };

  test('Basic Functionality Test', () => {
    const result = pick(testObj, ['name']);
    expect(result).toEqual({ name: 'Test Object' });
  });

  test('Multiple Keys Test', () => {
    const result = pick(testObj, ['id', 'active']);
    expect(result).toEqual({ id: 1, active: true });
  });

  test('No Keys Test', () => {
    const result = pick(testObj, []);
    expect(result).toEqual({});
  });

  test('Invalid Keys Test', () => {
    // @ts-expect-error invalid key type expected
    const result = pick(testObj, ['nonexistentKey']);
    expect(result).toEqual({});
  });

  test('All Keys Test', () => {
    const result = pick(testObj, ['name', 'id', 'active', 'details', 'tags']);
    expect(result).toEqual(testObj);
  });
});

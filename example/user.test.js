// user.test.js
import { jest } from '@jest/globals';

// Mock the module before importing the dependent module
await jest.unstable_mockModule('./api.js', () => ({
  fetchUser: jest.fn(),
}));

// Import after mocking
const { fetchUser } = await import('./api.js');
const { getUserName } = await import('./user.js');

test('mock module function', () => {
  fetchUser.mockReturnValue({ id: 1, name: 'Bob' });

  const name = getUserName(1);

  expect(name).toBe('Bob');
  expect(fetchUser).toHaveBeenCalledWith(1);
});
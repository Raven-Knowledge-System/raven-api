module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  moduleDirectories: ['src', 'node_modules'],
  testEnvironment: 'node',
  testRegex: '.(spec).ts$',
  testTimeout: 20000,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  silent: true,
};

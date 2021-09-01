/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: '@react-native-community',
  globals: {
    Blob: false,
    JSX: false,
  },
  rules: {
    'react-native/no-inline-styles': 0,
  },
};

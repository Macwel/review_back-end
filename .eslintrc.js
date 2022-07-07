module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'no-param-reassign': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['error'],
    'prettier/prettier': 'error',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    'no-useless-catch': 'off',
    'no-plusplus': 'off',
    'no-throw-literal': 'off',
    "@typescript-eslint/no-throw-literal": 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};

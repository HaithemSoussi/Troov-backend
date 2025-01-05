export default {
    env: {
      node: true,
      es2021: true,
      module: true,
    },
    globals: {
      process: true, // Explicitly define 'process' as a global variable
      module: 'readonly', // Explicitly define 'module' as a global variable
    },
    extends: [
      'eslint:recommended',
      'plugin:node/recommended',
      'plugin:prettier/recommended', // Add Prettier config
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'node/no-missing-require': 'error',
      'node/no-unpublished-require': 'warn',
      'no-debugger': 'warn',
      'no-undef': 'error',
    },
  };  
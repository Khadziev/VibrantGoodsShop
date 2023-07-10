module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    indent: ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'comma-spacing': 'error',
    'space-before-function-paren': ['error', 'always'],
  },
  overrides: [
    {
      files: ['.js', '.jsx', '.ts', 'tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },

  globals: {
    process: 'readonly',
  },

  ignorePatterns: ['node_modules/', 'dist/'],
};

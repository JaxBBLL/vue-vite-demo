/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [0],
    quotes: [0],
    'prefer-const': [0],
    'no-undef': [0],
    'no-var': [0],
    'no-useless-escape': [0],
    'vue/multi-word-component-names': [0],
    'vue/no-mutating-props': [0],
    '@typescript-eslint/no-unused-vars': [0],
    '@typescript-eslint/no-this-alias': [0],
    '@typescript-eslint/no-empty-function': [0],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
  },
}

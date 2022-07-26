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
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    semi: [0],
    quotes: [0],
    'no-undef': [0],
    'vue/multi-word-component-names': [0],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
  },
}

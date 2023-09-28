/* eslint-env node */

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
    },
    'postcss-import': {},
    'postcss-custom-properties': {},
    autoprefixer: {},
  },
};

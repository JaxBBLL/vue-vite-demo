/* eslint-env node */

module.exports = {
  plugins: {
    /* 开启这个可以将px转为rem, 根据需要是否开启 */
    // 'postcss-pxtorem': {
    //   rootValue: 16,
    //   propList: ['*']
    // },
    'postcss-import': {},
    'postcss-custom-properties': {},
    autoprefixer: {}
  }
};

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
module.exports = function (api, options = {}) {
  if (api) {
    api.cache.never();
  }
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          loose: options.loose, // 这个选项设置为true时，它会尽可能的将ES6+代码转化为ES5标准代码，而非用ES5去实现的ES6+代码，最核心的体现就是class语法的实现。在ES5中，我们通过SomeFunction.prototype.someMethod来创建原型链方法，而在ES6中它的实现完全不同。当loose为true时，preset-env将class语法转化为原型链的实现方式。
          'useBuiltIns': 'usage',
          'corejs': 3
        },
      ],
      require.resolve('@babel/preset-typescript'),
      require('./babel-preset-vue-ts'),
    ],
    plugins: [
      [
        require.resolve('@vue/babel-plugin-jsx'),
        {
          enableObjectSlots: options.enableObjectSlots,
        },
      ],
    ],
  };
};
exports.default = module.exports;

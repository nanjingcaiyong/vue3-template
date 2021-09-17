1、package.json
- type            // .mjs 以ESM模块加载，.cjs 以commonjs模块加载，.js模块加载取决于package.json中type
  + "module"      // ESM
  + "commonjs"    // commonjs

2、npm i vue-loader@next @vue/compiler-sfc -D
```js
{
  entry: '',
  resolve: {
    alias: {
      'vue': '@vue/runtime-dom',
    }
  },
}
```

3、webpack.config.js中需要实例化vue-loader

4、@babel/preset-typescript让babel-loader 支持 babel处理typescript

5、@babel/plugin-transform-flow-strip-types // 解决vue中使用ts的问题(interface 报错)

6、@babel/plugin-syntax-class-properties // 解决vue中使用ts的问题(as 报错)

7、npm install stylelint stylelint-order
> stylelint-order 属性上下顺序

8、eslint --fix --ext .js,.vue src
> --ext 告诉ESLint哪个文件扩展名要检测的唯一方法是使用--ext命令选项指定一个逗号分隔的扩展名列表

9、npm i @types/webpack-env -D 
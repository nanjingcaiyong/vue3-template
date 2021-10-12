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

打包进度
```bash
npm install webpackbar -D
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

husky
```bash
npx husky-init && npm install 

npx husky-init

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```


提交格式
```text
<type>(<scope>): <subject>
换行
<body>
换行
<footer>
```
- Header 包括三个字段：type（必填）、scope（选填）和 subject（必填）'
- scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2,'always',
      [
        'feat', // 新功能
        'fix', // 修补bug
        'css', // 修改样式
        'style', // 代码格式修改（空白，格式，缺少分号等），不影响代码含义的更改
        'perf', // 改进性能的代码更改
        'ci', // 对CI配置文件和脚本的更改
        'docs', // 文档（documentation）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
        'merge' // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
      ]
    ]
  }
};
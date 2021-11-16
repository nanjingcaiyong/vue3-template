var gitBranchIs = require('git-branch-is');
var shell = require('shelljs');
gitBranchIs('test').then((res) => {
  res && shell.exec('npx standard-version');
});
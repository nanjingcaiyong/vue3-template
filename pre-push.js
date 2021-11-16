var gitBranchIs = require('git-branch-is');
var shell = require('shelljs');

gitBranchIs('main').then(() => {
  shell.exec('npx standard-version');
});
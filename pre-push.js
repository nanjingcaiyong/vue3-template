var gitBranchIs = require('git-branch-is');
var shell = require('shelljs');

gitBranchIs('test').then(() => {
  shell.echo('npx standard-version');
});
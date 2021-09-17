var gitBranchIs = require('git-branch-is');
var shell = require('shelljs');

gitBranchIs('master').then(() => {
  shell.echo('npx standard-version');
});
const fn = require('funclib');
const path = require('path');
const root = path.resolve('../');
const zjsonPath = path.join(root, 'server/zjson');
const distPath = path.join(root, 'client/dist');

console.log('');
fn.progress.start('Moving Files');
fn.rm(zjsonPath);
fn.mv(distPath, zjsonPath);
fn.progress.stop(() => fn.log('Update zjson Success!'));
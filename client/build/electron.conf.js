const fn = require('funclib');
const glob = require('glob');

fn.progress.start('Electron config', {type: 'spi'});
fn.rm('build/package');

const styles = glob.sync('dist/*.css');
const files = glob.sync('dist/*.js').concat(styles);
files.forEach(fp => fn.mv(fp, fp.replace(/\..*\./, '\.')));

fn.mv('dist/main.js', 'dist/zjson.js')
fn.cp('electron/', 'dist/');
fn.progress.stop();
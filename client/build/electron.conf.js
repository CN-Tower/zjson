const fn = require('funclib');
const glob = require('glob');

let indexHtml = fn.rd('electron-app/index.html');
if (process.argv[2] === 'package') {
  indexHtml = indexHtml.replace(/\/\*\*\/\d\/\*\*\//mg, '/**/2/**/');
} else {
  indexHtml = indexHtml.replace(/\/\*\*\/\d\/\*\*\//mg, '/**/1/**/');
}
fn.wt('electron-app/index.html', indexHtml);

fn.progress.start('Electron config', {type: 'spi'});
fn.rm('build/package');

const styles = glob.sync('dist/*.css');
const files = glob.sync('dist/*.js').concat(styles);
files.forEach(fp => fn.mv(fp, fp.replace(/\..*\./, '\.')));

fn.mv('dist/main.js', 'dist/zjson.js')
fn.cp('electron-app/', 'dist/', true);
fn.progress.stop();
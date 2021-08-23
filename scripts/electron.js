const fn = require('funclib');
const glob = require('glob');
const pkg = require('../electron-app/package.json');

fn.progress.start('Electron config', {type: 'spi'});

let indexHtml = fn.rd('electron-app/index.html');
if (process.argv[2] === 'package') {
  fn.rm('package');
  indexHtml = indexHtml.replace(/\/\*\*\/\d\/\*\*\//mg, '/**/2/**/');
} else {
  indexHtml = indexHtml.replace(/\/\*\*\/\d\/\*\*\//mg, '/**/1/**/');
}
fn.wt('electron-app/index.html', indexHtml);

const styles = glob.sync('dist/*.css');
const files = glob.sync('dist/*.js').concat(styles);
files.forEach(fp => {
  if (fp.includes('dist/scripts.')) {
    fn.rm (fp);
  } else {
    fn.mv(fp, fp.replace(/\..*\./, '\.'));
  }
});

fn.rm('dist/3rdpartylicenses.txt');
fn.mv('dist/main.js', 'dist/zjson.js')
pkg.files.forEach(file => fn.cp(`electron-app/${file}`, `dist/${file}`));

fn.progress.stop();

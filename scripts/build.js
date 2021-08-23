const fs = require('fs');
const fn = require('funclib');
const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const buildPath = path.join(rootPath, 'build');

if (fs.existsSync(buildPath)) {
    fn.rm(buildPath);
}
fn.timeout(500, () => {
    fn.cp(path.join(rootPath, 'dist'), buildPath, true);
    fn.log(`构建成功，预览页面运行：${fn.chalk('npm run preview', 'green')}`, '#zjson');
});

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const tmpDist= __dirname.split(path.sep);
tmpDist.splice(tmpDist.length-2, 2);
const root = path.join(tmpDist.join('/'));
const dist = path.join(root, 'client/dist');
const pxjson = path.join(root, 'server/pxjson');
const mvDist = () => setTimeout(() => fs.renameSync(dist, pxjson), 1000);

/win/.test(process.platform)
    ? exec(`rd /s /q ${pxjson}`, () => mvDist())
    : exec(`rm -rf ${pxjson}`, () => mvDist())

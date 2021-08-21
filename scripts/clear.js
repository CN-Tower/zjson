const fn = require('funclib');
const glob = require('glob');
const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const programType = process.argv[2];
let pattern = programType === 'all' ? '*(*.exe|*.dmg)' : `*.${programType}`;
const programs = glob.sync(path.join(rootPath, pattern));

programs.forEach(pg => fn.rm(pg));
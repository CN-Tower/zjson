const fn = require('funclib');
const glob = require('glob');

const programType = process.argv[2];

glob(`*.${programType}`, (_, pgs) => fn.rm(pgs));
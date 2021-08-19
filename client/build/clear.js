const fn = require('funclib');
const glob = require('glob');

glob('*(*.dmg|*.smi|*.exe)', (_, pgs) => {
    fn.rm(pgs);
});
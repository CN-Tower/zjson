const fn = require('funclib');
const glob = require('glob');

const programType = process.argv[2];

if (programType === 'dmg') {
    glob('*.dmg', (_, pgs) => fn.rm(pgs));
} else if (programType === 'exe') {
    glob('*.exe', (_, pgs) => fn.rm(pgs));
} else if (programType === 'msi') {
    glob('*.msi', (_, pgs) => fn.rm(pgs));
}

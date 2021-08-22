const path = require('path');
const glob = require('glob');
const webpack = require('webpack5.51.1/lib/webpack');

const rootPath = path.resolve(__dirname, '../');
const appPath = path.join(rootPath, 'electron-app');

const entry = {};
const packages = glob.sync(path.join(appPath, 'npm-packages/*.js'));
packages.forEach(package => {
  const { name } = path.parse(package);
  entry[name] = package;
});

webpack({
  entry,
  output: {
    path: path.join(rootPath, 'dist/node_modules'),
    filename: '[name]/index.js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  mode: 'production',
}, (err, stats) => {
  if (err) throw err;
});

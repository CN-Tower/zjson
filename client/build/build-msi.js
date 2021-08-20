const fn = require('funclib');
const path = require('path');
const { MSICreator } = require('electron-wix-msi');
const pkg = require('../package.json');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'build/package/zjson-win32-x64');
const pkgName = `zjson-win32-x64-v${pkg.version}`;

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: srcPath,
  description: 'A powerful json formate tool!',
  exe: pkgName,
  name: pkgName,
  manufacturer: 'CN-Tower',
  version: pkg.version,
  outputDirectory: rootPath,
  images: {
    exclamationIcon: path.join(srcPath, 'resources/app/zjson.ico'),
    infoIcon: path.join(srcPath, 'resources/app/zjson.ico'),
  }
});

(async () => {
  try {
    // Step 2: Create a .wxs template file
    const supportBinaries = await msiCreator.create();

    // 🆕 Step 2a: optionally sign support binaries if you
    // sign you binaries as part of of your packaging script
    supportBinaries.forEach(async (binary) => {
      // Binaries are the new stub executable and optionally
      // the Squirrel auto updater.
      await signFile(binary);
    });
    
    // Step 3: Compile the template to a .msi file
    await msiCreator.compile();
    
  } catch(e) {
    console.error(e);
  }
})();

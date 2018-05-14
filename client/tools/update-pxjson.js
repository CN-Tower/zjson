const fs = require('fs');
const glob = require('glob');
const path = require('path');
const exec = require('child_process').exec;
let tarDir = 'server/pxjson';


updatePxjson();

function updatePxjson() {
    const tmpDist= __dirname.split(path.sep);
    tmpDist.splice(tmpDist.length-2, 2);
    const root = path.join(tmpDist.join('/'));
    const pxjsonNewDir = path.join(root, 'client/dist');
    const pxjsonSubFis = glob.sync(path.join(pxjsonNewDir, '**/*'));
    const pxjsonOldDir = path.join(root, tarDir);

    console.log('\Moving files ...\n');
    deleteDirectory(pxjsonOldDir);
    fs.mkdirSync(pxjsonOldDir);
    copyDirectory(pxjsonSubFis);
    deleteDirectory(pxjsonNewDir);
    console.log('\nCongratulations, Update Succeed!');

}

function deleteDirectory(dir) {
    if( fs.existsSync(dir) ) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const subFile = path.join(dir, file);
            if (fs.statSync(subFile).isDirectory()) {
                deleteDirectory(subFile);
            } else {
                console.log('Del: ' + subFile);
                fs.unlinkSync(subFile);
            }
        });
        console.log('Del: ' + dir);
        fs.rmdirSync(dir);
    }
};

function copyDirectory(files) {
    files.forEach(file => {
        const target = path.join(file.replace(/client[\\\/]dist/, tarDir));
        console.log('Mv: ' + target);
        if (fs.statSync(file).isDirectory()) {
            fs.mkdirSync(target);
        } else {
            fs.createReadStream(file).pipe(fs.createWriteStream(target));
        }
    });
}


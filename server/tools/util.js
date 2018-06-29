const fn = require('funclib');

module.exports = {
    logErr: logErr
}

function logErr(err, tit) {
    if (err) {
        fn.log(err, tit || 'Error:');
    }
}


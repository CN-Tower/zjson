const fn = require('funclib');

module.exports = {
    logErr: logErr
}

function logErr(err, tit, res) {
    if (err) {
        fn.log(err, tit || 'Error:');
        if (res) res.status(400).send({'errorMsg': err.message});
    }
}


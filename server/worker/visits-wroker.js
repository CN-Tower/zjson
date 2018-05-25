var fs = require('fs');
var fn = require('funclib');
var visits;
var users = [];

function getAndSetVisits(userId, onEnd) {
    let user = users.filter(user => user.userId === userId);
    if (!visits || user.length === 0 || fn.time() - user[0].vtTime > 300000) {
        const newId = addUser();
        doGetAndSet();
        onEnd(visits, newId);
    }
    onEnd(visits, null);
}

function doGetAndSet() {
    visits = parseInt(fs.readFileSync('./visit-count.txt', 'utf8'));
    console.log('GET-visits: Current visits is: ' + visits);
    fs.writeFileSync('./visit-count.txt', ++ visits);
    console.log('SET-visits: Current visits now is: ' + visits);
}

function addUser() {
    const userId = 'ZJSON-' + fn.gnid();
    const vtTime = fn.time();
    users.push({userId: userId, vtTime: vtTime});
    setTimeout(function () {
        users = users.filter(user => user.userId !== userId);
    }, 300000);
    return userId;
}

module.exports = {
    getAndSetVisits: getAndSetVisits
}

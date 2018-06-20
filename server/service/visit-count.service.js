var fn = require('funclib');
const vsPath = './version.txt';
const vcPath = './visit-count.txt';
let userList = [];

function getVersion() {
    return fn.rd(vsPath);
}

function addUser() {
    const userId = 'ZJSON-' + fn.rdid();
    const vtTime = fn.timeStamp();
    const newUser = {userId: userId, vtTime: vtTime};
    userList.push(newUser);
    fn.timeout(300000, function () {
        userList = userList.filter(user => user.userId !== userId);
    });
    return newUser;
}

function getUser(userId) {
    const user = userList.filter(user => user.userId === userId);
    return user[0] || null;
}

function getVisitCount() {
    return parseInt(fn.rd(vcPath));
}

function addVisitCount() {
    let vc = parseInt(fn.rd(vcPath));
    fn.wt(vcPath, ++ vc);
}

module.exports = {
    getVersion: getVersion,
    addUser: addUser,
    getUser: getUser,
    getVisitCount: getVisitCount,
    addVisitCount: addVisitCount
}

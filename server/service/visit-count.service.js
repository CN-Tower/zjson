var fn = require('funclib');
const vcPath = './visit-count.txt';
let userList = [];

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
    return parseInt(fn.rd(vcPath, 'utf8'));
}

function addVisitCount() {
    let vc = parseInt(fn.rd(vcPath, 'utf8'));
    fn.wt(vcPath, ++ vc);
}

module.exports = {
    addUser: addUser,
    getUser: getUser,
    getVisitCount: getVisitCount,
    addVisitCount: addVisitCount
}

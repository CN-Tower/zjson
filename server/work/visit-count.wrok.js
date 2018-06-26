var fn = require('funclib');
const vsPath = './version.txt';
const vcPath = './visit-count.txt';
let userList = [];

module.exports = {
    getVersion: getVersion,
    pollingVc: pollingVc,
    refreshVc: refreshVc,
    getOnline: getOnline,
    getUser: getUser
}

/**
 * 获取版本号
 * ------------------------------------------------------------
 */
function getVersion() {
    return fn.rd(vsPath);
}

/**
 * 获取在线人数
 * ------------------------------------------------------------
 */
function getOnline() {
    return userList.length;
}

/**
 * 获取用户信息
 * ------------------------------------------------------------
 */
function getUser(userId) {
    const user = userList.filter(user => user.userId === userId);
    return user[0] || null;
}

/**
 * 轮询访问量
 * ------------------------------------------------------------
 */
function pollingVc(userId) {
    const user = getUser(userId);
    if (user) {
        _setUserExpireTime(userId);
    }
    return parseInt(fn.rd(vcPath));
}

/**
 * 刷新访问量
 * ------------------------------------------------------------
 */
function refreshVc(userId, isExpire, callBack) {
    const user = getUser(userId);
    if (user) {
        if (isExpire === 'yes' && user.isKeepAc) {
            _addVisitCount();
        }
        callBack(null);
    } else {
        _addVisitCount();
        callBack(_addUser().userId);
    }
}
/* ============================================================ */

function _setUserExpireTime(userId) {
    fn.timeout(userId, 20000, () => {
        userList = userList.filter(user => user.userId !== userId);
    });
}

function _addUser(userId) {
    if (!userId) {
        userId = 'ZJSON-' + fn.rdid();
    }
    const vtTime = fn.timeStamp();
    const newUser = {
        'userId': userId,
        'vtTime': vtTime,
        'isActive': true,
        'isKeepAc': false
    };
    _setUserExpireTime(userId);
    fn.timeout(310000, () => {
        const user = getUser(userId);
        if (user) {
            user.isKeepAc = true;
        }
    });
    userList.push(newUser);
    return newUser;
}

function _addVisitCount() {
    let vc = parseInt(fn.rd(vcPath));
    fn.wt(vcPath, ++ vc);
}

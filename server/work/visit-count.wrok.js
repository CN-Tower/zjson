const fn = require('funclib');
const VcModel = require('../dao/models/visitCount.model');

module.exports = {
    pollingVc: pollingVc,
    refreshVc: refreshVc,
    getOnline: getOnline,
    getUser: getUser
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
function pollingVc(userId, callback) {
    const user = getUser(userId);
    if (user) {
        _setUserExpireTime(userId);
    } else if (/^ZJSON-[0-9A-Z]{12}$/.test(userId)) {
        userList.push({
            'userId': userId,
            'vtTime': fn.timeStamp(),
            'isActive': true,
            'isKeepAc': true
        });
        _setUserExpireTime(userId);
    }
    VcModel.getVisitCount(vc => callback(vc));
}

/**
 * 刷新访问量
 * ------------------------------------------------------------
 */
function refreshVc(userId, isExpire, callback) {
    const user = getUser(userId);
    if (user) {
        if (isExpire === 'yes' && user.isKeepAc) {
            VcModel.addOneVisit();
        }
        callback(null);
    } else {
        VcModel.addOneVisit();
        callback(_addUser().userId);
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

var fs = require('fs');
var fn = require('funclib');
var vcService = require('../service/visit-count.service');

function refreshVisitCount(userId, callBack) {
    if (!vcService.getUser(userId)) {
        vcService.addVisitCount();
        callBack(vcService.addUser().userId);
    } else {
        callBack(null);
    }
}

module.exports = {
    refreshVisitCount: refreshVisitCount
}

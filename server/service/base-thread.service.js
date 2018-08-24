const fn = require('funclib');
const sjService = require('./shared-json.service');

module.exports = {
  start: function () {
    fn.interval('remove_Expired_SJ', 600000, () => sjService.removeExpireJson())
  }
}

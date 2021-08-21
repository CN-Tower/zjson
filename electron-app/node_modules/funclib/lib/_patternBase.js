var typeOf = require('./typeOf');
var getPattern = require('./getPattern');

/**@function*/

/**
 * Basic methods of patterns match.
 */
function patternBase(srcStr, types, isTest) {
  var limit = true
    , ttRst =false
    , mtRst = null;
  if (types.length && typeOf(types[types.length - 1], 'bol')) {
    limit = types.pop();
  }
  for (var i = 0; i < types.length; i++) {
    var pattern = getPattern(types[i], limit);
    if (pattern) {
      isTest
        ? ttRst = pattern.test(srcStr)
        : mtRst = srcStr.match(pattern);
      if (ttRst || mtRst) break;
    }
  }
  return isTest ? ttRst : mtRst;
}

/**@function*/
module.exports = patternBase;
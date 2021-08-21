/**@function*/

/**
 * Throw error method.
 */
function throwErr(type_) {
  switch(type_) {
    case 'arg': throw new TypeError('Arguments type error!');
    case 'obj': throw new TypeError('Expect an Object param!');
    case 'fun': throw new TypeError('Expect a Function param!');
    case 'reg': throw new TypeError('Expect a RegExp pattern!');
  }
}

/**@function*/
module.exports = throwErr;
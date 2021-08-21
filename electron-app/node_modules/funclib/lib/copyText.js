var isUdf = require('./isUdf');

/**@function*/

/**
 * [fn.copyText] 复制文本到粘贴板
 * @param text : string
 */
function copyText(text) {
  if (isUdf(text)) text = '';
  var textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.left = '200%';
  document.body.appendChild(textarea);
  textarea.value = text;
  textarea.select();
  document.execCommand('Copy');
  document.body.removeChild(textarea);
}

/**@function*/
module.exports = copyText;
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');
const shell = electron.shell;

window.onLinksLoad = function onLinksLoad() {
  const $links = $('.links');
  $links.each(function() {
    const $this = $(this);
    const href = $this.attr('href');
    $this.attr('href', 'javascript:;').click(() => {
      shell.openExternal(href);
    });
  });
};

window.onLinksLoad();

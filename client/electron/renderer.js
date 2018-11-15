const { shell } = require('electron');
const fetch = require('node-fetch');
const package = require('./package.json');

const prefix = 'https://www.zjson.net'

/**
 * 在浏览器中打开链接
 * =========================================================*/
window.openUrl = url => shell.openExternal(url);

/**
 * 更改页面链接的跳转方式
 * =========================================================*/
window.onLinksLoad = () => {
  const $links = $('.links');
  $links.each(function () {
    const $this = $(this);
    const href = $this.attr('href');
    $this.attr('href', 'javascript:;').click(() => {
      shell.openExternal(href);
    });
  });
};
fn.defer(() => window.onLinksLoad());

/**
 * 检测App版本
 * =========================================================*/
window.checkAppVersion = () => {
  return fetch(`${prefix}/api/zjson/appVersion`)
  .then(res => res.json())
  .then(res => {
    res.localVersion = package.version;
    return res;
  });
};

/**
 * 轮询访问量
 * =========================================================*/
window.pollingVisitCount = (userId, isOnInit) => {
  const url = `${prefix}/api/pollingVc/${userId}?isOnInit=${isOnInit ? 'yes' : 'no'}`
  return fetch(url).then(res => res.json());
};

/**
 * 请求分享json
 * =========================================================*/
window.shareFormated = (sharedJson, userId) => {
  return fetch(`${prefix}/api/sharedJson`, {
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      sharedJson: sharedJson
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json());
}

/**
 * 获取分享的json
 * =========================================================*/
window.getSharedJson = sharedId => {
  return fetch(`${prefix}/api/sharedJson/${sharedId}`).then(res => res.json());
}

// ipcRenderer.on('refresh', function(event, message) {
//   window.location.reload();
// });

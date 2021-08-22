const { ipcRenderer, shell } = require('electron');
const fetch = require('node-fetch');
const package = require('./package.json');

const prefix = 'https://www.zjson.net';

window.electronUtils = {
  /**
   * 是大化和最小化窗口
   * =========================================================*/
  minWindow() {
    ipcRenderer.send('minWindow', 1);
  },

  // 窗口最大化
  maxWindow() {
    ipcRenderer.send('maxWindow', 1);
  },
  
  /**
   * 在浏览器中打开链接
   * =========================================================*/
  openUrl() {
    shell.openExternal(url);
  },
  
  /**
   * 更改页面链接的跳转方式
   * =========================================================*/
  onLinksLoad() {
    const $links = $('.links');
    $links.each(function () {
      const $this = $(this);
      const href = $this.attr('href');
      $this.attr('href', 'javascript:;').click(() => {
        shell.openExternal(href);
      });
    });
  },
  
  /**
   * 检测App版本
   * =========================================================*/
  checkAppVersion() {
    return fetch(`${prefix}/api/zjson/appVersion`)
    .then(res => res.json())
    .then(res => {
      res.localVersion = package.version;
      return res;
    });
  },
  
  /**
   * 轮询访问量
   * =========================================================*/
  pollingVisitCount(userId, isOnInit) {
    const url = `${prefix}/api/pollingVc/${userId}?isOnInit=${isOnInit ? 'yes' : 'no'}`
    return fetch(url).then(res => res.json());
  },
  
  /**
   * 请求分享json
   * =========================================================*/
  shareFormated(sharedJson, userId) {
    return fetch(`${prefix}/api/sharedJson`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        sharedJson: sharedJson
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json());
  },
  
  /**
   * 获取分享的json
   * =========================================================*/
  getSharedJson(sharedId) {
    return fetch(`${prefix}/api/sharedJson/${sharedId}`).then(res => res.json());
  },
}

// ipcRenderer.on('refresh', function(event, message) {
//   window.location.reload();
// });

fn.defer(() => window.electronUtils.onLinksLoad());

const { shell } = require('electron');
const http = require('http');
const package = require('./package.json');

/**
 * 设置请求地址
 * =========================================================*/
const urlList = {
  0: 'www.zjson.net',
  1: '127.0.0.1:3000',
  2: '10.63.244.252:8888'
};
const requestUrl = urlList[ 0 ];

window.openUrl = url => shell.openExternal(url);
/**
 * 更改页面A标签的跳转方式
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
 * 轮询访问量
 * =========================================================*/
window.pollingVisitCount = (userId, isOnInit, success, error) => {
  const options = {
    path: `/api/pollingVc/${userId}?isOnInit=${isOnInit ? 'yes' : 'no'}`
  };
  request(options, success, error);
};

/**
 * 请求分享json
 * =========================================================*/
window.shareFormated = (sharedJson, userId, success, error) => {
  const options = {
    path: `/api/sharedJson`,
    method: 'POST',
    data: {
      userId: userId,
      sharedJson: sharedJson
    }
  };
  request(options, success, error);
}

/**
 * 获取分享的json
 * =========================================================*/
window.getSharedJson = (sharedId, success, error) => {
  const options = {
    path: `/api/sharedJson/${sharedId}`
  };
  request(options, success, error);
}

/**
 * 发送http请求
 * =========================================================*/
function request(options, success, error) {
  const data = fn.get(options, 'data');
  const method = fn.get(options, 'method') || 'GET';
  const reqUrl = requestUrl.split(':');
  const reqConf = {
    hostname: fn.get(options, 'host') || reqUrl[0],
    port: fn.get(options, 'port') || parseInt(reqUrl[1]),
    path: fn.get(options, 'path'),
    method: method,
    headers: fn.get(options, 'header') || { 'Content-Type': 'application/json; charset=utf-8' }
  };
  const req = http.request(reqConf, res => {
    res.setEncoding('utf8');
    res.on('data', chunk => {
      if (fn.typeOf(success, 'fun')) success(JSON.parse(chunk));
    });
    // fn.log(fn.overlay({}, res, ['statusCode', 'headers']),
    //   `Res: ${reqConf.method} ${reqConf.path}`, false);
  });
  req.on('error', err => {
    if (fn.typeOf(error, 'fun')) error(err);
  });
  if (method === 'POST' && data) req.write(JSON.stringify(data));
  // fn.log(reqConf, `Req: ${reqConf.method} ${reqConf.path}`, false);
  req.end();
}

/**
 * 检测App版本
 * =========================================================*/
window.checkAppVersion = (success, error) => {
  const options = {
    path: `/api/zjson/appVersion`
  };
  request(options, res => {
    res.localVersion = package.version;
    success(res);
  });
};

// ipcRenderer.on('refresh', function(event, message) {
//   window.location.reload();
// });

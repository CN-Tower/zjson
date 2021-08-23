import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { IgnoreInfo, QuoteIdx, AlertInfo } from './@shared';
import 'rxjs/add/operator/map';

export const APP_INFO = {
  version: '5.1.4',
  updateTime: '2021-08-24',
  appUrl: 'https://www.zjson.net',
  downloadUrl: 'https://cntower.oss-cn-shanghai.aliyuncs.com/zjson',
  i18nVersion: '1.0.1',
};

export const APP_THEMES: string[] = [
  'light', 'solarized', 'moonlight', 'blue', 'dark', 'abyss'
  // 'red', 'kimbie'
];

@Injectable()
export class AppService {
  greetings: any = {
    en: [
      'Hello World, How are you ?',
      'Have a nice day !',
      'Nice to meet you again !',
      'You\'ll have good luck !',
      'God bless you !',
      'Wish you receive your expected answer soon !',
      'May happiness be with you forever !',
      'May joy and health be with you always !',
      'Take your passion and make it come true !',
      'Wish all the best wishes for you !'
    ],
    zh: [
      '很高兴再次见到你, 吃了没？',
      '如果用的顺心的话请帮忙推广下哦！',
      '修身齐家治天下，洗脸刷牙写代码！',
      '语言定义世界，代码改变生活！',
      '每天进步一小点，有朝一日成大牛！',
      '程序员有三种美德:懒惰,急躁和傲慢...',
      '程序要像女人的裙子，越短才越好~',
      '学习不用功，注定当码农！'
    ]
  };
  animateClass: any = {
    'in': [
      'bounceIn', 'bounceInLeft', 'bounceInUp', 'fadeIn', 'fadeInLeft',
      'fadeInUp', 'flipInX', 'rotateIn', 'slideInLeft', 'slideInUp', 'rollIn'
    ],
    'out': [
      'bounceOut', 'bounceOutRight', 'bounceOutDown', 'fadeOut', 'fadeOutRight',
      'fadeOutDown', 'flipOutX', 'rotateOut', 'slideOutRight', 'slideOutDown', 'rollOut'
    ]
  };
  defaultHist: {src: string, name: string}[] = [
    {name: 'Py Unicode Collections', src: `{
      u"Python": u"Unicode Demo",
      u"name": u"ZJSON",
      u"content": {
        u"string": u"String",
        u"number": 123,
        u"boolean": True,
        u"none": None,
        u"dict": {
          u"list": [u"List_element_001", u"List_element_001"],
          u"tuple": (u"Tuple_element_001", u"Tuple_element_002")
        }
      }
    }`.replace(/\n\s*/gm, '')},
    {name: '转杰森 | ZJSON', src: `{
      "zjson": "转杰森 | ZJSON",
      "desc": "Online json formatter",
      "description": "一个在线json格式化工具",
      "version": "${APP_INFO.version}",
      "updateTime": "${APP_INFO.updateTime}",
      "url": "http://zjson.net",
      "project": "http://github.com/CN-Tower/zjson",
      "language": ["中文（简体）", "English"],
      "keywords": ["转杰森", "zjson", "json格式化", "json formatter"],
      "content": {
        "array": ["element 001", "element 002"],
        "boolean": true,
        "null": null,
        "number": 123,
        "string": "Hello World",
        "object": {"property": "value", "key": "val"}
      }
    }`.replace(/\n\s*/gm, '')}
  ];

  constructor(private http: Http, private translate: TranslateService) { }

  doTranslate(i18n: any) {
    i18n.confs.show = this.translate.instant('showConfs');
    i18n.confs.hide = this.translate.instant('hideConfs');
    i18n.model.expand = this.translate.instant('expand');
    i18n.model.combine = this.translate.instant('combine');
  }

  translateAltMsgs(i18n: any, alertInfo: AlertInfo) {
    fn.match(alertInfo.type, {
      'ost': () => i18n.alert.ost = this.translate.instant('alert.ost', {
          rowIdx: alertInfo.idx }),
      'col': () => i18n.alert.col = this.translate.instant('alert.col', {
          rowIdx: alertInfo.idx }),
      'val': () => i18n.alert.val = this.translate.instant('alert.val', {
          rowIdx: alertInfo.idx }),
      'scc': () => i18n.alert.scc = this.translate.instant('alert.scc', {
          rowIdx: alertInfo.idx }),
      'war': () => i18n.alert.war = this.translate.instant('alert.war', {
          rowIdx: alertInfo.idx }),
      'end': () => i18n.alert.end = this.translate.instant('alert.end', {
          rowIdx: alertInfo.idx, brc: alertInfo.brc }),
      'err': () => i18n.alert.err = this.translate.instant('alert.err')
    });
  }

  getGreeting(lang: string): string {
    return this.greetings[lang][fn.random(this.greetings[lang].length)];
  }

  getAnimateClass(type: 'in' | 'out') {
    const tpCls = this.animateClass[type];
    return tpCls[fn.random(tpCls.length)];
  }

  getAppLang() {
    return window.localStorage['language'];
  }

  setAppLang(lang: 'zh'|'en') {
    window.localStorage['language'] = lang;
  }

  getIgnoreVersion() {
    return window.localStorage['ignoreVersion'];
  }

  setIgnoreVersion(version: IgnoreInfo) {
    window.localStorage['ignoreVersion'] = version;
  }

  getAppTheme() {
    const storedTheme = window.localStorage['theme'];
    return APP_THEMES.includes(storedTheme) ? storedTheme : 'dark';
  }

  getEditorTheme(theme: string) {
    return fn.match(theme, {
      'dark':      'vs-dark',
      'light':     'vs',
      'blue':      'blue',
      'abyss':     'abyss',
      'solarized': 'solarized-light',
      'moonlight': 'solarized-dark',
      'default': () => 'vs-dark'
    });
  }

  setAppTheme(theme: string) {
    window.localStorage['theme'] = theme;
  }

  getIsStrict() {
    return window.localStorage['isStrict'] || false;
  }

  setIsStrict(isStrict: boolean) {
    window.localStorage['isStrict'] = isStrict;
  }

  getIsEscape() {
    return window.localStorage['isEscape'] || false;
  }

  setIsEscape(isEscape: boolean) {
    window.localStorage['isEscape'] = isEscape;
  }

  setQuoteIdx(qtIdx: QuoteIdx) {
    window.localStorage['quoteIdx'] = qtIdx;
  }

  getQuoteIdx(): QuoteIdx {
    return window.localStorage['quoteIdx'] || 1;
  }

  getUserId() {
    const userId = window.localStorage['userId'];
    if (userId) {
      return userId;
    } else {
      const rdUserId = `ZJSON-${fn.randomId()}`;
      this.setUserId(rdUserId);
      return rdUserId;
    }
  }

  setUserId(id: string) {
    window.localStorage['userId'] = id;
  }

  initFmtHists() {
    const hists = this.getFmtHists();
    if (!hists.length) {
      this.defaultHist.forEach(hist => this.setFmtHists(hist));
    } else {
      const names = this.defaultHist.map(hist => hist.name);
      hists.forEach(hist => {
        const idx = names.indexOf(hist.name);
        if (idx !== -1) {
          hist.src = this.defaultHist[idx].src;
        }
      });
      window.localStorage['fmtHists'] = JSON.stringify(hists);
    }
  }

  getFmtHists() {
    const fmtHists = window.localStorage['fmtHists'];
    return fmtHists ? JSON.parse(fmtHists) : [];
  }

  setFmtHists(hist: any) {
    const fmtHists = this.getFmtHists();
    fmtHists.unshift(hist);
    if (fmtHists.length > 8) {
      fmtHists.pop();
    }
    window.localStorage['fmtHists'] = JSON.stringify(fmtHists);
  }

  rmvFmtHists(hist: any) {
    let fmtHists = this.getFmtHists();
    fmtHists = fmtHists.filter(ht => ht.name !== hist.name);
    window.localStorage['fmtHists'] = JSON.stringify(fmtHists);
  }

  getCompareHists() {
    const compareHists = window.localStorage['compareHists'];
    return compareHists ? JSON.parse(compareHists) : [];
  }

  setCompareHists(hist: any) {
    const compareHists = this.getCompareHists();
    compareHists.unshift(hist);
    if (compareHists.length > 8) {
      compareHists.pop();
    }
    window.localStorage['compareHists'] = JSON.stringify(compareHists);
  }

  rmvCompareHists(hist: any) {
    let compareHists = this.getCompareHists();
    compareHists = compareHists.filter(ht => ht.name !== hist.name);
    window.localStorage['compareHists'] = JSON.stringify(compareHists);
  }

  getLocalVersion() {
    return window.localStorage['version'];
  }

  setLocalVersion(version: string) {
    window.localStorage['version'] = version;
  }

  getRemoteVersion() {
    return this.http.get(`/api/zjson/version`).map(res => res.json());
  }

  setRefreshTime() {
    if (this.checkIsExpire()) {
      window.localStorage['refreshTime'] = Date.now();
    }
  }

  checkIsExpire() {
    const lastRefreshTime = window.localStorage['refreshTime'];
    if (lastRefreshTime && Date.now() - lastRefreshTime < 299000) {
      return false;
    }
    return true;
  }

  setIsUpGrade(isUpGrade: string) {
    window.localStorage['isUpGrade'] = isUpGrade;
  }

  checkIsUpGrade() {
    const isUpGrade = window.localStorage['isUpGrade'];
    if (isUpGrade === 'yes') {
      return true;
    }
    return false;
  }

  refreshVisitCount(id: string) {
    let isExpire;
    if (this.checkIsUpGrade()) {
      isExpire = 'no';
      this.setIsUpGrade('no');
    } else {
      isExpire = this.checkIsExpire() ? 'yes' : 'no';
      this.setRefreshTime();
    }
    return this.http.get(`/api/refreshVc/${id}?isExpire=${isExpire}`).map(res => res.json());
  }

  pollingVisitCount(id: string, isOnInit: boolean) {
    return this.http.get(`/api/pollingVc/${id}?isOnInit=${isOnInit ? 'yes' : 'no'}`).map(res => res.json());
  }

  shareFormated(sharedJson: string) {
    const req = {
      userId: this.getUserId(),
      sharedJson: sharedJson
    };
    return this.http.post(`/api/sharedJson`, req).map(res => res.json());
  }

  getSharedJson(sharedId: string) {
    return this.http.get(`/api/sharedJson/${sharedId}`).map(res => res.json());
  }

  getUpdateUrl() {
    return this.http.get('/api/zjson/appVersion').map(res => res.json());
  }
}

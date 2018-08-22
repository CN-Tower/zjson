import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export const APP_INFO = {
  version: 'v3.2.1',
  updateTime: '2018-08-21'
}

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
    }`},
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
    }`}
  ]

  constructor(private http: Http) { }

  getGreeting(lang: string): string {
    return this.greetings[lang][fn.random(this.greetings[lang].length)];
  }

  getAnimateClass(type: 'in' | 'out') {
    const tpCls = this.animateClass[type];
    return tpCls[fn.random(tpCls.length)];
  }

  getAppTheme() {
    return window.localStorage['theme'] || 'dark';
  }

  setAppTheme(theme: string) {
    window.localStorage['theme'] = theme;
  }

  getUserId() {
    const userId = window.localStorage['userId'];
    if (userId) {
      return userId;
    } else {
      const rdUserId = `ZJSON-${fn.rdid()}`;
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
      window.localStorage['refreshTime'] = fn.time();
    }
  }

  checkIsExpire() {
    const lastRefreshTime = window.localStorage['refreshTime'];
    if (lastRefreshTime && fn.time() - lastRefreshTime < 299000) {
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

  fmtedShareLinks(fmtedStr: string) {
    const req = {
      userId: this.getUserId(),
      fmtedStr: fmtedStr
    }
    return this.http.post(`/api/shareLink`, req).map(res => res.json());
  }
}

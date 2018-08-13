import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    constructor(private http: Http) {}

    getGreeting(lang: string): string {
        const greetings = {
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
        return greetings[lang][fn.random(greetings[lang].length)];
    }

    getAnimateClass(type: 'in'|'out') {
        const classes = {
            'in': [
                'bounceIn', 'bounceInLeft', 'bounceInUp', 'fadeIn', 'fadeInLeft',
                'fadeInUp', 'flipInX', 'rotateIn', 'slideInLeft', 'slideInUp', 'rollIn'
            ],
            'out': [
                'bounceOut', 'bounceOutRight', 'bounceOutDown', 'fadeOut', 'fadeOutRight',
                'fadeOutDown', 'flipOutX', 'rotateOut', 'slideOutRight', 'slideOutDown', 'rollOut'
            ]
        };
        const tpCls = classes[type];
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
}

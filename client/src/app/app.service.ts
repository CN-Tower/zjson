import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    srcPlaceHolder: string = 'Paste your source code to here!';

    constructor(private http: Http) {}

    getThemes(): any {
        return [
            {name: 'default', text: 'Default'},
            {name: 'nocolor', text: 'No Color'},
            // {name: 'darktheme', text: 'Dark Theme'},
            // {name: 'lighttheme', text: 'Light Theme'}
        ];
    }

    getGreeting(): string {
        const greetings = [
            'Have a nice day',
            'Nice to meet you',
            'You\'ll have good luck',
            'God bless you'
        ];
        return greetings[fn.random(greetings.length)];
    }

    getUserId() {
        return window.localStorage['userId'];
    }

    setUserId(id: string) {
        if (id) {
            window.localStorage['userId'] = id;
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
            fmtHists.shift();
        }
        window.localStorage['fmtHists'] = JSON.stringify(fmtHists);
    }

    rmvFmtHists(hist: any) {
        let fmtHists = this.getFmtHists();
        fmtHists = fmtHists.filter(ht => ht.name !== hist.name);
        window.localStorage['fmtHists'] = JSON.stringify(fmtHists);
    }

    getVistCount(id: string) {
        return this.http.get(`/api/visitCount/${id}`).map(res => res.json());
    }
}

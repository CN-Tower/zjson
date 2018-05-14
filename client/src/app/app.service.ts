import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    srcPlaceHolder: string = 'Paste your source code to here!';

    constructor(private http: Http) {}

    getThemeTitles(): any {
        return {
           default: 'Default',
           nocolor: 'No Color',
           darktheme: 'Dark Theme',
           lighttheme: 'Light Theme'
        };
    }

    getGreeting(): string {
        const greetings = [
            'Have a nice day!',
            'Nice to meet you!',
            'You\'ll have good luck!',
            'God bless you!'
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

    getVistCount(id: string) {
        return this.http.get(`/api/visitCount/${id}`).map(res => res.json());
    }
}

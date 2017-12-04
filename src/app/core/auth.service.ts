import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthService {
    userName: string;
    readonly storageKey = 'xsp-user';

    constructor(
        private dataService: DataService,
        private router: Router
    ) { }

    get userId() {
        const userId = localStorage.getItem(this.storageKey);
        return userId;
    }

    auth() {
        return this.dataService
            .getData('auth')
            .toPromise()
            .then(data => {
                this.userName = <string>data;
                return <boolean>data;
            });
    }

    login(userId, password) {
        return this.dataService
            .postData('login', { userId, password })
            .toPromise();
        // .then(data => {
        //     return data;
        // })
        // .catch(error => console.log(error));

    }

    logout(url) {
        localStorage.removeItem(this.storageKey);
        this.router.navigateByUrl(url);
    }

    storeUser(userId) {
        localStorage.setItem(this.storageKey, userId);
    }
}

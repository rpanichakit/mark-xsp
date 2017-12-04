import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    userName: string;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.userName = this.authService.userId;
    }

    logout() {
        this.authService.logout(`/login?returnUrl=${location.pathname}`);
    }
}

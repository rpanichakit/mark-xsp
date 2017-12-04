import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    hasErrors = false;
    returnUrl = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            userName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.route.queryParams.subscribe(p => {
            this.returnUrl = p['returnUrl'] ? p['returnUrl'] : '';
        });
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (valid) {
            this.authService
                .login(value.userName, value.password)
                .then(data => {
                    // if (!data) {
                    //     this.hasErrors = true;
                    // } else {
                        this.authService.storeUser(value.userName);
                        this.router.navigateByUrl(this.returnUrl);
                    // }
                })
                .catch(error => {
                    console.log(error);
                    this.hasErrors = true;
                });
        }
    }
}

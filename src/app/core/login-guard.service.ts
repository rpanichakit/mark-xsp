import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise<boolean>((resolve, reject) => {
            const userId = this.authService.userId;
            const success = userId !== null && userId !== undefined;
            if (!success) {
                if (location.pathname.length > 1) {
                    this.router.navigateByUrl(`login?returnUrl=${location.pathname}`);
                } else {
                    this.router.navigate(['login']);
                }
            }
            return resolve(success);
        });
        // return this.authService.auth()
        //     .then(success => {
        //         if (!success) {
        //             if (location.pathname.length > 1) {
        //                 this.router.navigateByUrl(`login?returnUrl=${location.pathname}`);
        //             } else {
        //                 this.router.navigate(['login']);
        //             }
        //         }
        //         return success !== undefined && success !== null;
        //     });
    }
}

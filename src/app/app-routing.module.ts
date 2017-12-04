import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LoginGuard } from './core/login-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'sales-management', pathMatch: 'full' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            {
                path: '',
                component: LayoutComponent,
                canActivate: [LoginGuard],
                children: [
                    {
                        path: 'sales-management', loadChildren: './sales-management/sales-management.module#SalesManagementModule'
                    }
                ]
            },
            {
                path: '**',
                redirectTo: ''
            }
        ])
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { LoginGuard } from './login-guard.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule
    ],
    providers: [
        DataService,
        AuthService,
        LoginGuard
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

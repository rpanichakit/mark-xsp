import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgModel } from '@angular/forms/src/directives/ng_model';

@NgModule({
    imports: [
        LoginRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SalesManagementRoutingModule } from './sales-management-routing.module';
import { SalesManagementService } from './sales-management.service';
import { SalesManagementComponent } from './sales-management.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SalesManagementRoutingModule
    ],
    declarations: [
        SalesManagementComponent
    ],
    providers: [
        SalesManagementService
    ]
})
export class SalesManagementModule {}

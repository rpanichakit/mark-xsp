import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesManagementComponent } from './sales-management.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SalesManagementComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class SalesManagementRoutingModule { }

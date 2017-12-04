import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { DataService } from '../core/data.service';
import { SalesPerson } from './sales-management.model';

@Injectable()
export class SalesManagementService {
    nextId = 3;

    sales: any = [
        {
            id: 1,
            firstName: 'Mark',
            lastName: 'Punak'
        },
        {
            id: 2,
            firstName: 'Patrick',
            lastName: 'Blattner'
        }
    ];

    constructor(
        private dataService: DataService
    ) { }

    getSales() {
        return this.dataService.getData('salesperson');
    }

    addSalesPerson(newPerson: SalesPerson) {
        return this.dataService.putData('salesperson', newPerson);
    }

    deleteSalesPerson(person: SalesPerson) {
        return this.dataService.deleteData(`salesperson/${person.ID}`);
    }

    updatePerson(person: SalesPerson) {
        return this.dataService.postData('salesperson', person);
    }
}

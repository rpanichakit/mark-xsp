import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SalesManagementService } from './sales-management.service';
import { SalesPerson } from './sales-management.model';

@Component({
    selector: 'app-sales-management',
    templateUrl: 'sales-management.component.html',
    styleUrls: ['./sales-management.component.scss']
})

export class SalesManagementComponent implements OnInit {
    @ViewChild('newFirstName') focusField;

    sales: SalesPerson[];
    editList: SalesPerson[];
    newSalesPerson: SalesPerson = {
        FirstName: '',
        LastName: '',
        ID: 0
    };
    salesForm: FormGroup;
    adding = false;
    deleting = false;
    sortBy: string;
    sortDirection = 'asc';
    deleteTarget;
    deleteName;
    selectedPerson: SalesPerson;
    errors = {
        invalidFirstName: false,
        invalidLastName: false
    };

    constructor(
        private service: SalesManagementService
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.service.getSales()
            .subscribe(sales => {
                this.sales = <SalesPerson[]>sales;
                this.editList = [...this.sales.map(s => ({ ...s }))];
                this.resetNewPerson();
                this.sortData();
            });
    }

    sort(column) {
        if (this.sortBy === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortDirection = 'asc';
        }
        this.sortBy = column;
        this.sortData();
    }

    sortData() {
        this.editList.sort((a, b) => {
            const valueA = a[this.sortBy];
            const valueB = b[this.sortBy];
            if (this.sortDirection === 'asc') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });
    }

    resetNewPerson() {
        this.newSalesPerson = {
            ID: 0,
            FirstName: '',
            LastName: ''
        };
    }

    addPerson(evt) {
        this.adding = true;
        evt.stopPropagation();
        this.selectedPerson = undefined;
        setTimeout(
            () => {
                this.focusField.nativeElement.focus();
            }, 100
        );
    }

    isPersonValid(person: SalesPerson) {
        return person.FirstName.length > 0 && person.LastName.length > 0;
    }

    resetAddFormErrors() {
        this.errors = {
            invalidFirstName: false,
            invalidLastName: false
        };
    }

    saveNewPerson(evt) {
        evt.stopPropagation();
        if (this.isPersonValid(this.newSalesPerson)) {
            this.service.addSalesPerson(this.newSalesPerson)
                .subscribe(() => {
                    this.adding = false;
                    this.resetAddFormErrors();
                    this.getData();
                });
        } else {
            this.errors = {
                invalidFirstName: this.newSalesPerson.FirstName.length === 0,
                invalidLastName: this.newSalesPerson.LastName.length === 0
            };
        }
    }

    selectPerson(person, evt) {
        if (evt) {
            evt.stopPropagation();
        }
        this.selectedPerson = person;
        this.resetRows();
        if (this.adding) {
            this.adding = false;
            this.resetNewPerson();
        }
    }

    deletePerson(person, evt) {
        evt.stopPropagation();
        this.deleting = true;
        this.deleteTarget = person;
        this.deleteName = `${person.FirstName} ${person.LastName}`;
    }

    confirmDelete(evt) {
        evt.stopPropagation();
        this.service.deleteSalesPerson(this.deleteTarget)
            .subscribe(() => {
                this.deleteTarget = undefined;
                this.deleteName = undefined;
                this.deleting = false;
                this.getData();
            });
        // const deleteId = this.service.deleteSalesPerson(this.deleteTarget);
        // let deleteIndex;
        // this.editList.forEach((s, index) => {
        //     if (s.ID === this.deleteTarget.id) {
        //         deleteIndex = index;
        //     }
        // });
        // if (deleteIndex !== undefined) {
        //     this.editList.splice(deleteIndex, 1);
        // }
        // this.deleteTarget = undefined;
        // this.deleteName = undefined;
        // this.deleting = false;
    }

    cancelDelete(evt) {
        evt.stopPropagation();
        this.deleteTarget = undefined;
        this.deleteName = undefined;
        this.deleting = false;
    }

    editRow(person, evt) {
        evt.stopPropagation();
        if (person.editing) {
            return;
        }

        this.resetRows();
        person.editing = true;
    }

    updatePerson(person, evt) {
        if (evt) {
            evt.stopPropagation();
        }
        if (this.isPersonValid(person)) {
            this.service.updatePerson(person);
            this.service.updatePerson(person)
                .subscribe(() => {
                    person.editing = false;
                    person.invalidFirstName = false;
                    person.invalidLastName = false;
                    this.getData();
                });
        } else {
            person.invalidFirstName = person.firstName.length === 0;
            person.invalidLastName = person.lastName.length === 0;
        }
    }

    onRowClick(evt) {
        evt.stopPropagation();
    }

    resetRows() {
        this.editList.forEach((p: any) => {
            if (p.editing) {
                p.editing = false;
                const sale = this.sales.filter(s => s.ID === p.id)[0];
                p.FirstName = sale.FirstName;
                p.LastName = sale.LastName;
                p.invalidFirstName = false;
                p.invalidLastName = false;
            }
        });
    }

    addKeyUp(evt) {
        if (evt.key === 'Enter') {
            this.saveNewPerson(null);
        }
        this.errors = {
            invalidFirstName: this.newSalesPerson.FirstName.length === 0,
            invalidLastName: this.newSalesPerson.LastName.length === 0
        };
    }

    @HostListener('document:click', ['$event'])
    public documentClick(event: Event): void {
        if (this.adding) {
            this.adding = false;
            this.resetNewPerson();
        }
        this.resetRows();
        if (this.selectedPerson) {
            this.selectedPerson = undefined;
        }
    }
}

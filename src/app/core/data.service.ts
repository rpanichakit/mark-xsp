import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

    readonly baseUrl = `http://cox.punak.net:9300/xsp`;

    constructor(private httpClient: HttpClient) { }

    getData(url: string) {
        return this.httpClient.get(`${this.baseUrl}/${url}`);
    }

    postData(url: string, data: any) {
        return this.httpClient.post(`${this.baseUrl}/${url}`, data);
    }

    putData(url: string, data: any) {
        return this.httpClient.put(`${this.baseUrl}/${url}`, data);
    }

    deleteData(url: string) {
        return this.httpClient.delete(`${this.baseUrl}/${url}`);
    }
}

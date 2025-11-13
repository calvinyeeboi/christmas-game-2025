import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = 'http://192.168.1.99:3000/api';

  constructor(private http: HttpClient) { }

  get({ url = '', params = {}}): Observable<any> {
    params = this.getParams(params);
    console.log('get');
    return this.http.get(`${this.baseUrl}/${url}`, { params });
  }

  post({ url = '', body = {}}): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }

  getParams(params: any = {}): HttpParams {
    let formattedParams = new HttpParams();
    for (const key in params) {
      formattedParams.set(key, params[key]);
    }
    return formattedParams;
  }
}
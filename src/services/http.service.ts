import {Injectable, Inject, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class CustomHttpClient {
  private commonHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
  constructor(private http: HttpClient, @Inject('AUTH_HEADER') @Optional() private authHeader?: string) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set('Authorization', this.authHeader); 
    console.log(this.commonHeaders)
  }

  get(url:string, params: any) {
    // this.createAuthorizationHeader(this.commonHeaders);
    // console.log(this.commonHeaders)
    // this.commonHeaders.append('Authorization', this.authHeader)
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.authHeader
      }),
      params: params
    });
  }
}
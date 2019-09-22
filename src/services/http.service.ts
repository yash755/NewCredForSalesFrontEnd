import {Injectable, Inject, Optional} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CustomHttpClient {
  private commonHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
  constructor(private http: HttpClient, @Inject('AUTH_HEADER') @Optional() private authHeader?: string) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set('Authorization', this.authHeader); 
  }

  get(url:string, params: any) {
    this.createAuthorizationHeader(this.commonHeaders);
    return this.http.get(url, {
      headers: this.commonHeaders
    });
  }
}
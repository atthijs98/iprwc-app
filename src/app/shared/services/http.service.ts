import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


interface HttpOptions {
  auth?: boolean;
  endpoint?: string;
  public?: boolean;
  body?: any;
  responseType?: string;
  observe?: string;
}

@Injectable({providedIn: 'root'})
export class HttpService {
  private BACKEND_URL = environment.backendUrl;
  private PUBLIC_PREFIX = '/api/public';
  private PRIVATE_PREFIX = '/api';

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) {}

  post(options: HttpOptions): Observable<any> {
    return (
      this.http.post(
        this.generateUrl(options.public, options.endpoint), options.body, {
          observe: 'response',
          headers: this.getTokenHeader()
        }
      )
    );
  }

  put(options: HttpOptions): Observable<any> {
    return (
      this.http.put(
        this.generateUrl(options.public, options.endpoint), options.body, {
          observe: 'response',
          headers: this.getTokenHeader()
        }
      )
    );
  }

  get(options: HttpOptions): Observable<any> {
    return (
      this.http.get(
        this.generateUrl(options.public, options.endpoint), {
          observe: 'response',
          headers: this.getTokenHeader(),
        }
      )
    );
  }

  delete(options: HttpOptions): Observable<any> {
    return (
      this.http.delete(
        this.generateUrl(options.public, options.endpoint), {headers: this.getTokenHeader()}
      )
    );
  }


  generateUrl(publicPrefix: boolean | undefined, endpoint: string | undefined): string {
    return (
      this.BACKEND_URL + (!publicPrefix || false ? this.PRIVATE_PREFIX : this.PUBLIC_PREFIX) + endpoint
    );
  }

  getTokenHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtoken');

    // @ts-ignore
    return token === null || this.jwtHelper.isTokenExpired(token) ? null : new HttpHeaders({'Data-Type': 'json','Content-Type': 'application/json','Authorization': 'Bearer ' + token});
  }
}

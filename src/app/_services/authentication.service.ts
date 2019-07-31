import { Injectable } from '@angular/core';
import {LoginData, UserData} from '../_models/userdata.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string): Observable<LoginData> {

    const headers = {
      'Authorization': 'Basic ' + btoa('client:PlanItAv-0727'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    const body = new HttpParams()
      .set('username', userName)
      .set('password', password)
      .set('grant_type', 'password');
    return this.httpClient.post<LoginData>(environment.baseUrl + '/oauth/token', body, {headers});
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('expires_in');
    sessionStorage.removeItem('expire');
    sessionStorage.removeItem('token');
    window.location.href = window.location.origin + '/login';
  }

  getUserData(username: string) {
    const body = new HttpParams()
      .set('userName', username);
    return this.httpClient.get<UserData>(environment.baseUrl + '/getUserInfo', {
      params: body
    });
  }

}

import { Injectable } from '@angular/core';
import { LoginResult } from '../_models/loginResult.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(environment.baseUrl + '/login', {
      userName: userName,
      password: password
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}

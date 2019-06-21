import { Injectable } from '@angular/core';
import { UserData } from '../_models/userdata.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string): Observable<UserData> {
    return this.httpClient.post<UserData>(environment.baseUrl + '/login', {
      userName: userName,
      password: password
    });
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }

}

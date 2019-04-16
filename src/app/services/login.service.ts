import { Injectable } from '@angular/core';
import { LoginResult } from '../interface/loginResult.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string): Observable<LoginResult>{
    return this.httpClient.post<LoginResult>('http://localhost:8080/PlanItAv/login', {
      userName: userName,
      password: password
    });
  }
  
}

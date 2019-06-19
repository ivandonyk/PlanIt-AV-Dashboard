import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public getMessage(){
    return this.http.get('http://localhost:8080/PlanItAv/avHome');
  };

}

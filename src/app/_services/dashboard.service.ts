import { Injectable } from '@angular/core';
import { Dashboard } from '../_models/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {



  constructor(private httpClient: HttpClient) { }

  getDashboardData(): Observable<Dashboard> {
    return this.httpClient.get<Dashboard>(environment.baseUrl + '/dashboard');
  }



}

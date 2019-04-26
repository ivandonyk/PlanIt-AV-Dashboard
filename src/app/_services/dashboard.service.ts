import { Injectable } from '@angular/core';
import { Dashboard } from '../_models/dashboard.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import { UserData } from '../_models/userdata.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {



  constructor(private httpClient: HttpClient) { }

  getDashboardData(): Observable<Dashboard> {
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessId));
    return this.httpClient.get<Dashboard>(environment.baseUrl + '/dashboard', {
      params: params
    });
  }



}

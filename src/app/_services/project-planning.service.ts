import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {UserData} from '../_models/userdata.model';
import { ProjectPlanList, ProjPlanDetailObj } from '../_models/project-plannings.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectPlanningService {
  constructor(private httpClient: HttpClient) { }

  getProjPlanSum(): Observable<ProjectPlanList> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessId));
    return this.httpClient.get<ProjectPlanList>(environment.baseUrl + '/getProjPlanSum', {
      params: params
    });
  }

  getProjPlanDetail(year): Observable<ProjPlanDetailObj> {
    console.log(year);
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.httpClient.get<ProjPlanDetailObj>(environment.baseUrl + '/getProjPlanDetail?businessId=' + String(userData.businessId) + '&year=' + year);
  }

}

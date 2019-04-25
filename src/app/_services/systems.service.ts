import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {Rooms, Room, Buildings} from '../_models/systems.model';
import {UserData} from '../_models/Userdata.model';

@Injectable({
  providedIn: 'root'
})
export class SystemsService {



  constructor(private httpClient: HttpClient) { }

  getBuildings(): Observable<Buildings> {
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessId));


    return this.httpClient.get<Buildings>(environment.baseUrl + '/getBuildings', {
      params: params
    });
  }

  getBuildingRooms(id?: number | string): Observable<Rooms> {
    const params = new HttpParams().set('buildingId', id ? String(id) : '' );

    return this.httpClient.get<Rooms>(environment.baseUrl + '/getRooms', {
      params: params
    });
  }



}

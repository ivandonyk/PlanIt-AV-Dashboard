import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {Rooms, RoomDetails, Buildings, Equipment, EquipmentDetail} from '../_models/systems.model';
import {UserData} from '../_models/userdata.model';

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


  getRoomDetails(id?: number | string): Observable<RoomDetails> {
    const params = new HttpParams().set('roomId', String(id));


    return this.httpClient.get<RoomDetails>(environment.baseUrl + '/getRoomDetail', {
      params: params
    });
  }

  getEquipments(id?: number | string): Observable<Equipment> {
    const params = new HttpParams().set('roomId', String(id));
    return this.httpClient.get<Equipment>(environment.baseUrl + '/getEquipment', {
      params: params
    });
  }

  getEquipmentDetail(id?: number | string): Observable<EquipmentDetail> {
    const params = new HttpParams().set('equipmentId', String(id));
    return this.httpClient.get<EquipmentDetail>(environment.baseUrl + '/getEquipmentDetail', {
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

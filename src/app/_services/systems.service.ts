import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import { SlideData, Room } from '../_models/systems.model';

@Injectable({
  providedIn: 'root'
})
export class SystemsService {



  constructor(private httpClient: HttpClient) { }

  getBuildings(): Observable<SlideData[]> {
    return this.httpClient.get<SlideData[]>(environment.baseUrl + '/getBuildings');
  }

  getBuildingRooms(id?: number | string): Observable<Room[]> {
    const params = new HttpParams().set('buildingId', id ? String(id) : '' );

    return this.httpClient.get<Room[]>(environment.baseUrl + '/getRooms', {
      params: params
    });
  }



}

import { Injectable } from '@angular/core';
import { Building } from '../_models/building.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private httpClient: HttpClient) {

  }

  getBuildings(): Observable<Building[]> {

    return this.httpClient.get<Building[]>(environment.baseUrl + '/getBuildings', {});

    }
}

import { Injectable } from '@angular/core';
import { Building } from '../interface/building.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private httpClient: HttpClient) { 
      
  }

  getBuildings(): Observable<Building[]>{

    console.log("In ngOnInit BuildingService");
    // return this.httpClient.get<Building[]>('http://localhost:8080/PlanItAv/getBuildings');
    return this.httpClient.get<Building[]>('http://planitavbackend-env.ddb9nxgi32.us-east-2.elasticbeanstalk.com/getBuildings');

    }
}

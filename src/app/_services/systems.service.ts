import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {
  Rooms, RoomDetails, Buildings, Equipment, RoomDTO, EquipmentDetail, BuildingsIds,
  Room
} from '../_models/systems.model';
import { EquipmentDetailAdd } from '../_models/equipment.model';
import { UserData } from '../_models/userdata.model';
import {AddBuildingFormModel} from '../_models/addBuildingFormModel';
import * as moment from 'moment';

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

  getBuildingIds(): Observable<BuildingsIds[]> {
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessAcctId', String(userData.businessId));
    return this.httpClient.get<BuildingsIds[]>(environment.baseUrl + '/getBuildingIds', {
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

  getRoooms(id?: number | string): Observable<Rooms> {
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessId));

    return this.httpClient.get<Rooms>(environment.baseUrl + '/getRoomsByBus', {
      params: params
    });
  }


  getAllEquipments(id?: number | string): Observable<Equipment[]> {
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessId));

    return this.httpClient.get<Equipment[]>(environment.baseUrl + '/getEquipmentByBus', {
      params: params
    });
  }
  getRoomIds(id?: number | string): Observable<Equipment[]> {
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessId));

    return this.httpClient.get<Equipment[]>(environment.baseUrl + '/getRoomIds', {
      params: params
    });
  }

  addRoom(roomObj: RoomDetails): Observable<RoomDetails> {
    const room: RoomDetails = {
      buildingId: Number(roomObj.buildingId),
      avLastUpdateCost: Number(roomObj.avLastUpdateCost),
      avLastUpdateDate: moment(roomObj.avLastUpdateDate).toISOString(),
      ceilingHeight: Number(roomObj.ceilingHeight),
      ceilingType: String(roomObj.ceilingType),
      coreAge: String(roomObj.coreAge),
      dateOfLastRemodel: moment(roomObj.dateOfLastRemodel).toISOString(),
      dimensions: String(roomObj.dimensions),
      equipmentAge: String(roomObj.equipmentAge),
      floor: Number(roomObj.floor),
      images: roomObj.images,
      integrator: String(roomObj.integrator),
      lastAvContractor: String(roomObj.lastAvContractor),
      lastInstallDate: moment(roomObj.lastInstallDate).toISOString(),
      lifecycle: Number(roomObj.lifecycle),
      nextAvUpdCost: Number(roomObj.nextAvUpdCost),
      nextAvUpdateDt: moment(roomObj.nextAvUpdateDt).toISOString(),
      notes: String(roomObj.notes),
      origAvContractor: String(roomObj.origAvContractor),
      origAvInstallDate: moment(roomObj.origAvInstallDate).toISOString(),
      origAvSystemCost: Number(roomObj.origAvSystemCost),
      replaceUpg: String(roomObj.replaceUpg),
      roomName: String(roomObj.roomName),
      seatingCapacity: Number(roomObj.seatingCapacity),
      seatingType: String(roomObj.seatingType),
      tier: Number(roomObj.tier)
    };
    return this.httpClient.post<RoomDetails>(environment.baseUrl + '/addRoom', room);
  }

  addEquipment(equipment: EquipmentDetailAdd): Observable<EquipmentDetailAdd> {
    return this.httpClient.post<EquipmentDetailAdd>(environment.baseUrl + '/addRoom', equipment);
  }
  updateRoom(roomObj: RoomDTO): Observable<RoomDTO> {
    return this.httpClient.post<RoomDTO>(environment.baseUrl + '/updRoom', roomObj);
  }
  uploadImage(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file.file, file.file.name);
    formData.append('roomId', file.roomId);
    formData.append('description', file.description);
    return this.httpClient.post<any>(environment.baseUrl + '/uploadImage', formData);
  }
  addBuilding(object: AddBuildingFormModel): Observable<AddBuildingFormModel> {
    return this.httpClient.post<AddBuildingFormModel>(environment.baseUrl + '/addBuilding', object);
  }

  getDocuments(id?: number | string) {
    const params = new HttpParams().set('roomId', String(id));
    return this.httpClient.get(environment.baseUrl + '/getDocuments', {
      params: params
    });
  }

  getProjectDesc(id?: number | string) {
    const params = new HttpParams().set('roomId', String(id));
    return this.httpClient.get(environment.baseUrl + '/getProjDesc', {
      params: params
    });
  }

  getRoomHist(id?: number | string) {
    const params = new HttpParams().set('roomId', String(id));
    return this.httpClient.get(environment.baseUrl + '/getRoomHist', {
      params: params
    });
  }
}

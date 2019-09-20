import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {
  Rooms, RoomDetails, Buildings, Equipment, RoomDTO, EquipmentDetail, BuildingsIds,
  Room, EquipmentDetailUpdate
} from '../_models/systems.model';
import { EquipmentDetailAdd } from '../_models/equipment.model';
import {
  AnotherUserData, BillingSubs, BussAcc, updBusAcct, UserData, UserManageData,
  UserRoles
} from '../_models/userdata.model';
import {AddBuildingFormModel} from '../_models/addBuildingFormModel';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class SystemsService {
  constructor(private httpClient: HttpClient) { }

  getBuildings(): Observable<Buildings> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessAcctId));
    return this.httpClient.get<Buildings>(environment.baseUrl + '/getBuildings', {
      params: params
    });
  }

  getBuildingIds(): Observable<BuildingsIds[]> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessAcctId', String(userData.businessAcctId));
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

  getEquipments(id?: number | string) {
    const params = new HttpParams().set('roomId', String(id));
    return this.httpClient.get(environment.baseUrl + '/getEquipment', {
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
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessAcctId));

    return this.httpClient.get<Rooms>(environment.baseUrl + '/getRoomsByBus', {
      params: params
    });
  }


  getAllEquipments(id?: number | string): Observable<Equipment[]> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessAcctId));

    return this.httpClient.get<Equipment[]>(environment.baseUrl + '/getEquipmentByBus', {
      params: params
    });
  }
  getRoomIds(id?: number | string): Observable<Equipment[]> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessId', String(userData.businessAcctId));

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
      tier: Number(roomObj.tier),
      roomType: String(roomObj.roomType)
    };
    return this.httpClient.post<RoomDetails>(environment.baseUrl + '/addRoom', room);
  }

  addEquipment(equipment: EquipmentDetailAdd): Observable<EquipmentDetailAdd> {
    return this.httpClient.post<EquipmentDetailAdd>(environment.baseUrl + '/addEquipment', equipment);
  }
  updateRoom(roomObj: RoomDTO): Observable<RoomDTO> {
    return this.httpClient.post<RoomDTO>(environment.baseUrl + '/updRoom', roomObj);
  }
  updEquipment(roomObj: EquipmentDetailUpdate): Observable<EquipmentDetailUpdate> {
    return this.httpClient.post<EquipmentDetailUpdate>(environment.baseUrl + '/updEquipment', roomObj);
  }
  addProjDesc(data) {
    return this.httpClient.post(environment.baseUrl + '/addProjDesc', data);
  }
  addNote(data): Observable<RoomDTO> {
    return this.httpClient.post<RoomDTO>(environment.baseUrl + '/addNote', data);
  }
  uploadImage(file): Observable<any> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const formData = new FormData();
    formData.append('files', file.file, file.file.name);
    formData.append('roomId', file.roomId);
    formData.append('description', file.description);
    formData.append('userName', userData.userName);
    return this.httpClient.post<any>(environment.baseUrl + '/uploadImage', formData);
  }
  uploadDoc(file): Observable<any> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const formData = new FormData();
    formData.append('files', file.file, file.file.name);
    formData.append('roomId', file.roomId);
    formData.append('description', file.description);
    formData.append('userName', userData.userName);
    return this.httpClient.post<any>(environment.baseUrl + '/uploadDoc', formData);
  }
  updBuilding(data, id): Observable<any> {

    console.log(data)
    // const params = new HttpParams().set('businessId', String(userData.businessAcctId));

    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const formData = new FormData();
    formData.append('businessAccountId', String(userData.businessAcctId));
    formData.append('buildingName', data.buildingName);
    formData.append('address1', data.address1);
    formData.append('address2', data.address2);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('zip', data.zip);
    formData.append('nbrOfFloors', data.nbrOfFloors);
    formData.append('dateConstructed', data.dateConstructed);
    formData.append('dateLastRemodel', data.dateLastRemodel);
    formData.append('notes', data.notes);
    formData.append('contactFirstName', data.contactFirstName);
    formData.append('contactLastName', data.contactLastName);
    formData.append('contactPhoneNbr', data.contactPhoneNbr);
    formData.append('contactEmail', data.contactEmail);
    formData.append('buildingId', id);
    formData.append('userName', userData.userName);


    const headers = {
      'Content-type': 'application/json'
    };

    return this.httpClient.post<any>(environment.baseUrl + '/updBuilding', {
      'buildingName': data.buildingName,
      'address1': data.address1,
      'businessAccountId': Number(userData.businessAcctId),
      'address2': data.address2,
      'city': data.city,
      'state': data.state,
      'zip': data.zip,
      'nbrOfFloors': data.nbrOfFloors,
      'dateConstructed': data.dateConstructed,
      'dateLastRemodel': data.dateLastRemodel,
      'notes': data.notes,
      'contactFirstName': data.contactFirstName,
      'contactLastName': data.contactLastName,
      'contactPhoneNbr': data.contactPhoneNbr,
      'contactEmail': data.contactEmail,
      'buildingId': id,
      'addressId': data.addressId,
      'contactId': data.contactId,
      'userName': userData.userName
    }, {
      headers
    });
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

  getBuildingDetail(id?: number | string) {
    const params = new HttpParams().set('buildingId', String(id));
    return this.httpClient.get(environment.baseUrl + '/getBuildingDetail', {
      params: params
    });
  }

  getAllUsers(): Observable<UserManageData[]> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessAccountId', String(userData.businessAcctId));
    return this.httpClient.get<UserManageData[]>(environment.baseUrl + '/user/getAllUsers', {
      params: params
    });
  }

  getUser(id: number): Observable<AnotherUserData> {
    const params = new HttpParams().set('userId', String(id));
    return this.httpClient.get<AnotherUserData>(environment.baseUrl + '/user/getUser', {
      params: params
    });
  }


  getRoles(): Observable<UserRoles[]> {
    return this.httpClient.get<UserRoles[]>(environment.baseUrl + '/user/getRoles');
  }

  deleteUser(id: number | string) {
    return this.httpClient.get(environment.baseUrl + '/user/deleteUser/' + String(id));
  }

  updateUser(data, userDataObj): Observable<any> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));


    const headers = {
      'Content-type': 'application/json'
    };

    return this.httpClient.post<any>(environment.baseUrl + '/user/updateUser', {
      businessId: String(userData.businessAcctId),
      primaryAcctAdmin: data.primaryAcctAdmin,
      userId: userDataObj.id,
      userRoleId: data.userRoleId,
      valid: userDataObj.valid,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNbr: data.phoneNbr,
      title: data.title,
      userName: data.userName,
      active: data.active,
    }, {
      headers
    });
  }
  createUser(data, userDataObj): Observable<any> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));


    const headers = {
      'Content-type': 'application/json'
    };

    return this.httpClient.post<any>(environment.baseUrl + '/user/createUser', {
      businessId: String(userData.businessAcctId),
      primaryAcctAdmin: data.primaryAcctAdmin,
      valid: null,
      userRoleId: data.userRoleId,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNbr: data.phoneNbr,
      title: data.title,
      userName: data.userName,
      active: data.active,
    }, {
      headers
    });
  }



  getBillSub(): Observable<BillingSubs> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessAcctId', String(userData.businessAcctId));
    return this.httpClient.get<BillingSubs>(environment.baseUrl + '/getBillSub', {
      params: params
    });
  }


  getAllBillSub(): Observable<BillingSubs[]> {
    return this.httpClient.get<BillingSubs[]>(environment.baseUrl + '/getAllBillSub');
  }

  getBusAcct(): Observable<BussAcc> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessAcctId', String(userData.businessAcctId));
    return this.httpClient.get<BussAcc>(environment.baseUrl + '/getBusAcct', {
      params: params
    });
  }

  updBusBillingSubsripiton(billSubscriptionId: number | string): Observable<string> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
      return this.httpClient.post<string>(environment.baseUrl + '/updBusBillSub?businessAccontId=' + userData.businessAcctId + '&billSubscriptionId=' + billSubscriptionId, {
    });
  }

  updBusAcct(updBusAcctObj: updBusAcct): Observable<updBusAcct> {
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));
    const params = new HttpParams().set('businessAcctId', String(userData.businessAcctId));


    return this.httpClient.post<updBusAcct>(environment.baseUrl + '/updBusAcct',
      {
        businessAccontId: Number(userData.businessAcctId),
        companyName: updBusAcctObj.companyName,
        address1: updBusAcctObj.address1,
        address2: updBusAcctObj.address2,
        city: updBusAcctObj.city,
        state: updBusAcctObj.state,
        zip: updBusAcctObj.zip,
      });
  }


}

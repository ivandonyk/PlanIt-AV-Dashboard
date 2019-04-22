import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { GetHttpParams } from './getHttpParams';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const testUser = { id: 1, userName: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: 'user', message: 200 };

    return of(null).pipe(mergeMap(() => {


      if (request.url.endsWith('/login') && request.method === 'POST') {
        if (request.body.userName === testUser.userName && request.body.password === testUser.password) {
          const body = {
            id: testUser.id,
            userName: testUser.userName,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            role: testUser.role,
            message: testUser.message,
            token: 'fake-jwt-token'
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          // else return 400 bad request
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }
      if (request.url.endsWith('/dashboard') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse(
            {
              status: 200,
              body: {
                  'Systems': {
                    'nbrBuildings': 5,
                    'nbrRooms': 10,
                    'nbrEquipment': 100,
                  },
                  'Lifecycle': {
                    'coreEquipmentAge': 'x to x years',
                    'roomsToUpgrade': [{
                      'nbrRoomsUpg': 7,
                      'year': 2019,
                    }]
                  },
                  'Support': {
                    'rptIssueMonth': '',
                    'rptIssue12Months': 17,
                    'serviceCallMonth': 8,
                    'serviceCall12Months': 10,
                  }
              }
            }
            ));
        } else {
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }
      if (request.url.endsWith('/getBuildings') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse(
            {
              status: 200,
              body: [
                {
                  'buildingId': 1,
                  'nbrRooms': 1078,
                  'coreEquipment': 'X to X Core Equipment',
                  'roomsToReplace': 'Replace every room'
                },
                {
                  'buildingId': 2,
                  'nbrRooms': 24,
                  'coreEquipment': 'Core Equipment building 1',
                  'roomsToReplace': 'Rooms are good..'
                },
                {
                  'buildingId': 3,
                  'nbrRooms': 1078,
                  'coreEquipment': 'X to X Core Equipment',
                  'roomsToReplace': 'Replace every room'
                },
                {
                  'buildingId': 4,
                  'nbrRooms': 24,
                  'coreEquipment': 'Core Equipment building 1',
                  'roomsToReplace': 'Rooms are good..'
                }
              ],
            }
            ));
        } else {
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }

      if (request.url.endsWith('/getRooms') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const roomId = request.params.getAll('buildingId');

          const roomsArr = [
            {
              buildingId: 1,
              rooms: [
                {
                  'roomId': 1,
                  'roomName': 'Test Room',
                  'coreAge': 'Old',
                  'equipmentAge': 'Not as old',
                  'replace': '2020',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 2,
                  'roomName': 'Another Test Room',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'green',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 3,
                  'roomName': 'Another Test Room',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'yellow',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 4,
                  'roomName': 'Another Test Room',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                }
              ]
            },
            {
              buildingId: 2,
              rooms: [
                {
                  'roomId': 1,
                  'roomName': 'Test Room 2',
                  'coreAge': 'Old',
                  'equipmentAge': 'Not as old',
                  'replace': '2020',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 2,
                  'roomName': 'Another Test Room 2',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                }
              ]
            },
            {
              buildingId: 3,
              rooms: [
                {
                  'roomId': 1,
                  'roomName': 'Test Room',
                  'coreAge': 'Old',
                  'equipmentAge': 'Not as old',
                  'replace': '2020',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 2,
                  'roomName': 'Another Test Room',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'green',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 3,
                  'roomName': 'Another Test Room',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'yellow',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 4,
                  'roomName': 'Another Test Room',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                }
              ]
            },
            {
              buildingId: 4,
              rooms: [
                {
                  'roomId': 1,
                  'roomName': 'Test Room 2',
                  'coreAge': 'Old',
                  'equipmentAge': 'Not as old',
                  'replace': '2020',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                },
                {
                  'roomId': 2,
                  'roomName': 'Another Test Room 2',
                  'coreAge': 'New',
                  'equipmentAge': 'Pretty good',
                  'replace': '2022',
                  'lastInstall': '2015',
                  'colorCode': 'red',
                  'type': null,
                  'tier': null
                }
              ]
            },
          ];
          const body = roomsArr.filter(item => item.buildingId === +(roomId))[0] ? roomsArr.filter(item => item.buildingId === +(roomId))[0].rooms : [];
          return of(new HttpResponse(
            {
              status: 200,
              body: body,
            }
            ));
        } else {
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }

      return next.handle(request);

    }))

      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

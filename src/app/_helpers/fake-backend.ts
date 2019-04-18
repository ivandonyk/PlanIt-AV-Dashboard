import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const testUser = { id: 1, userName: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: 'user', message: 200 };

    return of(null).pipe(mergeMap(() => {

      console.log(request)

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




      return next.handle(request);

    }))

      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
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

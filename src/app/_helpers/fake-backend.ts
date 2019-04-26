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
            token: 'fake-jwt-token',
            businessId: '1',
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          // else return 400 bad request
          return throwError({ error: { message: 'Username or password is incorrect' } });
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

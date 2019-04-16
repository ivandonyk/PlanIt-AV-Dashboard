import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import {AddBuildingApiModel} from '../../model/addBuildingApiModel';
import {catchError, retry} from 'rxjs/operators';
import {HandleError} from '../../http-error-handler.service';

//TODO - Error handling...send message back to screen?? or route to error page

@Injectable({
  providedIn: 'root'
})
export class AddBuildingService {

   baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient ) {


  }

  addBuilding(addBuildingApiModel: AddBuildingApiModel) {

    const addBuildingApi = '/addBuilding';

    console.log('Addbuildingmodule is: ', addBuildingApiModel);

    console.log('After stringify', JSON.stringify(addBuildingApiModel));

    const object = JSON.stringify(addBuildingApiModel);

    console.log('object is', object);

    // return this.httpClient.post('http://localhost:5000/addBuilding', {
    // return this.httpClient.post(`${this.baseUrl}${addBuildingApi}`, {object})
    //   .subscribe(
    //     data => {
    //       console.log('Post call successful', data);
    //     });
    const header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.baseUrl}${addBuildingApi}`, object, {headers: header})
    .pipe(
      retry(1),
      // catchError(this.handleError())
    )
      .subscribe((response: Response) => {

        console.log(response);
      },
      err => {
        // this.routers.navigate(['error']);
        console.log('Error from server', err);
        // sessionStorage.setItem('Error', 'this error sucks');
      });


  }
}



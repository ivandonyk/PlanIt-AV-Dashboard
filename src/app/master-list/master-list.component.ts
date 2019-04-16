import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  building: string;
  room: string;
  roomType: string;
  equipmentType: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {room: 'Conference Room 1', building: 'Building 1', roomType: "Conference", equipmentType: 'Camera'},
  {room: 'Room 256', building: 'Dale Building', roomType: "Boudoir", equipmentType: 'TV'},
  {room: 'Room 525', building: 'Tall Building', roomType: "office", equipmentType: 'Cool stereo'},
  {room: 'TV Room 1', building: 'Cbus Downtown', roomType: "Conference", equipmentType: 'speaker'},
  {room: 'Basement Room 1', building: 'Short building', roomType: "office", equipmentType: 'output card'},
  {room: 'Control Room', building: 'test building', roomType: "Conference", equipmentType: 'DM receiver'},
  {room: 'Relaxation Room', building: 'brown building', roomType: "bathroom", equipmentType: 'Camera'},
  {room: 'Breakout Room', building: 'red building', roomType: "Conference", equipmentType: 'touch panel'},
  {room: 'Room 17', building: 'Building 1258', roomType: "test", equipmentType: 'monitor'},
  {room: 'Room 71', building: '745 red stag', roomType: "Conference", equipmentType: 'iMac'},
  {room: 'Area 51', building: 'Cool Building', roomType: "Conference", equipmentType: 'computer'},
]


@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {

  displayedColumns: string[] = ['building', 'room', 'roomType', 'equipmentType'];
  dataSource = ELEMENT_DATA;


  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {

    console.log("In ngOnInit MasterListComponent");
    // this.http.get('http://localhost:8080/PlanItAv/getMessage').subscribe(
     
    //   data =>  {console.log(data);
    //   }
    // )
    
  }


}

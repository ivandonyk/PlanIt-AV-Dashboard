import { Component, OnInit, ViewChild } from '@angular/core';
import {Slides, RoomDetails, Room, Buildings, Rooms} from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import {MatSort, MatTableDataSource } from '@angular/material';
import { GlobalVarsHelper } from '../../_helpers/global-vars';

@Component({
  selector: 'app-systems',
  templateUrl: 'systems.component.html',
  styleUrls: ['./systems.component.scss']
})

export class SystemsComponent implements OnInit {
  public dataSlides: any = [];
  public dataRooms: Array<Room> = [];
  public currentBuilding: Number | String;
  public currentSlides: Slides = {
    index: 0,
    slides: []
  };
  public roomModalShown: Boolean = false;
  public displayedColumns: string[] = ['colorCode', 'roomName', 'coreAge', 'equipmentAge', 'replace', 'lastInstall'];
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper

  ) { }

  ngOnInit() {
    this.globalVars.spinner = true;

    this.systServ.getBuildings()
      .subscribe((data: Buildings) => {
      this.dataSlides = data.systemBuilding.buildings;
        this.dataSlides.forEach((item, index) => {
          this.currentSlides['index'] = 2;
          if (index <= 2) {
            this.currentSlides['slides'].push(item);
          }
        });
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;

      });
  }
  previousSlide() {
    if ((this.currentSlides.index - 3) >= 0) {
      this.currentSlides['slides'].unshift(this.dataSlides[this.currentSlides.index - 3]);
      --this.currentSlides.index;
      this.currentSlides['slides'].pop();
    } else {
      this.currentSlides.index = this.dataSlides.length + 2;
      this.currentSlides['slides'].unshift(this.dataSlides[this.currentSlides.index - 3]);
      --this.currentSlides.index;
      this.currentSlides['slides'].pop();
    }
  }
  nextSlide() {
    if (this.currentSlides.index < (this.dataSlides.length - 1)) {
      ++this.currentSlides.index;
      this.currentSlides['slides'].push(this.dataSlides[this.currentSlides.index]);
      this.currentSlides['slides'].shift();
    } else {
      this.currentSlides.index = 0;
      this.currentSlides['slides'].shift();
      this.currentSlides['slides'].push(this.dataSlides[this.currentSlides.index]);
    }
  }
  openBuildingDetail(id: number | string) {
    this.globalVars.spinner = true;
    this.currentBuilding = id;
    this.systServ.getBuildingRooms(id)
      .subscribe((data: Rooms) => {
        this.dataRooms = data.rooms;
        this.dataSource = new MatTableDataSource(this.dataRooms);
        this.dataSource.sort = this.sort;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }

  opemRoomDetailed(status?: boolean, id?: number) {
    if (!status) {
      this.roomModalShown = false;
    } else {
      this.globalVars.spinner = true;
      this.systServ.getRoomDetails(id)
        .subscribe((data: RoomDetails) => {
          console.log(data);
          this.globalVars.spinner = false;
          this.roomModalShown = true;
        }, error => {
          this.globalVars.spinner = false;
          console.log(error);
        });
    }
  }


}

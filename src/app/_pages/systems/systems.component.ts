import { Component, OnInit, ViewChild } from '@angular/core';
import {Slides, SlideData, Room} from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import {MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-systems',
  templateUrl: 'systems.component.html',
  styleUrls: ['./systems.component.scss']
})

export class SystemsComponent implements OnInit {
  public dataSlides: Array<SlideData> = [];
  public dataRooms: Array<Room> = [];
  public currentBuilding: Number | String;
  public currentSlides: Slides = {
    index: 0,
    slides: []
  };

  public displayedColumns: string[] = ['colorCode', 'roomName', 'coreAge', 'equipmentAge', 'replace', 'lastInstall'];
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private systServ: SystemsService
  ) { }

  ngOnInit() {
    this.systServ.getBuildings()
      .subscribe((data: SlideData[]) => {
        this.dataSlides = data;
        this.dataSlides.forEach((item, index) => {
          this.currentSlides['index'] = 2;
          if (index <= 2) {
            this.currentSlides['slides'].push(item);
          }

        });
      }, error => {
        console.log(error);
      });
  }
  previousSlide() {
    if ((this.currentSlides.index - 3) >= 0){
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
    this.currentBuilding = id;
    this.systServ.getBuildingRooms(id)
      .subscribe((data: Room[]) => {
        this.dataRooms = data;
        this.dataSource = new MatTableDataSource(this.dataRooms);
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
  }

}

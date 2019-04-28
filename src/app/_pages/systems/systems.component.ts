import { Component, OnInit, ViewChild } from '@angular/core';
import {Slides, RoomDetails, Room, Buildings, Rooms} from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import {MatSort, MatTableDataSource } from '@angular/material';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Lightbox } from 'ngx-lightbox';


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
  public roomModalShownEdit: Boolean = false;
  public displayedColumns: string[] = ['colorCode', 'roomName', 'coreAge', 'equipmentAge', 'replace', 'lastInstall'];
  public dataSource: any;
  public roomDetailImages: Array<{src: string, caption: string, thumb: string}> = [{
    src: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
    caption: '',
    thumb: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
  }, {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDD_qoA8zJjQVOhDVWfjrJqowwJkfCC1v4ZPG8ZIPkLuW3gv',
    caption: '',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDD_qoA8zJjQVOhDVWfjrJqowwJkfCC1v4ZPG8ZIPkLuW3gv',
  }, {
    src: 'http://www.letsgodigital.org/images/producten/3376/pictures/canon-eos-sample-photo.jpg',
    caption: '',
    thumb: 'http://www.letsgodigital.org/images/producten/3376/pictures/canon-eos-sample-photo.jpg',
  }, {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    caption: '',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
  }, {
    src: 'http://eastmainstream.com/mmc/amintalati/wp-content/uploads/2018/02/Nikon-1-V3-sample-photo.jpg',
    caption: '',
    thumb: 'http://eastmainstream.com/mmc/amintalati/wp-content/uploads/2018/02/Nikon-1-V3-sample-photo.jpg',
  }, {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVov4yj9BfRY0sxaEvC0NjnYsfMiF-opuwGUSQAcOUzbrXxn3',
    caption: '',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVov4yj9BfRY0sxaEvC0NjnYsfMiF-opuwGUSQAcOUzbrXxn3',
  }, {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    caption: '',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
  }, {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyO85yZAkJjTAikilDYHh9BW6W1ptYzf_HgT26fXi-KsCkVjI',
    caption: '',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyO85yZAkJjTAikilDYHh9BW6W1ptYzf_HgT26fXi-KsCkVjI',
  }, {
    src: 'https://i.ytimg.com/vi/DeXVlumJ2uQ/maxresdefault.jpg',
    caption: '',
    thumb: 'https://i.ytimg.com/vi/DeXVlumJ2uQ/maxresdefault.jpg',
  }, {
    src: 'https://i.ytimg.com/vi/6_Wq1_bTcX8/maxresdefault.jpg',
    caption: '',
    thumb: 'https://i.ytimg.com/vi/6_Wq1_bTcX8/maxresdefault.jpg',
  }, {
    src: 'https://i.ytimg.com/vi/QrBOEVIW_zM/maxresdefault.jpg',
    caption: '',
    thumb: 'https://i.ytimg.com/vi/QrBOEVIW_zM/maxresdefault.jpg',
  }, {
    src: 'https://i.ytimg.com/vi/RFywGWm8JV8/maxresdefault.jpg',
    caption: '',
    thumb: 'https://i.ytimg.com/vi/RFywGWm8JV8/maxresdefault.jpg',
  }, {
    src: 'https://i.ytimg.com/vi/wfVQRWNYVTo/maxresdefault.jpg',
    caption: '',
    thumb: 'https://i.ytimg.com/vi/wfVQRWNYVTo/maxresdefault.jpg',
  }
  ];
  public form: FormGroup;
  public mainPictureIndex: number = 0;
  public roomId: number = null;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private lightbox: Lightbox


  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      roomName: [''],
      tier: [''],
      floor: [''],
      dateOfLastRemodel: [''],
      integrator: [''],
      seatingType: [''],
      seatingCapacity: [''],
      dimensions: [''],
      ceilingHeight: [''],
      ceilingType: [''],
      origAvInstallDate: [''],
      origAvSystemCost: [''],
      origAvContractor: [''],
      avLastUpdateDate: [''],
      avLastUpdateCost: [''],
      lastAvContractor: [''],
      nextAvUpdateDt: [''],
      nextAvUpdCost: [''],
      notes: [''],
    });
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
  get f() { return this.form.controls; }
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
      this.roomId = null;
    } else {
      this.roomId = id;
      this.globalVars.spinner = true;
      this.systServ.getRoomDetails(id)
        .subscribe((data: RoomDetails) => {
          console.log(data);

          this.form = this.formBuilder.group({
            roomName: [data.roomName],
            tier: [data.tier],
            floor: [data.floor],
            dateOfLastRemodel: [moment(data.dateOfLastRemodel).toISOString()],
            integrator: [data.integrator],
            seatingType: [data.seatingType],
            seatingCapacity: [data.seatingCapacity],
            dimensions: [data.dimensions],
            ceilingHeight: [data.ceilingHeight],
            ceilingType: [data.ceilingType],
            origAvInstallDate: [moment(data.origAvInstallDate).toISOString()],
            origAvSystemCost: [data.origAvSystemCost],
            origAvContractor: [data.origAvContractor],
            avLastUpdateDate: [moment(data.avLastUpdateDate).toISOString()],
            avLastUpdateCost: [data.avLastUpdateCost],
            lastAvContractor: [data.lastAvContractor],
            nextAvUpdateDt: [moment(data.nextAvUpdateDt).toISOString()],
            nextAvUpdCost: [data.nextAvUpdCost],
            notes: [data.notes],
          });

          console.log(this.form.controls);

          this.globalVars.spinner = false;
          this.roomModalShown = true;
        }, error => {
          this.globalVars.spinner = false;
          console.log(error);
        });
    }
  }
  previousSlideRoom() {
    if (this.mainPictureIndex !== 0) {
      --this.mainPictureIndex;
    } else {
      this.mainPictureIndex =  this.roomDetailImages.length - 1;
    }

  }
  nextSlideRoom() {

    if (this.mainPictureIndex < this.roomDetailImages.length - 1) {
      ++this.mainPictureIndex;
    } else {
      this.mainPictureIndex = 0;
    }

  }

  openImage(imageIndex): void {
    this.lightbox.open(this.roomDetailImages, imageIndex);
  }
}

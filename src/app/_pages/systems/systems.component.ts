import { Component, OnInit } from '@angular/core';
import { Slides, RoomDetails, Room, Buildings, Rooms, Equipment, RoomDTO } from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddNoteComponent } from '../../_components/add-note/add-note.component';
import { AddPhotosComponent } from '../../_components/upload-photos/upload-photos.component';
import { UploadDocumentComponent } from '../../_components/upload-document/upload-document.component';
import * as moment from 'moment';
import { ConfirmModalComponent } from '../../_components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-systems',
  templateUrl: 'systems.component.html',
  styleUrls: ['./systems.component.scss']
})

export class SystemsComponent implements OnInit {
  public dataSlides: any = [];
  public dataRooms: Array<Room> = [];
  public roomDetailData: RoomDetails;
  public currentBuilding: Number | String;
  public currentSlides: Slides = {
    index: 0,
    slides: []
  };
  public roomModalShown: Boolean = false;
  public roomModalShownEdit: Boolean = false;
  public displayedColumns: string = JSON.stringify([
    {
      key: 'roomName',
      title: 'Room',
    },
    {
      key: 'coreAge',
      title: 'Core Age',
    },
    {
      key: 'equipmentAge',
      title: 'Equipment Age',
    },
    {
      key: 'lastInstall',
      title: 'Last Install',
    },
    {
      key: 'lifecycle',
      title: 'Lifecycle',
    },
    {
      key: 'replace',
      title: 'Replace/Upgrade',
    }]);
  public dataRoomSource: string;
  public dataSource: string;
  public roomDetailImages: string = JSON.stringify([
    {
      path: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDD_qoA8zJjQVOhDVWfjrJqowwJkfCC1v4ZPG8ZIPkLuW3gv',
    }, {
      path: 'http://www.letsgodigital.org/images/producten/3376/pictures/canon-eos-sample-photo.jpg',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    }, {
      path: 'http://eastmainstream.com/mmc/amintalati/wp-content/uploads/2018/02/Nikon-1-V3-sample-photo.jpg',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVov4yj9BfRY0sxaEvC0NjnYsfMiF-opuwGUSQAcOUzbrXxn3',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyO85yZAkJjTAikilDYHh9BW6W1ptYzf_HgT26fXi-KsCkVjI',
    }, {
      path: 'https://i.ytimg.com/vi/DeXVlumJ2uQ/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/6_Wq1_bTcX8/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/QrBOEVIW_zM/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/RFywGWm8JV8/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/wfVQRWNYVTo/maxresdefault.jpg',
    }
  ]);
  public form: FormGroup;
  public roomId: number = null;
  public equipments: Equipment[] = [];
  public equipmentsString: string;
  public displayedColumnsEquipments: string = JSON.stringify([
    {
      key: 'manufacturer',
      title: 'Manufacturer',
    },
    {
      key: 'modelNumber',
      title: 'Model/Part',
    },
    {
      key: 'description',
      title: 'Description',
    },
    {
      key: 'equipmentClass',
      title: 'Class',
    },
    {
      key: 'category',
      title: 'Category',
    },
    {
      key: 'lifecycle',
      title: 'Lifecycle',
    },
    {
      key: 'installDate',
      title: 'Install Date',
    },
    {
      key: 'building',
      title: 'Building',
    },
    {
      key: 'room',
      title: 'Room',
    }

    ]);
  public equipmentId: number;

  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
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
      coreAge: [''],
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
      lifecycle: [''],
      roomType: [''],
    });
    this.globalVars.spinner = true;

    this.getRoooms();
    this.getAllEquipments();
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
  get f() {
    return this.form.value;
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
    this.dataSource = '';
    this.globalVars.spinner = true;
    this.currentBuilding = id;
    this.systServ.getBuildingRooms(id)
      .subscribe((data: Rooms) => {
        this.dataRooms = data.rooms;
        this.dataSource = JSON.stringify(this.dataRooms);
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }
  getRoooms() {
    this.globalVars.spinner = true;
    this.systServ.getRoooms()
      .subscribe((data: Rooms) => {
        this.dataRoomSource = JSON.stringify(data.rooms);
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }
  getAllEquipments() {
    this.globalVars.spinner = true;
    this.systServ.getAllEquipments()
      .subscribe((data: Equipment[]) => {
        this.equipmentsString = JSON.stringify(data);
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
          this.roomDetailData = data;
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
            coreAge: [data.coreAge],
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
            lifecycle: [data.lifecycle],
            roomType: '',
          });
          this.globalVars.spinner = false;
          this.roomModalShown = true;

        }, error => {
          this.globalVars.spinner = false;
          console.log(error);
        });
    }
  }
  expand(roomId) {
    window.open(window.location.origin + '/home/room-detail/' + this.currentBuilding + '/' + roomId);
  }
  getEquipmentsRoom(id) {
    this.globalVars.spinner = true;

    this.systServ.getEquipments(id)
      .subscribe((data: Equipment) => {
        this.equipments.push(data[0]);

        if (this.dataRooms.length === this.equipments.length){
          // this.equipmentsString = JSON.stringify(this.equipments);
        }
        this.globalVars.spinner = false;
      }, error => {
      console.log(error);
        this.globalVars.spinner = false;
      });
  }
  changedTub(event) {
    if (event === 2) {
      this.equipments = [];
      this.dataRooms.forEach((item) => {
        this.getEquipmentsRoom(item.roomId);
      });
    }
  }
  opemEquipmentDetailed( id?: number) {
    this.equipmentId = 1;
  }
  openDialogAddPhoto(): void {
    const dialogRef = this.dialog.open(AddPhotosComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
  }
  openDialogAddNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  openDialogUploadDocument(): void {
    const dialogRef = this.dialog.open(UploadDocumentComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
  }
  updateRoom() {
    this.globalVars.spinner = true;
    const room: RoomDTO = {
      avLastUpdateCost: Number(this.f.avLastUpdateCost),
      avLastUpdateDate: moment(this.f.avLastUpdateDate).toISOString(),
      ceilingHeight: Number(this.f.ceilingHeight),
      ceilingType: String(this.f.ceilingType),
      dateOfLastRemodel: moment(this.f.dateOfLastRemodel).toISOString(),
      dimensions: String(this.f.dimensions),
      floor: Number(this.f.floor),
      integrator: String(this.f.integrator),
      lastAvContractor: String(this.f.lastAvContractor),
      lifecycle: Number(this.f.lifecycle),
      nextAvUpdCost: Number(this.f.nextAvUpdCost),
      nextAvUpdateDt: moment(this.f.nextAvUpdateDt).toISOString(),
      notes: String(this.f.notes),
      origAvContractor: String(this.f.origAvContractor),
      origAvInstallDate: moment(this.f.origAvInstallDate).toISOString(),
      origAvSystemCost: Number(this.f.origAvSystemCost),
      roomName: String(this.f.roomName),
      seatingCapacity: Number(this.f.seatingCapacity),
      seatingType: String(this.f.seatingType),
      tier: Number(this.f.tier),
      buildingId: Number(this.currentBuilding),
      roomId: Number(this.roomId),
      roomType: String(this.f.roomType),
    };

    this.systServ.updateRoom(room)
      .subscribe( data => {
        this.snackbar.open('Room Saved', '', {
            duration: 1500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          }
        );
        this.globalVars.spinner = false;
        this.roomModalShownEdit = false;
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
      });
  }
  confirmCancel(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.roomModalShownEdit = false;
    });
  }
}

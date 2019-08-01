import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Slides, RoomDetails, Room, Buildings, Rooms, Equipment, RoomDTO, SlideData} from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddNoteComponent } from '../../_components/add-note/add-note.component';
import { AddPhotosComponent } from '../../_components/upload-photos/upload-photos.component';
import { UploadDocumentComponent } from '../../_components/upload-document/upload-document.component';
import * as moment from 'moment';
import { ConfirmModalComponent } from '../../_components/confirm-modal/confirm-modal.component';
import {AddProjectDescComponent} from '../../_components/add-project-desc/add-project-desc.component';
import {AddRoomComponent} from '../../_components/add-room/add-room.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {AddEquipmentComponent} from '../../_components/add-equipment/add-equipment.component';
import {AddBuildingComponent} from '../../_components/add-building/add-building.component';
import Siema from 'siema';
import {AuthenticationService} from '../../_services/authentication.service';


@Component({
  selector: 'app-systems',
  templateUrl: 'systems.component.html',
  styleUrls: ['./systems.component.scss']
})

export class SystemsComponent implements OnInit {
  public dataSlides: SlideData[] = [];
  public equipmentsLocal: String = '0';
  public dataRooms: Array<Room> = [];
  public roomDetailData: RoomDetails;
  public currentBuilding: Number | String;
  public currentSlides: Slides = {
    index: 0,
    slides: []
  };
  public roomModalShown: Boolean = false;
  public roomModalShownEdit: Boolean = false;
  public isRoomFormChanged: Boolean = false;
  public displayedColumns: string = JSON.stringify([
    {
      key: 'buildingName',
      title: 'Building',
    },
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
  public roomDetailImages: String = ''
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
  public displayedLocalColumnsEquipments: string = JSON.stringify([
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
    }

    ]);
  public equipmentId: number;
  public documents: any;
  public projectDesc: any;
  public roomHist: any;
  public mySiema: any;
  public sliderFlag: Boolean = false;
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public authServ: AuthenticationService,
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

    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    this.getRoooms();
    this.getAllEquipments();
    this.systServ.getBuildings()
      .subscribe((data: Buildings) => {
      for (let i = 0; i < data.systemBuilding.buildings.length; i++) {
        this.dataSlides.push(data.systemBuilding.buildings[i]);
      }
      setTimeout( () => {
        this.mySiema = new Siema({
          selector: '.siema',
          duration: 200,
          easing: 'ease-out',
          perPage: {
            768: 1,
            1024: 2,
            1280: 4,
          },
          startIndex: 0,
          loop: true,
          rtl: false,
        });
      }, 200);
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  get f() {
    return this.form.value;
  }
  previousSlide() {
    this.mySiema.prev();

  }
  nextSlide() {
    this.mySiema.next();

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
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
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
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  getAllEquipments() {
    this.equipmentsString = '';
    this.globalVars.spinner = true;
    this.systServ.getAllEquipments()
      .subscribe((data: Equipment[]) => {
        this.equipmentsString = JSON.stringify(data);
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  getRoomDet() {
    this.isRoomFormChanged = false;
    this.systServ.getRoomDetails(this.roomId)
      .subscribe((data: RoomDetails) => {
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
          roomType: [data.roomType],
        });
        this.equipmentsLocal = '0';
        const imgArr = [];
        if (data.images.length > 0) {
          data.images.forEach(item => {
            imgArr.push({
              'path': item
            });
          });
          this.roomDetailImages = JSON.stringify(imgArr);
        } else {
          this.roomDetailImages = JSON.stringify([]);
        }

        this.form.statusChanges
          .subscribe(value => {
            this.isRoomFormChanged = true;
          }, error => {
            console.log(error);
            if (error.error.error === 'invalid_token') {
              this.authServ.logout();
            }
          });
        this.getDocuments(this.roomId);
        this.getProjectDesc(this.roomId);
        this.getRoomHist(this.roomId);
        this.getEquipment(this.roomId);
        this.globalVars.spinner = false;
        this.roomModalShown = true;
        this.roomModalShownEdit = false;

      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  opemRoomDetailed(status?: boolean, id?: number) {
    if (!status) {
      this.roomModalShown = false;
      this.roomModalShownEdit = false;
      this.roomId = null;
    } else {
      this.roomId = id;
      this.globalVars.spinner = true;
      this.getRoomDet();
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

        if (this.dataRooms.length === this.equipments.length) {
          // this.equipmentsString = JSON.stringify(this.equipments);
        }
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
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
  opemEquipmentDetailed(status, id?: number) {
    this.equipmentId = id;
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
    });
  }
  openDialogAddProjectDesc() {
    const dialogRef = this.dialog.open(AddProjectDescComponent, {
      data: {
        projectDesc: this.projectDesc,
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getEquipment(roomId) {
    this.globalVars.spinner = true;
    this.systServ.getEquipments(roomId)
      .subscribe((data: Array<{
        equipmentId: number;
        manualIcon: boolean;
        photoIcon: boolean;
        colorCode: any;
        manufacturer: string;
        modelNumber: string;
        description: string;
        equipmentClass: string;
        category: string;
        lifecycle: string | number;
        installDate: string;
        building: string;
        room: string;
      }>) => {

        if (data.length > 0) {
          this.equipmentsLocal = JSON.stringify(data);
        } else {
          this.equipmentsLocal = '0';

        }

        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }


  addRoom(id) {
    this.dialog.open(AddRoomComponent, {
      data: {
        buildingId: id
      }
    });
  }

  editBuilding(id) {
    this.dialog.open(AddBuildingComponent, {
      data: {
        buildingId: id
      }
    });
  }



  addEquipment() {
    this.dialog.open(AddEquipmentComponent, {
      data: {
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
  }

  updateEquipmen() {
    this.getAllEquipments();
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
        this.roomModalShownEdit = false;
        this.getRoomDet();
        this.globalVars.spinner = false;
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  confirmCancel(): void {
    if (this.isRoomFormChanged === true) {
      const dialogRef = this.dialog.open(ConfirmModalComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.updateRoom();
        } else {
          this.roomModalShownEdit = false;
        }
      });
    } else {
      this.roomModalShownEdit = false;
    }

  }
  getDocuments(roomId) {
    this.globalVars.spinner = true;
    this.systServ.getDocuments(roomId)
      .subscribe((data) => {
        this.documents = data['documents'];
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  getProjectDesc(roomId) {
    this.globalVars.spinner = true;
    this.systServ.getProjectDesc(roomId)
      .subscribe((data) => {
        this.projectDesc = data['projectDescriptionList'];
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  getRoomHist(roomId) {
    this.globalVars.spinner = true;
    this.systServ.getRoomHist(roomId)
      .subscribe((data) => {
        this.roomHist = data['historyList'];
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
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
  openDialogUploadDocument(): void {
    const dialogRef = this.dialog.open(UploadDocumentComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
  }



  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


  trackByFn(index, item) {
    return index;
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { SystemsService } from '../../_services/systems.service';
import {RoomDetails, RoomDTO} from '../../_models/systems.model';
import { Lightbox } from 'ngx-lightbox';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmModalComponent } from '../../_components/confirm-modal/confirm-modal.component';
import {AddPhotosComponent} from '../../_components/upload-photos/upload-photos.component';
import {AddNoteComponent} from '../../_components/add-note/add-note.component';
import {UploadDocumentComponent} from '../../_components/upload-document/upload-document.component';
import {AddProjectDescComponent} from '../../_components/add-project-desc/add-project-desc.component';
import {AddEquipmentComponent} from '../../_components/add-equipment/add-equipment.component';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.scss']
})

export class RoomdetailComponent implements OnInit {
  public roomDetailImages: String = '';
  public form: FormGroup;
  public roomModalShownEdit: Boolean = false;
  public roomDetailData: RoomDetails;
  public roomId: number | string = window.location.pathname.split('/')[4];
  public buildingId: number | string = window.location.pathname.split('/')[3];
  public documents: any;
  public projectDesc: any;
  public roomHist: any;
  public currentBuilding: Number | String = window.location.pathname.split('/')[3];
  public equipmentsLocal: String = '0';
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

  public roomType: string[] = [
    'Conference Room', 'Classroom', 'Boardroom', 'Huddle Room',
    'Conference Center', 'Lobby', 'Hallway',
  ];
  public seatingTypes: string[] = [
    'Conference', 'Table', 'Fixed Classroom', 'Flexible', 'Theater'
  ];
  public ceilingTypes: string[] = [
    'Drywall', 'Drop', 'Open', 'Bar-joist', 'Combination'
  ];


  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private lightbox: Lightbox,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    public authServ: AuthenticationService,

  ) {}

  ngOnInit() {
    this.opemRoomDetailed(this.roomId);
    this.getDocuments(this.roomId);
    this.getProjectDesc(this.roomId);
    this.getRoomHist(this.roomId);
  }
  get f() {
    return this.form.value;
  }


  opemRoomDetailed( id?: number | string) {
      this.globalVars.spinner = true;
      this.systServ.getRoomDetails(id)
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
            origAvInstallDate: [moment(data.origAvInstallDate ).toISOString()],
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

          const imgArr = [];
          if (data.images.length > 0) {
            // data.images.forEach(item => {
            //   imgArr.push({
            //     'path': item
            //   });
            // });
            this.roomDetailImages = JSON.stringify(data.images);

          } else {
            this.roomDetailImages = JSON.stringify([]);
          }


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
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.opemRoomDetailed(this.roomId);
      this.getDocuments(this.roomId);
      this.getProjectDesc(this.roomId);
      this.getRoomHist(this.roomId);
      this.roomModalShownEdit = false;
    });
  }

  openDialogAddNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.buildingId,
      }
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

  getRoomDet() {
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

        this.getDocuments(this.roomId);
        this.getProjectDesc(this.roomId);
        this.getRoomHist(this.roomId);
        this.getEquipment(this.roomId);
        this.globalVars.spinner = false;
        this.roomModalShownEdit = false;

      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
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

  openDialogAddProjectDesc() {
    const dialogRef = this.dialog.open(AddProjectDescComponent, {
      width: '80%',
      data: {
        projectDesc: this.projectDesc,
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProjectDesc(this.roomId);
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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

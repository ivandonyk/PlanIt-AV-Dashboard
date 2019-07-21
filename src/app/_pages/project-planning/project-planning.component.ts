import { Component } from '@angular/core';
import { ProjectPlanningService } from '../../_services/project-planning.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { ProjectPlanList, ProjectPlan, ProjPlanDetailObj } from '../../_models/project-plannings.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RoomDetails, RoomDTO} from '../../_models/systems.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import {SystemsService} from '../../_services/systems.service';
import {AddNoteComponent} from '../../_components/add-note/add-note.component';
import {AddPhotosComponent} from '../../_components/upload-photos/upload-photos.component';
import {UploadDocumentComponent} from '../../_components/upload-document/upload-document.component';
import {ConfirmModalComponent} from '../../_components/confirm-modal/confirm-modal.component';
import {PrintDialogComponent} from '../../_components/print-dialog/print-dialog.component';
import {AddProjectDescComponent} from "../../_components/add-project-desc/add-project-desc.component";
import {AddEquipmentComponent} from "../../_components/add-equipment/add-equipment.component";

@Component({
  selector: 'app-project-planning',
  templateUrl: 'project-planning.component.html',
  styleUrls: ['./project-planning.component.scss']
})
export class ProjectPlanningComponent {
  public single: Array<{name: string, value: number}> = [];
  public ProjPlanSum: ProjectPlan[];
  public view: Array<number> = [300, 200];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public roundEdges = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public roomId: number = null;
  public currentBuilding: Number = 1;
  public yearsRange: object = {};
  public equipmentsLocal: string = '0';
  public documents: any;
  public projectDesc: any;
  public roomHist: any;
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

  public colorScheme = {
    domain: ['#fa0006']
   };
  public roomDetailImages: string = JSON.stringify([
    {
      path: 'http://rgho.st/7grz5TWyD/image.png',
    },
    {
      path: 'http://rgho.st/8nyCMrhll/image.png',
    },
    {
      path: 'http://rgho.st/8jbyWsDQb/image.png',
    },
    {
      path: 'http://rgho.st/8ytmtzhWC/image.png',
    },
    {
      path: 'http://rgho.st/7k8wxbH7Q/image.png',
    },
    {
      path: 'http://rgho.st/6mjjRhxVY/image.png',
    },
    {
      path: 'http://rgho.st/7k8wxbH7Q/image.png',
    },
    {
      path: 'http://rgho.st/7bb8yYqJl/image.png',
    },
    {
      path: 'http://rgho.st/7JlZ7r5JL/image.png',
    },
    {
      path: 'http://rgho.st/7BpkM8Ts7/image.png',
    },
    {
      path: 'http://rgho.st/7yjj7y9Td/image.png',
    },
    {
      path: 'http://rgho.st/74mmXys6l/image.png',
    },
  ]);
  public roomDetailData: RoomDetails;
  public roomModalShown: Boolean = false;
  public roomModalShownEdit: Boolean = false;
  public tableData: any = {};
  public form: FormGroup;
  public columnsHeader: string = JSON.stringify([
    {
      key: 'building',
      title: 'Building'
    },
    {
      key: 'room',
      title: 'Room'
    },
    {
      key: 'type',
      title: 'Type'
    },
    {
      key: 'tier',
      title: 'Tier'
    },
    {
      key: 'coreAge',
      title: 'Core Age'
    },
    {
      key: 'equipmentAge',
      title: 'Equipment Age'
    },
    {
      key: 'projectedCost',
      title: 'Projected Cost'
    },
  ]);
  public ProjPlanSumData: any;

  constructor(
    private projectPlanningServ: ProjectPlanningService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private systServ: SystemsService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog,

  ) {
    this.globalVars.spinner = true;
    this.getProjPlanSum();
    // setInterval(() => {
    //   this.getProjPlanSum();
    //
    // }, 15000);

  }

  openDialogPrint(): void {
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      data: {
        years: {
          start: this.ProjPlanSumData.startYear,
          end: this.ProjPlanSumData.endYear,
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  onSelect(event) {
    console.log(event);
  }
  getProjPlanSum() {
    this.projectPlanningServ.getProjPlanSum()
      .subscribe((data: ProjectPlanList) => {
        this.ProjPlanSum = data.projectPlanList;
        this.ProjPlanSumData = data;
        data.projectPlanList.forEach((item) => {
          if (item.year != null) {
            this.single.push({
              name: item.year,
              value: item.amount
            });
            Object.assign(this, this.single);
            setTimeout(() => {
              const textArr = document.querySelectorAll('ngx-charts-bar-vertical text');
              for (let i = 0; i < textArr.length; i++) {
                textArr[i].innerHTML = textArr[i].innerHTML.replace(/[^0-9]/g, '');
              }
            }, 200);
          }

        });
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;

      });

  }
  getProjPlanDetail(year) {
    // this.tableData = {};
    this.globalVars.spinner = true;
    this.projectPlanningServ.getProjPlanDetail(year)
      .subscribe((data: ProjPlanDetailObj) => {
        this.tableData['data_' + year] = JSON.stringify(data.projectPlanDetailList);
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }
  get f() {
    return this.form.value;
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
            roomType: [data.roomType],

          });
          this.equipmentsLocal = '0';

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
        });
    }

  }
  expand(roomId) {
    window.open(window.location.origin + '/home/room-detail/' + this.currentBuilding + '/' + roomId);
  }
  confirmCancel(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.roomModalShownEdit = false;
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
      });
  }
  getRoomDet() {
    this.systServ.getRoomDetails(this.roomId)
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
          roomType: [data.roomType],
        });
        this.equipmentsLocal = '0';

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
  addEquipment() {
    this.dialog.open(AddEquipmentComponent, {
      data: {
        roomId: this.roomId,
        buildingId: this.currentBuilding,
      }
    });
  }

}



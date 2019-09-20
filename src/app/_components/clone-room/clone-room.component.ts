import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {UploadDocumentComponent} from '../upload-document/upload-document.component';
import {AddPhotosComponent} from '../upload-photos/upload-photos.component';
import {AddNoteComponent} from '../add-note/add-note.component';
import {BuildingsIds, Rooms} from '../../_models/systems.model';
import * as moment from 'moment';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-clone-room',
  templateUrl: './clone-room.component.html',
  styleUrls: ['./clone-room.component.scss']
})
export class CloneRoomComponent implements OnInit {
  public cloneRoomForm = this.fb.group({
    buildingId: new FormControl(''),
    buildings: new FormControl(''),
    newBuilding: new FormControl(''),
    roomOld: new FormControl(''),
    roomChooseName: new FormControl(''),
    roomName: new FormControl(''),
    tier: new FormControl(''),
    coreAge: new FormControl(''),
    floor: new FormControl(''),
    dateOfLastRemodel: new FormControl(''),
    integrator: new FormControl(''),
    roomType: new FormControl(''),
    seatingCapacity: new FormControl(''),
    seatingType: new FormControl(''),
    dimensions: new FormControl('' ),
    ceilingHeight : new FormControl(''),
    ceilingType : new FormControl(''),
    lastInstallDate : new FormControl(''),
    origAvInstallDate : new FormControl(''),
    lifecycle : new FormControl(''),
    origAvSystemCost : new FormControl(''),
    origAvContractor: new FormControl(''),
    avLastUpdateDate: new FormControl(''),
    avLastUpdateCost: new FormControl(''),
    lastAvContractor: new FormControl(''),
    nextAvUpdateDt: new FormControl(''),
    nextAvUpdCost: new FormControl(''),
    notes: new FormControl(''),
    equipmentAge: new FormControl(''),
    replaceUpg: new FormControl(''),
  });
  public roomType: string[] = [
    'Conference Room', 'Classroom', 'Boardroom', 'Huddle Room',
    'Conference Center', 'Lobby', 'Hallway',
  ];
  public tiers: string[] = [
    '1', '2', '3', '4', '5'
  ];
  roomList: any;
  buildingsArr: any;


  public buildings: BuildingsIds[] = [];
  public rooms: any = [];
  public seatingTypes: string[] = [
    'Conference', 'Table', 'Fixed Classroom', 'Flexible', 'Theater'
  ];
  public ceilingTypes: string[] = [
    'Drywall', 'Drop', 'Open', 'Bar-joist', 'Combination'
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CloneRoomComponent>,
    private snackbar: MatSnackBar,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    public authServ: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.systServ.getBuildings()
      .subscribe(data => {
        this.buildingsArr = data.systemBuilding.buildings;
        this.rooms = data.systemBuilding.rooms;
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });


  }
  getRooms() {
    this.systServ.getRoomIds()
      .subscribe((data) => {
        this.roomList = data;
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  revert(e) {
    e.preventDefault()
    this.cloneRoomForm.reset();
  }
  buildingChanged() {
    this.globalVars.spinner = true;

    this.systServ.getBuildingRooms(this.cloneRoomForm.value.buildings)
      .subscribe((data: Rooms) => {
        this.roomList = data.rooms;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }


  onSubmit() {
    console.log(this)
    this.globalVars.spinner = true;
    this.systServ.addRoom(this.cloneRoomForm.value)
      .subscribe(data => {
        this.globalVars.spinner = false;
        this.dialogRef.close();
        this.snackbar.open('Room Added', '', {
            duration: 1500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }


  cancel(e) {
    e.preventDefault()
    this.dialogRef.close();
  }
  get roomName() {
    return this.cloneRoomForm.get('roomName');
  }
  get tier() {
    return this.cloneRoomForm.get('tier');
  }
  getRoomNameErrorMessage() {
    return this.roomName.hasError('required') ? 'Room Name is required' : '';
  }
  getRoomData(event) {
    this.systServ.getRoomDetails(event.value)
      .subscribe(data => {
      this.cloneRoomForm = this.fb.group({
          buildingId: data.buildingId ? data.buildingId : this.cloneRoomForm.value.buildingId,
          buildings: this.cloneRoomForm.value.buildings,
          roomOld: this.cloneRoomForm.value.roomOld,
          roomChooseName: this.cloneRoomForm.value.roomChooseName,
          roomName: data.roomName ? data.roomName : this.cloneRoomForm.value.roomName,
          tier: [String(data.tier)],
          floor: [data.floor],
          roomType: data.roomType ? data.roomType : this.cloneRoomForm.value.roomType,
          coreAge: data.coreAge ? data.coreAge : this.cloneRoomForm.value.coreAge,
          integrator: data.integrator ? data.integrator : this.cloneRoomForm.value.integrator,
          lastInstallDate : data.lastInstallDate  ? moment(data.lastInstallDate).toISOString() : this.cloneRoomForm.value.lastInstallDate ,
          origAvInstallDate : data.origAvInstallDate  ? moment(data.origAvInstallDate).toISOString() : this.cloneRoomForm.value.origAvInstallDate ,
          lifecycle : data.lifecycle  ? data.lifecycle  : this.cloneRoomForm.value.lifecycle ,
          origAvSystemCost : data.origAvSystemCost  ? data.origAvSystemCost  : this.cloneRoomForm.value.origAvSystemCost ,
          origAvContractor: data.origAvContractor ? data.origAvContractor : this.cloneRoomForm.value.origAvContractor,
          avLastUpdateDate: data.avLastUpdateDate ? moment(data.avLastUpdateDate).toISOString() : this.cloneRoomForm.value.avLastUpdateDate,
          avLastUpdateCost: data.avLastUpdateCost ? data.avLastUpdateCost : this.cloneRoomForm.value.avLastUpdateCost,
          lastAvContractor: data.lastAvContractor ? data.lastAvContractor : this.cloneRoomForm.value.lastAvContractor,
          nextAvUpdateDt: data.nextAvUpdateDt ? data.nextAvUpdateDt : this.cloneRoomForm.value.nextAvUpdateDt,
          nextAvUpdCost: data.nextAvUpdCost ? data.nextAvUpdCost : this.cloneRoomForm.value.nextAvUpdCost,
          notes:  this.cloneRoomForm.value.notes,
          newBuilding:  this.cloneRoomForm.value.newBuilding,
          equipmentAge: data.equipmentAge ? data.equipmentAge : this.cloneRoomForm.value.equipmentAge,
          replaceUpg: data.replaceUpg ? data.replaceUpg : this.cloneRoomForm.value.replaceUpg,
          dateOfLastRemodel: data.dateOfLastRemodel ? moment(data.dateOfLastRemodel).toISOString() : moment(this.cloneRoomForm.value.dateOfLastRemodel).toISOString(),
          seatingCapacity: data.seatingCapacity ? data.seatingCapacity : this.cloneRoomForm.value.seatingCapacity,
          seatingType: data.seatingType ? data.seatingType : this.cloneRoomForm.value.seatingType,
          dimensions: data.dimensions ? data.dimensions : this.cloneRoomForm.value.dimensions,
          ceilingHeight : data.ceilingHeight  ? data.ceilingHeight  : this.cloneRoomForm.value.ceilingHeight ,
          ceilingType : data.ceilingType  ? data.ceilingType  : this.cloneRoomForm.value.ceilingType ,
      });

      console.log(this)
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  openDialogAddPhoto(): void {
    const dialogRef = this.dialog.open(AddPhotosComponent, {
      data: {
        form: this.cloneRoomForm.value,
        roomId: '',
        buildingId: '',
      }
    });
  }
  openDialogAddNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: {
        form: this.cloneRoomForm.value,
        roomId: '',
        buildingId: '',
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
        form: this.cloneRoomForm.value,
        roomId: '',
        buildingId: '',
      }
    });
  }




}

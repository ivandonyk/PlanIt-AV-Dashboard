import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableModule} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {UploadDocumentComponent} from '../upload-document/upload-document.component';
import {AddPhotosComponent} from "../upload-photos/upload-photos.component";
import {AddNoteComponent} from "../add-note/add-note.component";
import {BuildingsIds, Rooms} from "../../_models/systems.model";

@Component({
  selector: 'app-clone-room',
  templateUrl: './clone-room.component.html',
  styleUrls: ['./clone-room.component.scss']
})
export class CloneRoomComponent implements OnInit {
  public cloneRoomForm = this.fb.group({
    buildingId: new FormControl(''),
    buildings: new FormControl(''),
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
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.systServ.getBuildings()
      .subscribe(data => {
        this.buildingsArr = data.systemBuilding.buildings;
        this.rooms = data.systemBuilding.rooms;
      }, error => {
        console.log(error);
      });


  }
  getRooms() {
    this.systServ.getRoomIds()
      .subscribe((data) => {
        this.roomList = data;
      }, error2 => {
        console.log(error2);
      });
  }
  revert() {
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
      });
  }


  onSubmit() {
    console.log(this);
    // this.globalVars.spinner = true;
    // this.systServ.addRoom(this.cloneRoomForm.value)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.globalVars.spinner = false;
    //     this.dialogRef.close();
    //     this.snackbar.open('Room Added', '', {
    //         duration: 1500,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'right',
    //       }
    //     );
    //   }, error => {
    //     this.globalVars.spinner = false;
    //     console.log(error);
    //   });
  }


  cancel() {
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
    this.systServ.getRoomDetails(event)
      .subscribe(data => {
      this.cloneRoomForm = this.fb.group({
          roomName: new FormControl(''),
          tier: [data.tier],
          floor: [data.floor],
          roomType: new FormControl(''),
          coreAge: new FormControl(''),
          integrator: new FormControl(''),
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
          dateOfLastRemodel: [''],
          seatingCapacity: new FormControl(''),
          seatingType: new FormControl(''),
          dimensions: new FormControl('' ),
          ceilingHeight : new FormControl(''),
          ceilingType : new FormControl(''),
      });
      }, error => {
        console.log(error);
      });
  }
  openDialogAddPhoto(): void {
    console.log(this)
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

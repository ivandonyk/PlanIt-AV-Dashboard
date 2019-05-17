import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableModule} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {Room} from '../../_models/systems.model';
import {UploadDocumentComponent} from '../upload-document/upload-document.component';
import {AddPhotosComponent} from "../upload-photos/upload-photos.component";
import {AddNoteComponent} from "../add-note/add-note.component";

@Component({
  selector: 'app-add-room',
  templateUrl: './clone-room.component.html',
  styleUrls: ['./clone-room.component.scss']
})
export class CloneRoomComponent implements OnInit {
  public addRoomForm = this.fb.group({
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
  public buildings: string[] = [
    'Orange Building', 'Building 1', 'Secret Building', 'Square Building', 'UFO Building'

  ];
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
        this.rooms = data.systemBuilding.rooms;
      }, error => {
        console.log(error);
      });
  }

  revert() {
    this.addRoomForm.reset();
  }


  onSubmit() {
    console.log(this)
    this.globalVars.spinner = true;
    this.systServ.addRoom(this.addRoomForm.value)
      .subscribe(data => {
        console.log(data);
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
      });
  }


  cancel() {
    this.dialogRef.close();
  }

  get roomName() {
    return this.addRoomForm.get('roomName');
  }

  get tier() {
    return this.addRoomForm.get('tier');
  }

  getRoomNameErrorMessage() {
    return this.roomName.hasError('required') ? 'Room Name is required' : '';
  }

  getRoomData(event) {
    this.systServ.getRoomDetails(event)
      .subscribe(data => {
      this.addRoomForm = this.fb.group({
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
        form: this.addRoomForm.value,
        roomId: '',
        buildingId: '',
      }
    });
  }

  openDialogAddNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: {
        form: this.addRoomForm.value,
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
        form: this.addRoomForm.value,
        roomId: '',
        buildingId: '',
      }
    });
  }




}

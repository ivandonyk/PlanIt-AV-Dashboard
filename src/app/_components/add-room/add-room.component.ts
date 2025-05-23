import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar } from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {BuildingsIds} from '../../_models/systems.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AuthenticationService} from '../../_services/authentication.service';

export interface DialogData {
  buildingId: any;
}

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

public addRoomForm = this.fb.group({
    buildingId: this.data ? this.data.buildingId : new FormControl(''),
    roomName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    tier: new FormControl(''),
    coreAge: new FormControl(''),
    floor: new FormControl(''),
    dateOfLastRemodel: new FormControl(''),
    integrator: new FormControl(''),
    roomType: new FormControl(''),
    seatingCapacity: new FormControl('', Validators.maxLength(11)),
    seatingType: new FormControl(''),
    dimensions: new FormControl('' ),
    ceilingHeight : new FormControl(''),
    ceilingType : new FormControl(''),
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
  public buildings: BuildingsIds[] = [];
  public seatingTypes: string[] = [
    'Conference', 'Table', 'Fixed Classroom', 'Flexible', 'Theater'
  ];
  public ceilingTypes: string[] = [
    'Drywall', 'Drop', 'Open', 'Bar-joist', 'Combination'
  ];

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    public authServ: AuthenticationService,
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit() {
    this.systServ.getBuildingIds()
      .subscribe(data => {
        this.buildings = data;
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }

  revert(e) {
    e.preventDefault()
    this.addRoomForm.reset();
  }

  onSubmit() {
    this.globalVars.spinner = true;
    this.systServ.addRoom(this.addRoomForm.value)
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
    return this.addRoomForm.get('roomName');
  }

  get tier() {
    return this.addRoomForm.get('tier');
  }

  getRoomNameErrorMessage() {
    return this.roomName.hasError('required') ? 'Room Name is required' : '';
  }
}

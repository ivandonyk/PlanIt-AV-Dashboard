import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {Room} from '../../_models/systems.model';

@Component({
  selector: 'app-add-room',
  templateUrl: './clone-room.component.html',
  styleUrls: ['./clone-room.component.css']
})
export class CloneRoomComponent implements OnInit {
  public addRoomForm = this.fb.group({
    roomChooseName: new FormControl(''),
    roomName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
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

  onSubmit() {}

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
          roomName: [data.roomName],
          tier: [data.tier],
          coreAge: [data.coreAge],
          floor: [data.floor],
          dateOfLastRemodel: [data.dateOfLastRemodel],
          integrator: [data.integrator],
          seatingCapacity: [data.seatingCapacity],
          seatingType: [data.seatingType],
          dimensions: [data.dimensions],
          ceilingHeight : [data.ceilingHeight ],
          ceilingType : [data.ceilingType ],
          lastInstallDate : [data.lastInstallDate ],
          origAvInstallDate : [data.origAvInstallDate ],
          lifecycle : [data.lifecycle ],
          origAvSystemCost : [data.origAvSystemCost ],
          origAvContractor: [data.origAvContractor],
          avLastUpdateDate: [data.avLastUpdateDate],
          avLastUpdateCost: [data.avLastUpdateCost],
          lastAvContractor: [data.lastAvContractor],
          nextAvUpdateDt: [data.nextAvUpdateDt],
          nextAvUpdCost: [data.nextAvUpdCost],
          notes: [data.notes],
          equipmentAge: [data.equipmentAge],
          replaceUpg: [data.replaceUpg],
        });
      }, error => {
        console.log(error);
      });
  }


}

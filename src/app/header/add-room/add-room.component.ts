import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule} from '@angular/material';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddRoomComponent>,
              private snackbar: MatSnackBar) { }

  ngOnInit() {

  }

  // @ts-ignore
  private addRoomForm = this.fb.group({
    buildingName: new FormControl(''),
    roomName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    tier: new FormControl(''),
    floor: new FormControl(''),
    dateOfLastRemodel: new FormControl(''),
    integrator: new FormControl(''),
    roomType: new FormControl(''),
    //Add line here...new tab Details
    seatingCapacity: new FormControl(''),
    seatingType: new FormControl(''),
    dimensions: new FormControl('' ),
    //unit of measure
    ceilingHeight : new FormControl(''),
    ceilingType : new FormControl(''),
    //TODO - phone number formatter...
    origAvInstallDate : new FormControl(''),
    origAvSysCost : new FormControl(''),
    origAvContractor: new FormControl(''),
    avLastUpdDate: new FormControl(''),
    avLastUpdCost: new FormControl(''),
    lastAvUpdContractor: new FormControl(''),
    nextAvUpdate: new FormControl(''),
    nextAvUpdEstCost: new FormControl(''),
    notes: new FormControl(''),
    //upload photos - future
  });

  //TODO - grab this from DB, make it business account specific
  //TODO - for their own defined types..
  roomType: string[] = [
    'Conference Room', 'Classroom', 'Boardroom', 'Huddle Room',
    'Conference Center', 'Lobby', 'Hallway',
  ];

  tiers: string[] = [
    '1', '2', '3', '4', '5'
  ];

  buildings: string[] = [
    'Orange Building', 'Building 1', 'Secret Building', 'Square Building', 'UFO Building'

  ]

  //TODO - grab this from DB, make it business account specific
  //TODO - for their own defined types..
  seatingTypes: string[] = [
    'Conference', 'Table', 'Fixed Classroom', 'Flexible', 'Theater'
  ];

  ceilingTypes: string[] = [
    'Drywall', 'Drop', 'Open', 'Bar-joist', 'Combination'
  ];

  revert() {
    this.addRoomForm.reset();
  }

  onSubmit() {
    // TODO : use eventemitter with form value
    console.log(this.addRoomForm.value);

    //TODO - add service for Room...
    // const addBuildingApiModel = new AddBuildingApiModel();
    // const result: AddBuildingFormModel = Object.assign({}, this.addRoomForm.value);
    // console.log('Result is: [' + result + ']');
    // addBuildingApiModel.addBuildingFormModel = Object.assign({}, result);
    // addBuildingApiModel.businessAccountId = '1'; // TODO - get from login..
    // addBuildingApiModel.userName = 'dale.roach@planitav.com'; // TODO - get from login..store in session storage

    // console.log('Addbuilding api model is: [' + addBuildingApiModel + ']');

    // this.addRoomForm.addBuilding(addBuildingApiModel);

    this.dialogRef.close();

    this.snackbar.open('Room Added', '', {
        duration: 1500,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      }
    );


  }

  cancel() {
    // TODO : use eventemitter with form value
    console.log('In Cancel...Doh!');
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

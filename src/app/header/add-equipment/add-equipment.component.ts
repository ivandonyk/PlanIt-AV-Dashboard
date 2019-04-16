import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  private addEquipmentForm = this.fb.group({
    rooms: new FormControl(''),
    manufacturer: new FormControl('', [Validators.required]),
    modelPartNbr: new FormControl(''),
    class: new FormControl(''),
    category: new FormControl(''),
    lifecycle: new FormControl(''),
    dateInstalled: new FormControl(''),
    //TODO - put non-required fields below...
    // //Add line here...new tab Details
    // seatingCapacity: new FormControl(''),
    // seatingType: new FormControl(''),
    // dimensions: new FormControl('' ),
    // //unit of measure
    // ceilingHeight : new FormControl(''),
    // ceilingType : new FormControl(''),
    // //TODO - phone number formatter...
    // origAvInstallDate : new FormControl(''),
    // origAvSysCost : new FormControl(''),
    // origAvContractor: new FormControl(''),
    // avLastUpdDate: new FormControl(''),
    // avLastUpdCost: new FormControl(''),
    // lastAvUpdContractor: new FormControl(''),
    // nextAvUpdate: new FormControl(''),
    // nextAvUpdEstCost: new FormControl(''),
    // notes: new FormControl(''),
    //upload photos - future
  });

  classes: string[] = [
    'Core', 'Peripheral', 'Furniture',
  ];

  // TODO - grab from database...
  roomList: string [] = [
    'Roach BoardRoom', 'Green Hallway', 'Huddle Room', 'Executive BoardRoom',
  ];

 //TODO - keep a library of these..make sure they can type them in??
  categories: string[] = [
    'Video', 'Audio', 'Monitor',
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddEquipmentComponent>,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  get manufacturer() {
    return this.addEquipmentForm.get('manufacturer');
  }

  revert() {
    this.addEquipmentForm.reset();
  }

  onSubmit() {
    // TODO : use eventemitter with form value
    console.log(this.addEquipmentForm.value);

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

    this.snackbar.open('Equipment Added', '', {
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




}

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

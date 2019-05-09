import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  public addEquipmentForm = this.fb.group({
    rooms: new FormControl(''),
    alternateLocation: new FormControl(''),
    countryOfManufacture: new FormControl(''),
    dateInstalled: new FormControl(''),
    description: new FormControl(''),
    equipmentCategory: new FormControl(''),
    equipmentClass: new FormControl(''),
    equipmentId: new FormControl(''),
    extWarrantyStartDate: new FormControl(''),
    extendedWarranty: new FormControl(''),
    extendedWarrantyProvider: new FormControl(''),
    integrator: new FormControl(''),
    ipAddress: new FormControl(''),
    lifeCycle: new FormControl(''),
    macAddress: new FormControl(''),
    manufactureWarranty: new FormControl(''),
    manufacturer: new FormControl(''),
    modelNumber: new FormControl(''),
    port: new FormControl(''),
    replacementDate: new FormControl(''),
    roomId: new FormControl(''),
    serialNumber: new FormControl(''),
    userName: new FormControl(''),
    warrantyExpirationDate: new FormControl(''),
    warrantyStartDate: new FormControl(''),
  });

  classes: string[] = [
    'Core', 'Peripheral', 'Furniture',
  ];

  roomList: string [] = [
    'Roach BoardRoom', 'Green Hallway', 'Huddle Room', 'Executive BoardRoom',
  ];

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
    console.log(this.addEquipmentForm.value);
  }

  cancel() {
    // TODO : use eventemitter with form value
    console.log('In Cancel...Doh!');
    this.dialogRef.close();
  }
}

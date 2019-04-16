import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {HandleError} from '../../http-error-handler.service';
import {AddBuildingService} from './add-building.service';
import {AddBuildingFormModel} from '../../model/addBuildingFormModel';
import {AddBuildingApiModel} from '../../model/addBuildingApiModel';


@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  providers: [AddBuildingService],
  styleUrls: ['./add-building.component.css']
})
//TODO - Make this the edit form as well..
export class AddBuildingComponent implements OnInit {

  private handleError: HandleError;

  private addBuildingForm = this.fb.group({
    buildingName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    address1: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    address2: new FormControl('', Validators.maxLength(80)),
    city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$'), ]),
    nbrOfFloors: new FormControl(''),
    dateConstructed: new FormControl(''),
    dateLastRemodel: new FormControl(''),
    note: new FormControl('' ),
    contactFirstName : new FormControl(''),
    contactLastName : new FormControl(''),
    //TODO - phone number formatter...
    contactPhoneNbr : new FormControl(''),
    contactEmail : new FormControl('', [Validators.email])

  });

  //TODO - may want to make this an external constant..
  states: string[] = [
    'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE',
    'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT',
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK',
    'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT',
    'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'
  ];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddBuildingComponent>,
              private snackbar: MatSnackBar, private addBuldingService: AddBuildingService, ) {
  }

  ngOnInit() {

  }

  revert() {
    this.addBuildingForm.reset();
  }

  onSubmit() {
    // TODO : use eventemitter with form value
    console.log(this.addBuildingForm.value);

    const addBuildingApiModel = new AddBuildingApiModel();
    const result: AddBuildingFormModel = Object.assign({}, this.addBuildingForm.value);
    console.log('Result is: [' + result + ']');
    addBuildingApiModel.addBuildingFormModel = Object.assign({}, result);
    addBuildingApiModel.businessAccountId = '1'; // TODO - get from login..
    addBuildingApiModel.userName = 'dale.roach@planitav.com'; // TODO - get from login..store in session storage

    console.log('Addbuilding api model is: [' + addBuildingApiModel + ']');

    this.addBuldingService.addBuilding(addBuildingApiModel);

    this.dialogRef.close();

    this.snackbar.open('Building Added', '', {
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

  getAddress1ErrorMessage() {

    return this.address1.hasError('required') ? 'Address is required' :
      this.address1.hasError('maxLength') ? 'Address is to long' :
        '';
  }

  getZipErrorMessage() {

    return this.zip.hasError('required') ? 'Zip is required' :
      this.zip.hasError('patter') ? 'Invalid Zip' :
        '';
  }

  get buildingName() {
    return this.addBuildingForm.get('buildingName');
  }

  get address1() {
    return this.addBuildingForm.get('address1');
  }

  get address2() {
    return this.addBuildingForm.get('address2');
  }

  get city() {
    return this.addBuildingForm.get('city');
  }

  get state() {
    return this.addBuildingForm.get('state');
  }

  get zip() {
    return this.addBuildingForm.get('zip');
  }

  get note() {
    return this.addBuildingForm.get('note');
  }

  get contactEmail() {
    return this.addBuildingForm.get('contactEmail');
  }

  get nbrOfFloors() {
    return this.addBuildingForm.get('nbrOfFloors');
  }

  get dateConstructed() {
    return this.addBuildingForm.get('dateConstructed');
  }

  get dateLastRemodel() {
    return this.addBuildingForm.get('dateConstructed');
  }




}

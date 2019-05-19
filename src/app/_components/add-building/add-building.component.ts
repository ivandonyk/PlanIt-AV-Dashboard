import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HandleError } from '../../_services/http-error-handler.service';
import { UserData } from '../../_models/userdata.model';
import { SystemsService } from '../../_services/systems.service';


@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {

  private handleError: HandleError;

  public addBuildingForm = this.fb.group({
    buildingName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    address1: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    address2: new FormControl('', Validators.maxLength(80)),
    city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$'), ]),
    nbrOfFloors: new FormControl(''),
    dateConstructed: new FormControl(''),
    dateLastRemodel: new FormControl(''),
    notes: new FormControl('' ),
    contactFirstName : new FormControl(''),
    contactLastName : new FormControl(''),
    contactPhoneNbr : new FormControl(''),
    contactEmail : new FormControl('', [Validators.email])

  });

  states: string[] = [
    'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE',
    'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT',
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK',
    'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT',
    'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'
  ];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBuildingComponent>,
    private snackbar: MatSnackBar,
    private systService: SystemsService,
    ) {
  }

  ngOnInit() {

  }

  revert() {
    this.addBuildingForm.reset();
  }

  onSubmit() {
    console.log(this.addBuildingForm.value);
    let addBuildingApiModel;
    addBuildingApiModel = this.addBuildingForm.value;
    const userData: UserData = JSON.parse(localStorage.getItem('currentUser'));


    addBuildingApiModel['businessAccountId'] = userData.businessId;
    addBuildingApiModel['userName'] = userData.userName;


    console.log(addBuildingApiModel);
    this.systService.addBuilding(addBuildingApiModel)
      .subscribe(data => {
        console.log(data);
        this.snackbar.open('Building Added', '', {
            duration: 1500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
        this.dialogRef.close();
      }, error => {
        this.snackbar.open(error.message, '', {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
        console.log(error);
      });

  }

  cancel() {
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

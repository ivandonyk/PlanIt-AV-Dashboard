import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import { HandleError } from '../../_services/http-error-handler.service';
import { UserData } from '../../_models/userdata.model';
import { SystemsService } from '../../_services/systems.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AuthenticationService} from '../../_services/authentication.service';
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import * as moment from 'moment';

export interface DialogData {
  buildingId: any;
}
@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})

export class AddBuildingComponent implements OnInit {

  private handleError: HandleError;
  private buildingsArr: any;
  private existBuildi: any;
  private existBuildingId: number;

  public addBuildingForm = this.fb.group({
    buildingName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    address1: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    address2: new FormControl('', Validators.maxLength(80)),
    city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    nbrOfFloors: new FormControl(''),
    dateConstructed: new FormControl(''),
    dateLastRemodel: new FormControl(''),
    note: new FormControl(''),
    contactFirstName : new FormControl(''),
    contactLastName : new FormControl(''),
    contactPhoneNbr : new FormControl(''),
    contactEmail : new FormControl('', [Validators.email])

  });

  public isEdit: Boolean = false;

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
    public authServ: AuthenticationService,
    private snackbar: MatSnackBar,
    private systService: SystemsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,

  ) {
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    if (this.data || this.existBuildingId) {
      this.isEdit = true;
      this.systService.getBuildingDetail(this.data ? this.data.buildingId : this.existBuildingId )
        .subscribe(data => {
          console.log(data)
          this.existBuildi = data;
          this.addBuildingForm = this.fb.group({
            buildingName: new FormControl(data['buildingName'], [Validators.required, Validators.maxLength(80)]),
            address1: new FormControl(data['address1'], [Validators.required, Validators.maxLength(80)]),
            address2: new FormControl(data['address2'], Validators.maxLength(80)),
            city: new FormControl(data['city'], [Validators.required, Validators.maxLength(100)]),
            state: new FormControl(data['state'], [Validators.required]),
            zip: new FormControl(data['zip'], [Validators.required, Validators.maxLength(10)]),
            nbrOfFloors: new FormControl(data['nbrOfFloors']),
            dateConstructed: new FormControl(moment(data['dateConstructed']).toISOString()),
            dateLastRemodel: new FormControl(moment(data['dateLastRemodel']).toISOString()),
            note: new FormControl(data['note']),
            contactFirstName : new FormControl(data['contactFirstName']),
            contactLastName : new FormControl(data['contactLastName']),
            contactPhoneNbr : new FormControl(data['contactPhoneNbr']),
            contactEmail : new FormControl(data['contactEmail'], [Validators.email])
          });
        }, error => {
          if (error.error.error === 'invalid_token') {
            this.authServ.logout();
          }
        });
    } else {
      this.systService.getBuildings()
        .subscribe(data => {
          this.buildingsArr = data.systemBuilding.buildings;
        }, error => {
          console.log(error);
          if (error.error.error === 'invalid_token') {
            this.authServ.logout();
          }
        });
      this.isEdit = false;
    }
  }

  checkBuilding() {
    if (!this.isEdit && this.addBuildingForm.value.buildingName.length > 0) {
      const isExist = this.buildingsArr.filter(item => this.addBuildingForm.value.buildingName === item.buildingName);

      if (isExist.length > 0 ) {
        this.existBuildingId = isExist[0].buildingId;
        this.confirmEdit();
      }
    }
  }


  revert(e) {
    e.preventDefault();
    this.addBuildingForm.reset();
  }

  onSubmit() {
    let addBuildingApiModel;
    addBuildingApiModel = this.addBuildingForm.value;
    const userData: UserData = JSON.parse(sessionStorage.getItem('currentUser'));


    addBuildingApiModel['businessAccountId'] = userData.businessAcctId;
    addBuildingApiModel['userName'] = userData.userName;


    Object.keys(this.addBuildingForm.controls).forEach(item => {
      if (this.addBuildingForm.controls[item].status !== 'VALID') {
        const elem = document.querySelector('*[formcontrolname="' + item + '"]').closest('mat-form-field') as HTMLElement;
        document.getElementById('addBuildingForm').scrollTop = elem.offsetTop - 190;
      }
    });

    if (this.addBuildingForm.status === 'VALID') {
      if (this.data) {
        addBuildingApiModel['addressId'] = this.existBuildi.addressId;
        addBuildingApiModel['contactId'] = this.existBuildi.contactId;

        this.systService.updBuilding(addBuildingApiModel, this.data.buildingId)
          .subscribe(data => {
            this.dialogRef.close();

          }, error => {
            if (error.error.error === 'invalid_token') {
              this.authServ.logout();
            }
            this.snackbar.open(error.message, '', {
                duration: 3500,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              }
            );
          });
      } else {
        console.log(addBuildingApiModel)
        this.systService.addBuilding(addBuildingApiModel)
          .subscribe(data => {
            this.snackbar.open('Building Added', '', {
                duration: 1500,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              }
            );
            this.dialogRef.close();
          }, error => {
            if (error.error.error === 'invalid_token') {
              this.authServ.logout();
            }
            this.snackbar.open(error.message, '', {
                duration: 3500,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              }
            );
            console.log(error);
          });
      }
    }
  }

  confirmEdit(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: this.addBuildingForm.value.buildingName + ' already exist. Would you like to open it?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.initData();
      }
    });
  }

  cancel(e) {
    e.preventDefault();
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

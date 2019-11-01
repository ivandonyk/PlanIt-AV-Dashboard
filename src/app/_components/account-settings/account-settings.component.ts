import {Component, Inject, OnInit} from '@angular/core';
import { SystemsService } from '../../_services/systems.service';
import {AnotherUserData, BillingSubs, BussAcc, UserManageData, UserRoles} from '../../_models/userdata.model';
import {FormBuilder, FormControl} from '@angular/forms';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import {MatDialog, MatDialogRef} from "@angular/material";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})

export class AccountSettingsComponent implements OnInit {
  public currentRoute: number = 1;
  public subsData: BillingSubs = null;
  public allBillSub: BillingSubs[] = null;
  public BusAcc: BussAcc = null;
  public isAccountEdit: Boolean;
  public isFormChanged: Boolean;

  public states: string[] = [
    'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE',
    'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT',
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK',
    'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT',
    'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'
  ];

  public accountEditForm = this.fb.group({
    companyName: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),

  });

  public formChooseSubs = this.fb.group({
    subscription: new FormControl(''),
  });

  constructor(
    private systService: SystemsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public globalVars: GlobalVarsHelper,
    public dialogRef: MatDialogRef<AccountSettingsComponent>,
    private snackbar: MatSnackBar

  ) {
  }

  ngOnInit() {
    this.getBusAcct();
  }

  changeRoute(p) {
   if (p === 1) {
      this.getBusAcct();
   } else if (p === 2) {
      this.getBillingSubs();
      this.getAllBillSub();
   } else if (p === 3) {

   }
    this.currentRoute = p;
  }

  getBillingSubs() {
    this.globalVars.spinner = true;
    this.systService.getBillSub()
      .subscribe((data: BillingSubs) => {
        this.subsData = data;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }

  getAllBillSub() {
    this.systService.getAllBillSub()
      .subscribe( (data: BillingSubs[]) => {
        this.globalVars.spinner = false;
        this.allBillSub = data;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }

  getBusAcct() {
    this.systService.getBusAcct()
      .subscribe( (data: BussAcc) => {
        this.BusAcc = data;
        this.accountEditForm = this.fb.group({
          companyName: new FormControl(data.companyName),
          address1: new FormControl(data.address1),
          address2: new FormControl(data.address2),
          city: new FormControl(data.city),
          state: new FormControl(data.state),
          zip: new FormControl(data.zip),
        });

        this.accountEditForm.statusChanges
          .subscribe(value => {
            this.isFormChanged = true;
          }, error => {
            console.log(error);
          });

        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }


  changeSub(id) {
    this.systService.updBusBillingSubsripiton(id)
      .subscribe( (data: any) => {
        console.log(data);
        this.globalVars.spinner = false;
        this.snackbar.open(data, '', {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
        this.getBillingSubs()
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
         this.snackbar.open(error.error.text, '', {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
        this.getBillingSubs()

      });
  }
  closeDialog() {
    this.dialogRef.close();
  }

  saveAccountSetting() {
    this.globalVars.spinner = true;
    this.systService.updBusAcct(this.accountEditForm.value)
      .subscribe( (data: any) => {
        this.globalVars.spinner = false;
        this.isAccountEdit = false;
        this.snackbar.open('Success', '', {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
         this.snackbar.open('error', '', {
            duration: 3500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
      });
  }

  closeEdit(): void {
    if (this.isFormChanged === true) {
      const dialogRef = this.dialog.open(ConfirmModalComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.saveAccountSetting()
          this.getBusAcct();
        } else {
          this.isAccountEdit = false;
        }
      });
    } else {
      this.isAccountEdit = false;
    }

  }
}

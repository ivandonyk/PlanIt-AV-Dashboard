import {Component, Inject, OnInit} from '@angular/core';
import { SystemsService } from '../../_services/systems.service';
import {AnotherUserData, BillingSubs, UserManageData, UserRoles} from '../../_models/userdata.model';
import {FormBuilder, FormControl} from '@angular/forms';
import { GlobalVarsHelper } from '../../_helpers/global-vars';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})


export class AccountSettingsComponent implements OnInit {
  public currentRoute: number = 1;
  public subsData: BillingSubs = null;
  public allBillSub: BillingSubs[] = null;


  public formChooseSubs = this.fb.group({
    subscription: new FormControl(''),
  });


  constructor(
    private systService: SystemsService,
    private fb: FormBuilder,
    public globalVars: GlobalVarsHelper,

  ) {
  }

  ngOnInit() {
  }



  changeRoute(p) {

   if (p === 1) {

   } else if (p === 2) {
      this.getBillingSubs();
   } else if (p === 3) {

   }

    this.currentRoute = p;


  }


  getBillingSubs() {
    this.globalVars.spinner = true;
    this.systService.getBillSub()
      .subscribe((data: BillingSubs) => {
        this.subsData = data;
      }, error => {
        console.log(error);
      });
    this.systService.getAllBillSub()
      .subscribe( (data: BillingSubs[]) => {
        this.globalVars.spinner = false;
        this.allBillSub = data;
      }, error => {
        console.log(error);
      });
  }

}

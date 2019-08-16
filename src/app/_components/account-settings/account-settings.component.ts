import {Component, Inject, OnInit} from '@angular/core';
import { SystemsService } from '../../_services/systems.service';
import {AnotherUserData, UserManageData, UserRoles} from '../../_models/userdata.model';
import {FormBuilder, FormControl} from '@angular/forms';
import { GlobalVarsHelper } from '../../_helpers/global-vars';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})


export class AccountSettingsComponent implements OnInit {
  public currentRoute: number;

  constructor(
    private systService: SystemsService,
    private fb: FormBuilder,
    public globalVars: GlobalVarsHelper,

  ) {
  }

  ngOnInit() {
  }



  changeRoute(p) {
   this.currentRoute = p;
  }
}

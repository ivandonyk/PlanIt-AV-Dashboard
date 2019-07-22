import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { Dashboard, Systems, Lifecycle, Support } from '../../_models/dashboard.model';
import { GlobalVarsHelper } from '../../_helpers/global-vars';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dashboardData: {
    systems?: Systems
    lifecycle?: Lifecycle
    support?: Support
  };

  public businessName: String = '';
  public logoPath: String = '';

  constructor(
    private dashServ: DashboardService,
    public globalVars: GlobalVarsHelper

  ) { }

  ngOnInit() {
    this.globalVars.spinner = true;

    this.dashServ.getDashboardData()
      .subscribe((data: Dashboard) => {
        console.log(data);
        this.businessName = data.businessName;
        this.logoPath = data.logoPath;
        this.dashboardData = data.dashboard;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
      });
  }
  getObjectData(key) {
    return this.dashboardData[key];
  }

}

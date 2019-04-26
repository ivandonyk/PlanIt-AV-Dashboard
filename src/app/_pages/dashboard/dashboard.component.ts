import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { Dashboard, Systems, Lifecycle, Support } from '../../_models/dashboard.model';


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


  constructor(
    private dashServ: DashboardService
  ) { }

  ngOnInit() {
    this.dashServ.getDashboardData()
      .subscribe((data: Dashboard) => {
        console.log(data);
        this.dashboardData = data.dashboard;
      }, error => {
        console.log(error);
      });
  }
  getObjectData(key) {
    return this.dashboardData[key];
  }

}

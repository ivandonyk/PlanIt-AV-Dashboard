import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { Dashboard } from '../../_models/dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dashboardData: Dashboard;


  constructor(
    private dashServ: DashboardService
  ) { }

  ngOnInit() {
    this.dashServ.getDashboardData()
      .subscribe(data => {
        console.log(data);
        this.dashboardData = data;
      }, error => {
        console.log(error);
      });
  }
  getObjectData(key) {
    return this.dashboardData[key];
  }

}

import { Component, OnInit } from '@angular/core';
import { Building } from '../../_models/building.model';
import { BuildingService } from '../../_services/building.service';
import { MatTableDataSource} from '@angular/material';
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  displayedColumns: string[] = ['buildingSeqNbr', 'building', 'buildingDesc', 'location', 'businessAcctSeqNbr'];
  dataSource;
  buildings: Building[];

  constructor(private buildingService: BuildingService, public authServ: AuthenticationService) {}

  ngOnInit() {
    this.dataTable();
    console.log('In NgOnInit in building.component.ts');
  }

  private dataTable() {

    this.buildingService.getBuildings().subscribe(data => {
      this.buildings = data;
      this.dataSource = data;
    }, error => {if (error.error.error === 'invalid_token'){
      this.authServ.logout();
    }});
  }

}

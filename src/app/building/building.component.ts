import { Component, OnInit } from '@angular/core';
import { Building } from '../interface/building.model';
import { BuildingService } from '../services/building.service';
import { MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  displayedColumns: string[] = ['buildingSeqNbr','building', 'buildingDesc', 'location', 'businessAcctSeqNbr'];
  dataSource;
  buildings: Building[];
  
  constructor(private buildingService: BuildingService) { 
    

  }

  ngOnInit() {
    this.dataTable();
    console.log('In NgOnInit in building.component.ts');

  }

  private dataTable(){

    this.buildingService.getBuildings().subscribe(data => {
      this.buildings = data;
      this.dataSource = data;



    })

  }

}

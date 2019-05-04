import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddBuildingComponent} from './add-building/add-building.component';
import {AddRoomComponent} from './add-room/add-room.component';
import {AddEquipmentComponent} from './add-equipment/add-equipment.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }
  openBuildingDialog(): void {
    this.dialog.open(AddBuildingComponent, {
      width: '75%',
      height: '100%',
    });
  }
  openRoomDialog(): void {
    this.dialog.open(AddRoomComponent, {
      width: '75%',
      height: '100%',
    });
  }
  openEquipmentDialog(): void {
    this.dialog.open(AddEquipmentComponent, {
      width: '75%',
      height: '100%',
    });
  }
  ngOnInit() {
  }

}

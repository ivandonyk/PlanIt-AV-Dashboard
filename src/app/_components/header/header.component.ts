import { Component, OnInit } from '@angular/core';
import {AddBuildingComponent} from '../add-building/add-building.component';
import {AddRoomComponent} from '../add-room/add-room.component';
import {AddEquipmentComponent} from '../add-equipment/add-equipment.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReferComponent } from '../refer/refer.component';
import {CloneRoomComponent} from '../clone-room/clone-room.component';
import {AuthenticationService} from '../../_services/authentication.service'
import {ContactUsComponent} from "../contact-us/contact-us.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentPage: number;

  constructor(
    public dialog: MatDialog,
    public authServ: AuthenticationService
  ) {
  }
  openBuildingDialog(): void {
    this.dialog.open(AddBuildingComponent);
  }
  openRoomDialog(): void {
    this.dialog.open(AddRoomComponent);
  }
  openEquipmentDialog(): void {
    this.dialog.open(AddEquipmentComponent);
  }
  openCloneRoomDialog(): void {
    this.dialog.open(CloneRoomComponent);
  }
  openContactUsDialog(): void {
    this.dialog.open(ContactUsComponent);
  }
  openReferDialog(): void {
    this.dialog.open(ReferComponent);
  }
  ngOnInit() {
  }

  logout() {
    this.authServ.logout();
    window.location.href = window.location.origin + '/login';
  }
}

import { Component, OnInit } from '@angular/core';
import {AddBuildingComponent} from '../add-building/add-building.component';
import {AddRoomComponent} from '../add-room/add-room.component';
import {AddEquipmentComponent} from '../add-equipment/add-equipment.component';
import {MatDialog } from '@angular/material';
import { ReferComponent } from '../refer/refer.component';
import {CloneRoomComponent} from '../clone-room/clone-room.component';
import {AuthenticationService} from '../../_services/authentication.service';
import {ContactUsComponent} from '../contact-us/contact-us.component';
import {ManageUserComponent} from "../manage-user/manage-user.component";
import {AccountSettingsComponent} from "../account-settings/account-settings.component";

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
  ngOnInit() {
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
  openManggeUserDialog(): void {
    this.dialog.open(ManageUserComponent, {
      panelClass: 'manage-user-dialog'
    });
  }

  openAccountSettingsDialog(): void {
    this.dialog.open(AccountSettingsComponent, {
      panelClass: 'manage-user-dialog',
      height: '400px',
      width: '70%',
    });
  }

  logout() {
    this.authServ.logout();
    window.location.href = window.location.origin + '/login';
  }
}

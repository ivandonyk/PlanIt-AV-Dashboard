import {Component, Inject, OnInit} from '@angular/core';
import { SystemsService } from '../../_services/systems.service';
import {AnotherUserData, UserManageData, UserRoles} from '../../_models/userdata.model';
import {FormBuilder, FormControl} from '@angular/forms';
import { GlobalVarsHelper } from '../../_helpers/global-vars';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})


export class ManageUserComponent implements OnInit {
  public userManageData: UserManageData[];
  public userRoles: UserRoles[];
  public displayedColumns: Array<string> = ['name', 'userName', 'userType', 'dateAdded', 'status'];
  public userData: AnotherUserData;

  public userEditForm = this.fb.group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNbr: new FormControl(''),
    userName: new FormControl(''),
    title: new FormControl(''),
    password: new FormControl(''),
    userRoleId: new FormControl(''),
  });

  constructor(
    private systService: SystemsService,
    private fb: FormBuilder,
    public globalVars: GlobalVarsHelper,

  ) {
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.globalVars.spinner = true;

    this.systService.getAllUsers()
      .subscribe((data: UserManageData[]) => {
        console.log(data);
        this.userManageData = data;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }

  getRoles() {
    this.globalVars.spinner = true;
    this.systService.getRoles()
      .subscribe((data: UserRoles[]) => {
        console.log(data);
        this.userRoles = data;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }

  editUser(elem) {
    this.globalVars.spinner = true;

    this.systService.getUser(elem.id)
      .subscribe((data: AnotherUserData) => {
        this.userEditForm = this.fb.group({
          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          phoneNbr: new FormControl(data.phoneNbr),
          userName: new FormControl(data.userName),
          title: new FormControl(data.title),
          password: new FormControl(''),
          userRoleId: new FormControl(data.userRoleId),
        });

        this.userData = data;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }

  updateUser() {
    this.globalVars.spinner = true;

    console.log(this.userEditForm.value);
    const formData = this.userEditForm.value;
    this.systService.updateUser(formData, this.userData)
      .subscribe((data) => {
        this.userData = null;
        this.getUsers()

        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });

  }

  cancelEdit() {
    this.userData = null;
  }

  deleteUser() {
    this.globalVars.spinner = true;

    this.systService.deleteUser(this.userData.id)
      .subscribe((data) => {
        console.log(data);
        this.globalVars.spinner = false;
        this.userData = null;
        this.getUsers()

      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }
}

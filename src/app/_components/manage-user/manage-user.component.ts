import {Component, Inject, OnInit} from '@angular/core';
import { SystemsService } from '../../_services/systems.service';
import {AnotherUserData, UserManageData, UserRoles} from '../../_models/userdata.model';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


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
  public isCreateUser: boolean;

  public userEditForm = this.fb.group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNbr: new FormControl(''),
    userName: new FormControl(''),
    title: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\\$%\\^&*])(?=.{8,})'),
    ]),
    userRoleId: new FormControl(''),
    active: new FormControl(''),
    primaryAcctAdmin: new FormControl(''),
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
          primaryAcctAdmin: new FormControl(data.primaryAcctAdmin),
          active: new FormControl(data.active),
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
    const formData = this.userEditForm.value;

    console.log(this.userManageData)
    if (this.isCreateUser) {
      this.systService.createUser(formData, this.userData)
        .subscribe((data) => {
          this.userData = null;
          this.getUsers()

          this.globalVars.spinner = false;
          this.isCreateUser = false;
        }, error => {
          console.log(error);
          this.globalVars.spinner = false;
          this.isCreateUser = false;
        });
    } else {
      this.systService.updateUser(formData, this.userData)
        .subscribe((data) => {
          this.userData = null;
          this.getUsers()

          this.globalVars.spinner = false;
          this.isCreateUser = false;
        }, error => {
          console.log(error);
          this.globalVars.spinner = false;
          this.isCreateUser = false;
        });
    }
  }

  cancelEdit() {
    this.userData = null;
    this.isCreateUser = false;
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


  createUser() {
    this.userEditForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNbr: new FormControl(''),
      userName: new FormControl(''),
      title: new FormControl(''),
      password: new FormControl(''),
      userRoleId: new FormControl(''),
      active: new FormControl(''),
      primaryAcctAdmin: new FormControl(''),
    });
    this.isCreateUser = true;
  }

}

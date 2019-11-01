import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {SystemsService} from '../../_services/systems.service';
import {EquipmentDetailAdd} from '../../_models/equipment.model';
import * as moment from 'moment';
import {Rooms} from '../../_models/systems.model';
import {AuthenticationService} from '../../_services/authentication.service';

export interface DialogData {
  roomId: any;
  buildingId: any;
}
@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  public addEquipmentForm = this.fb.group({
    buildings: new FormControl(''),
    rooms: new FormControl(''),
    alternateLocation: new FormControl(''),
    manufacturer: new FormControl(''),
    modelNumber: new FormControl(''),
    description: new FormControl(''),
    integrator: new FormControl(''),
    equipmentClass: new FormControl(''),
    equipmentCategory: new FormControl(''),
    lifecycle: new FormControl(''),
    countryOfManufacture: new FormControl(''),
    serialNumber: new FormControl(''),
    macAddress: new FormControl(''),
    ipAddress: new FormControl(''),
    port: new FormControl(''),
    dateInstalled: new FormControl(''),
    manufactureWarranty: new FormControl(''),
    warrantyStartDate: new FormControl(''),
    extWarrantyStartDate: new FormControl(''),
    extendedWarranty: new FormControl(''),
    extendedWarrantyProvider: new FormControl(''),
  });

  roomList: any;
  buildingsArr: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEquipmentComponent>,
    private snackbar: MatSnackBar,
    public globalVars: GlobalVarsHelper,
    public systServ: SystemsService,
    public authServ: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

  ) { }

  ngOnInit() {
    this.systServ.getBuildings()
      .subscribe(data => {
        this.buildingsArr = data.systemBuilding.buildings;
        this.addEquipmentForm = this.fb.group({
          buildings: this.data ? this.data.buildingId : new FormControl(''),
          rooms: this.data ? this.data.roomId : new FormControl(''),
          alternateLocation: new FormControl(''),
          manufacturer: new FormControl(''),
          modelNumber: new FormControl(''),
          description: new FormControl(''),
          integrator: new FormControl(''),
          equipmentClass: new FormControl(''),
          equipmentCategory: new FormControl(''),
          lifecycle: new FormControl(''),
          countryOfManufacture: new FormControl(''),
          serialNumber: new FormControl(''),
          macAddress: new FormControl(''),
          ipAddress: new FormControl(''),
          port: new FormControl(''),
          dateInstalled: new FormControl(''),
          manufactureWarranty: new FormControl(''),
          warrantyStartDate: new FormControl(''),
          extWarrantyStartDate: new FormControl(''),
          extendedWarranty: new FormControl(''),
          extendedWarrantyProvider: new FormControl(''),
        });
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
    this.getRooms();
  }
  getRooms() {
    this.systServ.getRoomIds()
      .subscribe((data) => {
        this.roomList = data;
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }

  buildingChanged() {
    this.globalVars.spinner = true;

    this.systServ.getBuildingRooms(this.addEquipmentForm.value.buildings)
      .subscribe((data: Rooms) => {
        this.roomList = data.rooms;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }

  get manufacturer() {
    return this.addEquipmentForm.get('manufacturer');
  }

  revert() {
    this.addEquipmentForm.reset();
  }
  onSubmit() {
    let userData = window.sessionStorage.getItem('currentUser');
    userData = JSON.parse(userData);
    this.globalVars.spinner = true;

    if (this.addEquipmentForm.status === 'VALID') {
      const equipment: EquipmentDetailAdd = {
        roomId: String(this.addEquipmentForm.value.rooms),
        alternateLocation: String(this.addEquipmentForm.value.alternateLocation),
        countryOfManufacture: String(this.addEquipmentForm.value.countryOfManufacture),
        dateInstalled: moment(this.addEquipmentForm.value.dateInstalled).toISOString(),
        description: String(this.addEquipmentForm.value.description),
        equipmentCategory: String(this.addEquipmentForm.value.equipmentCategory),
        equipmentClass: String(this.addEquipmentForm.value.equipmentClass),
        integrator: String(this.addEquipmentForm.value.integrator),
        extWarrantyStartDate: moment(this.addEquipmentForm.value.extWarrantyStartDate).toISOString(),
        extendedWarranty: Number(this.addEquipmentForm.value.extendedWarranty),
        extendedWarrantyProvider: String(this.addEquipmentForm.value.extendedWarrantyProvider),
        ipAddress: String(this.addEquipmentForm.value.ipAddress),
        lifecycle: Number(this.addEquipmentForm.value.lifecycle),
        macAddress: String(this.addEquipmentForm.value.macAddress),
        manufactureWarranty: Number(this.addEquipmentForm.value.manufactureWarranty),
        manufacturer: String(this.addEquipmentForm.value.manufacturer),
        modelNumber: String(this.addEquipmentForm.value.modelNumber),
        port: String(this.addEquipmentForm.value.port),
        replacementDate: moment(this.addEquipmentForm.value.replacementDate).toISOString(),
        serialNumber: String(this.addEquipmentForm.value.serialNumber),
        warrantyExpirationDate: moment(this.addEquipmentForm.value.warrantyExpirationDate).toISOString(),
        warrantyStartDate: moment(this.addEquipmentForm.value.warrantyStartDate).toISOString(),
        userName: String(userData['userName']),
      };
      this.systServ.addEquipment(equipment)
        .subscribe(data => {
          this.globalVars.spinner = false;
          this.dialogRef.close();
          this.snackbar.open('Equipment Added', '', {
              duration: 1500,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            }
          );
        }, error => {
          this.globalVars.spinner = false;
          console.log(error);
          if (error.error.error === 'invalid_token') {
            this.authServ.logout();
          }
        });
    } else {
      this.globalVars.spinner = false;
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EquipmentDetail, EquipmentDetailUpdate, Rooms} from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import * as moment from 'moment';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {AuthenticationService} from '../../_services/authentication.service';


@Component({
  selector: 'app-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.scss']
})

export class EquipmentModalComponent implements OnInit {
  @Input() equipmentId: string;
  @Input() roomId: string;
  @Input() dataSource: string;
  @Output() close = new EventEmitter<boolean>();

  public data: EquipmentDetail;
  public isEdit: Boolean = false;
  public buildingName: String = '';
  public form: FormGroup;
  roomList: any;
  buildingsArr: any;
  buildingData: any;

  constructor(
    private systServ: SystemsService,
    private globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    public authServ: AuthenticationService,

  ) {

  }

  ngOnInit() {
    console.log(this)
    const equipData = JSON.parse(this.dataSource);
    const currentEquipment = equipData.filter(item => item.equipmentId == this.equipmentId);
    this.buildingName = currentEquipment[0].building;
    this.buildingData = currentEquipment[0];


    this.systServ.getBuildings()
      .subscribe(data => {
        this.buildingsArr = data.systemBuilding.buildings;
      }, error => {
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
    this.getEquipmentDetail();
  }

  expand() {
    window.open(window.location.origin + '/home/equipment-detail/' + this.equipmentId);
  }

  get f() {
    return this.form.value;
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

    this.systServ.getBuildingRooms(this.form.value.buildings)
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


  getEquipmentDetail() {
    this.globalVars.spinner = true;

    this.systServ.getEquipmentDetail(this.equipmentId)
      .subscribe((data: EquipmentDetail) => {
      this.data = data;
        this.form = this.formBuilder.group({
          buildings: this.data ? this.buildingData.buildingId : '',
          alternateLocation: '',
          rooms: this.data ? this.data.roomId : '',
          room: [this.data.room],
          altLocation: [this.data.altLocation],
          manufacturer: [this.data.manufacturer],
          modelNumber: [this.data.modelNumber],
          description: [this.data.description],
          equipmentClass: [this.data.equipmentClass],
          category: [this.data.category],
          installDate: [moment(this.data.installDate).toISOString()],
          lifecycle: [this.data.lifecycle],
          replacementDate: [this.data.replacementDate],
          integrator: [this.data.integrator],
          manufactureWarranty: [this.data.manufactureWarranty],
          warrantyExpiration: [this.data.warrantyExpiration],
          extWarrantyProvider: [this.data.extWarrantyProvider],
          extWarrantyExpiration: [this.data.extWarrantyExpiration],
          serialNum: [this.data.serialNum],
          macAddress: [this.data.macAddress],
          ipAddress: [this.data.ipAddress],
          port: [this.data.port],
          countryManufacturer: [this.data.countryManufacturer],
          manuals: [this.data.manuals],
          manufactureWarrantyStart: [''],
          warrantyLength: [''],
          warrantyStart: [''],
        });

      this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }
  closeModal() {
    this.close.emit(true);
  }
  updateRoom() {
    const username = JSON.parse(window.sessionStorage.getItem('currentUser'));

    this.globalVars.spinner = true;
    const equipmentDetail: EquipmentDetailUpdate = {
      alternateLocation: String(this.f.altLocation),
      countryOfManufacture: String(this.f.countryManufacturer),
      dateInstalled: moment(this.f.installDate).toISOString(),
      description: String(this.f.description),
      equipmentCategory: String(this.f.category),
      equipmentClass: String(this.f.equipmentClass),
      equipmentId: Number(this.equipmentId),
      extendedWarrantyProvider: String(this.f.extWarrantyProvider),
      integrator: String(this.f.integrator),
      ipAddress: String(this.f.ipAddress),
      lifecycle: Number(this.f.lifecycle),
      macAddress: String(this.f.macAddress),
      manufactureWarranty: Number(this.f.manufactureWarranty),
      manufacturer: String(this.f.manufacturer),
      modelNumber: String(this.f.modelNumber),
      port: String(this.f.port),
      replacementDate: moment(this.f.replacementDate).toISOString(),
      roomId: this.data.roomId,
      serialNumber: String(this.f.serialNum),
      userName: username.userName,
      warrantyExpirationDate: moment(this.f.warrantyExpiration).toISOString(),
    };

    this.systServ.updEquipment(equipmentDetail)
      .subscribe( data => {
        this.snackbar.open('Room Saved', '', {
            duration: 1500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          }
        );
        this.isEdit = false;
        this.getEquipmentDetail();
        this.globalVars.spinner = false;
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });



  }

  confirmCancel() {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.isEdit = false;
    });
  }


}

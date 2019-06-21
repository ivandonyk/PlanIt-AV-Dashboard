import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EquipmentDetail, EquipmentDetailUpdate} from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from "@angular/material";
import * as moment from 'moment';


@Component({
  selector: 'app-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.scss']
})

export class EquipmentModalComponent implements OnInit {
  @Input() equipmentId: string;
  @Input() roomId: string;
  @Output() close = new EventEmitter<boolean>();

  public data: EquipmentDetail;
  public isEdit: Boolean = false;
  public roomIdC: number;
  public form: FormGroup;


  constructor(
    private systServ: SystemsService,
    private globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar

  ) {

  }

  ngOnInit() {
    this.getEquipmentDetail();
  }

  expand() {
    window.open(window.location.origin + '/home/equipment-detail/' + this.equipmentId);
  }

  get f() {
    return this.form.value;
  }


  getEquipmentDetail() {
    this.globalVars.spinner = true;

    this.systServ.getEquipmentDetail(this.equipmentId)
      .subscribe((data: EquipmentDetail) => {
      this.data = data;
        this.form = this.formBuilder.group({
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
        });

      this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;
      });
  }
  closeModal() {
    this.close.emit(true);
  }
  updateRoom() {
    const username = JSON.parse(window.sessionStorage.getItem('currentUser'))

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
      });



  }

  confirmCancel() {

  }


}

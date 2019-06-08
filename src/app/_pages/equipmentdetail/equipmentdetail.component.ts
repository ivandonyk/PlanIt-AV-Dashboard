import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { SystemsService } from '../../_services/systems.service';
import { EquipmentDetail } from '../../_models/systems.model';


@Component({
  selector: 'app-equipmentdetail',
  templateUrl: './equipmentdetail.component.html',
  styleUrls: ['./equipmentdetail.component.scss']
})
export class EquipmentdetailComponent implements OnInit {
  public data: EquipmentDetail;
  public isEdit: Boolean = false;
  public form: FormGroup;
  public equipmentId: number | string = window.location.pathname.split('/')[3];
  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.globalVars.spinner = true;
    this.getEquipmentDetail();
  }


  getEquipmentDetail() {
    this.systServ.getEquipmentDetail(this.equipmentId)
      .subscribe((data: EquipmentDetail) => {
        console.log(data);
        this.data = data;


        this.form = this.formBuilder.group({
          room: [this.data.room],
          altLocation: [this.data.altLocation],
          manufacturer: [this.data.manufacturer],
          modelNumber: [this.data.modelNumber],
          description: [this.data.description],
          equipmentClass: [this.data.equipmentClass],
          category: [this.data.category],
          installDate: [this.data.installDate],
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


  updateRoom(){

  }
  confirmCancel(){

  }


}

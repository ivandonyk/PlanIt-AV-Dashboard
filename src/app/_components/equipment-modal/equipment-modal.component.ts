import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { EquipmentDetail } from '../../_models/systems.model';
import { SystemsService } from '../../_services/systems.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.scss']
})

export class EquipmentModalComponent implements OnInit {
  @Input() equipmentId: string;
  @Output() close = new EventEmitter<boolean>();

  public data: EquipmentDetail;
  public isEdit: Boolean = false;
  public form: FormGroup;


  constructor(
    private systServ: SystemsService,
    private globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,

  ) {

  }

  ngOnInit() {
    this.globalVars.spinner = true;
    this.getEquipmentDetail();
  }

  expand() {
    window.open(window.location.origin + '/home/equipment-detail/' + this.equipmentId);
  }

  getEquipmentDetail() {
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
  closeModal() {
    this.close.emit(true);
  }

}

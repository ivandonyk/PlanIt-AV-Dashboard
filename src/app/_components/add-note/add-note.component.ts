import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  public form = this.fb.group({
    notes: new FormControl(this.data.form.notes),
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNoteComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {form: RoomDTO, roomId: number | string, buildingId: number | string}
  ) { }

  ngOnInit() {}

  onSubmit() {
    this.globalVars.spinner = true;

    const room: RoomDTO = {
      avLastUpdateCost: Number(this.data.form.avLastUpdateCost),
      avLastUpdateDate: String(this.data.form.avLastUpdateDate),
      ceilingHeight: Number(this.data.form.ceilingHeight),
      ceilingType: String(this.data.form.ceilingType),
      dateOfLastRemodel: String(this.data.form.dateOfLastRemodel),
      dimensions: String(this.data.form.dimensions),
      floor: Number(this.data.form.floor),
      integrator: String(this.data.form.integrator),
      lastAvContractor: String(this.data.form.lastAvContractor),
      lifecycle: Number(this.data.form.lifecycle),
      nextAvUpdCost: Number(this.data.form.nextAvUpdCost),
      nextAvUpdateDt: String(this.data.form.nextAvUpdateDt),
      notes: String(this.form.value.notes),
      origAvContractor: String(this.data.form.origAvContractor),
      origAvInstallDate: String(this.data.form.origAvInstallDate),
      origAvSystemCost: Number(this.data.form.origAvSystemCost),
      roomName: String(this.data.form.roomName),
      seatingCapacity: Number(this.data.form.seatingCapacity),
      seatingType: String(this.data.form.seatingType),
      tier: Number(this.data.form.tier),
      buildingId: Number(this.data.buildingId),
      roomId: Number(this.data.roomId),
      roomType: String(this.data.form.roomType),
    };


    this.systServ.updateRoom(room)
      .subscribe( data => {
        this.snackbar.open('Note Changed', '', {
            duration: 1500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          }
        );
        this.globalVars.spinner = false;
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}

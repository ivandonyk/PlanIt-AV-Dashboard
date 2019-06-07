import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';

@Component({
  selector: 'app-add-project-desc',
  templateUrl: './add-project-desc.component.html',
  styleUrls: ['./add-project-desc.component.scss']
})
export class AddProjectDescComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectDescComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {projectDesc: any, roomId: number | string, buildingId: number | string}
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      notes: this.data.projectDesc[0].projDesc,
    });
    console.log(this)
  }

  onSubmit() {
    this.globalVars.spinner = true;

    const room = {
      'projDesc': this.form.value.notes,
      'projDescId': this.data.projectDesc[0].projDescId,
      'roomId': this.data.projectDesc[0].roomId,
      'userName': this.data.projectDesc[0].userName,
    };


    this.systServ.addProjDesc(room)
      .subscribe( data => {
        this.snackbar.open('Saved', '', {
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

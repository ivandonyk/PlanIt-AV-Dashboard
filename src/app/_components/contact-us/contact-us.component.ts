import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContactUsComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }
}

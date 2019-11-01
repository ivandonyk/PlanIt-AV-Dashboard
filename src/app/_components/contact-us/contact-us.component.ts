import { Component, OnInit } from '@angular/core';
import {MatDialogRef } from '@angular/material';
import {GlobalVarsHelper} from '../../_helpers/global-vars';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})

export class ContactUsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContactUsComponent>,
    public globalVars: GlobalVarsHelper,
  ) { }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalVarsHelper } from '../../_helpers/global-vars';

@Component({
  selector: 'app-add-note',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    public globalVars: GlobalVarsHelper,
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

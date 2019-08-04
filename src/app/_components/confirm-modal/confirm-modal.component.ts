import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVarsHelper } from '../../_helpers/global-vars';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-add-note',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    public globalVars: GlobalVarsHelper,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

  ) { }

  ngOnInit() {
    console.log(this.data)

  }

  onSubmit() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

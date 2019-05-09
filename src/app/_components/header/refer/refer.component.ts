import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule} from '@angular/material';

@Component({
  selector: 'app-refer-popup',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReferComponent>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  send() {
    console.log(this.form.value.email);
    this.dialogRef.close();
  }

}

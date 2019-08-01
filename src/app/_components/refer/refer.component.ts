import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef } from '@angular/material';

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
    this.dialogRef.close();
  }

}

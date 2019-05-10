import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  public form = this.fb.group({
    notes: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNoteComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
  ) { }

  ngOnInit() {

  }

  revert() {
    this.form.reset();
  }

  onSubmit() {
    this.globalVars.spinner = true;
    this.systServ.addRoom(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.globalVars.spinner = false;
        this.dialogRef.close();
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}

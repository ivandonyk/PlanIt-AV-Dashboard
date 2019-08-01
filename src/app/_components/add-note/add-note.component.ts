import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';
import {AuthenticationService} from '../../_services/authentication.service';

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
    private authServ: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: {form: RoomDTO, roomId: number | string, buildingId: number | string}
  ) { }

  ngOnInit() {}

  onSubmit() {
    this.globalVars.spinner = true;
    const username = JSON.parse(window.sessionStorage.getItem('currentUser'));
    const room = {
      buildingId: this.data.buildingId,
      noteText: this.form.value.notes,
      roomId: this.data.roomId,
      userName: username.userName,
    };


    this.systServ.addNote(room)
      .subscribe( () => {
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
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}

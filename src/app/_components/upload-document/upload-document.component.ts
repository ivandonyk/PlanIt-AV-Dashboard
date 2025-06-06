import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
  public form = this.fb.group({
    notes: new FormControl(''),
  });
  public fields: any = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UploadDocumentComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    public snackbar: MatSnackBar,
    public authServ: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: {form: RoomDTO, roomId: number | string, buildingId: number | string},

  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const self = this;
    this.globalVars.spinner = true;
    this.fields.forEach( (item, index) => {
      this.systServ.uploadDoc(item)
        .subscribe(data => {
            this.snackbar.open('Document Saved', '', {
                duration: 1500,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              }
            );
            this.globalVars.spinner = false;
            self.dialogRef.close();
        }, error => {
          if (error.error.error === 'invalid_token') {
            this.authServ.logout();
          }
          console.log(error);
          if (error.status === 200) {
              this.snackbar.open('Document Saved', '', {
                  duration: 1500,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right',
                }
              );
              this.globalVars.spinner = false;
              self.dialogRef.close();
          }
          this.globalVars.spinner = false;
        });
    });

  }

  cancel() {
    this.dialogRef.close();
  }

  onFilesAdded(files: File[]) {
    this.fields = [];
    files.forEach((item, index) => {

      const formData = new FormData();
      formData.append('file', item, item.name);
      this.fields.push({
        file: item,
        description: '',
        roomId: this.data.roomId,
        name: item.name
      });
    });
  }

  setData(index, event) {
    this.fields[index].description = event.target.value;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';

@Component({
  selector: 'app-add-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class AddPhotosComponent implements OnInit {
  public form = this.fb.group({
    notes: new FormControl(''),
  });
  public fields: any = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPhotosComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    @Inject(MAT_DIALOG_DATA) public data: {form: RoomDTO, roomId: number | string, buildingId: number | string},
  private snackbar: MatSnackBar

  ) { }

  ngOnInit() {

  }


  onSubmit() {
    const self = this;
    this.globalVars.spinner = true;
    this.fields.forEach( (item, index) => {
      this.systServ.uploadImage(item)
        .subscribe(data => {
          if (index === this.fields.length) {
            this.snackbar.open('Images Uploaded', '', {
                duration: 1500,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              }
            );
            this.globalVars.spinner = false;
            self.dialogRef.close();

          }
        }, error => {
          console.log(error);
          if (error.status === 200) {
            if (index === this.fields.length) {
              this.snackbar.open('Images Uploaded', '', {
                  duration: 1500,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right',
                }
              );
              this.globalVars.spinner = false;
              self.dialogRef.close();
            }
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

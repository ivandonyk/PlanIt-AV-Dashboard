import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {RoomDTO} from '../../_models/systems.model';
import {AuthenticationService} from '../../_services/authentication.service';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {DropzoneConfigInterface, DropzoneComponent} from "ngx-dropzone-wrapper";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-add-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class AddPhotosComponent implements OnInit {
  @ViewChild(DropzoneComponent) drpzone: DropzoneComponent;



  public form = this.fb.group({
    notes: new FormControl(''),
  });
  public config: DropzoneConfigInterface = {
    url: environment.baseUrl + '/uploadImage',
    clickable: true,
    autoQueue: false,
    maxFilesize: 10,
    autoProcessQueue: false,
    addRemoveLinks: false,
    uploadMultiple: true,
    acceptedFiles: 'image/jpg,image/png,image/jpeg/*',
    params: {
      "access_token": sessionStorage.getItem('token')
    },
    init: function () {
      // console.log(file)
      // console.log(xhr)
      // console.log(formData)
    }
    // headers:
  };

  public fields: any = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPhotosComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    @Inject(MAT_DIALOG_DATA) public data: {form: RoomDTO, roomId: number | string, buildingId: number | string},
    private snackbar: MatSnackBar,
    public authServ: AuthenticationService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {

  }

  // sendingPictures(file, xhr, formData) {
  //   console.log(file)
  //   console.log(xhr)
  //   console.log(formData)
  // }

  onSubmit() {
    const self = this;
    this.globalVars.spinner = true;
    console.log(this.drpzone)
    // this.drpzone.directiveRef.dropzone().processQueue();
    let itemsProcessed = 0;

    // window.document.getElementsByTagName('dropzone').processQueue();
    this.fields.forEach( (item, index) => {
      this.systServ.uploadImage(item)
        .subscribe(data => {
          if (index === this.fields.length) {
            this.snackbar.open('Images Uploaded', 'OK', {
                duration: 2500,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              }
            );
            itemsProcessed++;
            if (itemsProcessed === self.fields.length) {
              setTimeout(() => {
                self.globalVars.spinner = false;
                self.dialogRef.close(true);
              }, 1500);
            }
          }
        },
            error => {
          console.log(error);
          if (error.error.error === 'invalid_token') {
            this.authServ.logout();
          }
          if (error.status === 200) {
            if (/exists/.test(error.error.text)) {
              this.snackbar.open(error.error.text, 'OK', {
                  duration: 2500,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right',
                }
              );
            } else {
              if (error.error.text === 'File Upload Successful') {
                this.snackbar.open('Images Uploaded', 'OK', {
                    duration: 2500,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'right',
                  }
                );
                itemsProcessed++;
                if (itemsProcessed === self.fields.length) {
                  setTimeout(() => {
                    self.globalVars.spinner = false;
                    self.dialogRef.close(true);
                  }, 1500);
                }
                // this.globalVars.spinner = false;
                // self.dialogRef.close(true);
              }
            }
          }
          this.globalVars.spinner = false;
        },
          );
    }, () => {

    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSelect(rejectedFiles: any) {
    this.globalVars.spinner = true;
    console.log(111);
  }
  onFilesAdded(files: any) {
    console.log(files);

    // this.fields = [];
    // files.forEach((item) => {

      // const formData = new FormData();
      // formData.append('file', files, files.name);
      this.fields.push({
        file: files,
        description: '',
        roomId: this.data.roomId,
        name: files.name
      });
    // });
    this.globalVars.spinner = false;
    console.log(222)
    console.log(this.fields);

  }

  setData(index, event) {
    this.fields[index].description = event.target.value;
  }


  confirmUpload(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Are you sure you want to upload this files?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmit();
      }
    });
  }

  onFilesRejected(files: File[]) {
    console.log(files);
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }


}

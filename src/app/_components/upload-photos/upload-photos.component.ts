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
import * as loadImage from 'blueimp-load-image';

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
    acceptedFiles: 'image/*',
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
    let filesCustom = files;


   // setTimeout(() => {
   //
   //   loadImage(files, (img) => {
   //     console.log(img)
   //     console.log(files.previewElement.querySelector('img'))
   //     filesCustom.dataURL = img.toDataURL('image/jpeg');
   //     // files.previewElement.innerHTML = "<img src='" + img.toDataURL('image/jpeg') + "'>"
   //     // files.previewElement.innerHTML = '<div class="dz-image"><img data-dz-thumbnail="" alt="test.jpg" src="' + img.toDataURL('image/jpeg') + '"></div>'
   //
   //
   //
   //     //
   //       // img.toBlob(
   //       //   (blob) => {
   //       //     console.log(blob);
   //       //   },
   //       //   'image/jpeg'
   //       // );
   //
   //     }, { orientation: true }
   //   );
   // }, 2000)


     // fetch(files.dataURL)
     //   .then(res => res.blob())
     //   .then(blob => console.log(blob))

    // this.fields = [];
    // files.forEach((item) => {

      // const formData = new FormData();
      // formData.append('file', files, files.name);


    this.fields.push({
      file: filesCustom,
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




  // decode64(input) {
  //   var keyStr = "ABCDEFGHIJKLMNOP" +
  //     "QRSTUVWXYZabcdef" +
  //     "ghijklmnopqrstuv" +
  //     "wxyz0123456789+/" +
  //     "=";
  //   var output = "";
  //   var chr1, chr2, chr3 = "";
  //   var enc1, enc2, enc3, enc4 = "";
  //   var i = 0;
  //   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  //   var base64test = /[^A-Za-z0-9\+\/\=]/g;
  //   if (base64test.exec(input)) {
  //     alert("There were invalid base64 characters in the input text.\n" +
  //       "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
  //       "Expect errors in decoding.");
  //   }
  //   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  //   do {
  //     enc1 = keyStr.indexOf(input.charAt(i++));
  //     enc2 = keyStr.indexOf(input.charAt(i++));
  //     enc3 = keyStr.indexOf(input.charAt(i++));
  //     enc4 = keyStr.indexOf(input.charAt(i++));
  //     chr1 = (enc1 << 2) | (enc2 >> 4);
  //     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
  //     chr3 = ((enc3 & 3) << 6) | enc4;
  //     output = output + String.fromCharCode(chr1);
  //     if (enc3 != 64) {
  //       output = output + String.fromCharCode(chr2);
  //     }
  //     if (enc4 != 64) {
  //       output = output + String.fromCharCode(chr3);
  //     }
  //     chr1 = chr2 = chr3 = "";
  //     enc1 = enc2 = enc3 = enc4 = "";
  //   } while (i < input.length);
  //   return unescape(output);
  // }




}

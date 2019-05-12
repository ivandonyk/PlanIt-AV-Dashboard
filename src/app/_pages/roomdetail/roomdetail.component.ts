import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { SystemsService } from '../../_services/systems.service';
import {RoomDetails, RoomDTO} from '../../_models/systems.model';
import { Lightbox } from 'ngx-lightbox';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmModalComponent } from '../../_components/confirm-modal/confirm-modal.component';
import {AddPhotosComponent} from "../../_components/upload-photos/upload-photos.component";
import {AddNoteComponent} from "../../_components/add-note/add-note.component";
import {UploadDocumentComponent} from "../../_components/upload-document/upload-document.component";


@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.scss']
})
export class RoomdetailComponent implements OnInit {
  public roomDetailImages: string = JSON.stringify([
    {
      path: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDD_qoA8zJjQVOhDVWfjrJqowwJkfCC1v4ZPG8ZIPkLuW3gv',
    }, {
      path: 'http://www.letsgodigital.org/images/producten/3376/pictures/canon-eos-sample-photo.jpg',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    }, {
      path: 'http://eastmainstream.com/mmc/amintalati/wp-content/uploads/2018/02/Nikon-1-V3-sample-photo.jpg',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVov4yj9BfRY0sxaEvC0NjnYsfMiF-opuwGUSQAcOUzbrXxn3',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    }, {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyO85yZAkJjTAikilDYHh9BW6W1ptYzf_HgT26fXi-KsCkVjI',
    }, {
      path: 'https://i.ytimg.com/vi/DeXVlumJ2uQ/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/6_Wq1_bTcX8/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/QrBOEVIW_zM/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/RFywGWm8JV8/maxresdefault.jpg',
    }, {
      path: 'https://i.ytimg.com/vi/wfVQRWNYVTo/maxresdefault.jpg',
    }
  ]);

  public form: FormGroup;
  public roomModalShownEdit: Boolean = false;
  public roomDetailData: RoomDetails;
  public roomId: number | string = window.location.pathname.split('/')[4];
  public buildingId: number | string = window.location.pathname.split('/')[3];
  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private lightbox: Lightbox,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.opemRoomDetailed(this.roomId);
  }
  get f() {
    return this.form.value;
  }

  opemRoomDetailed( id?: number | string) {
      this.globalVars.spinner = true;
      this.systServ.getRoomDetails(id)
        .subscribe((data: RoomDetails) => {
          console.log(data);
          this.roomDetailData = data;

          this.form = this.formBuilder.group({
            roomName: [data.roomName],
            tier: [data.tier],
            floor: [data.floor],
            dateOfLastRemodel: [moment(data.dateOfLastRemodel).toISOString()],
            integrator: [data.integrator],
            seatingType: [data.seatingType],
            seatingCapacity: [data.seatingCapacity],
            dimensions: [data.dimensions],
            ceilingHeight: [data.ceilingHeight],
            ceilingType: [data.ceilingType],
            origAvInstallDate: [moment(data.origAvInstallDate).toISOString()],
            origAvSystemCost: [data.origAvSystemCost],
            origAvContractor: [data.origAvContractor],
            avLastUpdateDate: [moment(data.avLastUpdateDate).toISOString()],
            avLastUpdateCost: [data.avLastUpdateCost],
            lastAvContractor: [data.lastAvContractor],
            nextAvUpdateDt: [moment(data.nextAvUpdateDt).toISOString()],
            nextAvUpdCost: [data.nextAvUpdCost],
            notes: [data.notes],
            lifecycle: [data.lifecycle],
            coreAge: [data.coreAge],

          });


          this.globalVars.spinner = false;
        }, error => {
          this.globalVars.spinner = false;
          console.log(error);
        });
  }

  updateRoom() {
    this.globalVars.spinner = true;
    const room: RoomDTO = {
      avLastUpdateCost: Number(this.f.avLastUpdateCost),
      avLastUpdateDate: moment(this.f.avLastUpdateDate).toISOString(),
      ceilingHeight: Number(this.f.ceilingHeight),
      ceilingType: String(this.f.ceilingType),
      dateOfLastRemodel: moment(this.f.dateOfLastRemodel).toISOString(),
      dimensions: String(this.f.dimensions),
      floor: Number(this.f.floor),
      integrator: String(this.f.integrator),
      lastAvContractor: String(this.f.lastAvContractor),
      lifecycle: Number(this.f.lifecycle),
      nextAvUpdCost: Number(this.f.nextAvUpdCost),
      nextAvUpdateDt: moment(this.f.nextAvUpdateDt).toISOString(),
      notes: String(this.f.notes),
      origAvContractor: String(this.f.origAvContractor),
      origAvInstallDate: moment(this.f.origAvInstallDate).toISOString(),
      origAvSystemCost: Number(this.f.origAvSystemCost),
      roomName: String(this.f.roomName),
      seatingCapacity: Number(this.f.seatingCapacity),
      seatingType: String(this.f.seatingType),
      tier: Number(this.f.tier),
      buildingId: Number(this.buildingId),
      roomId: Number(this.roomId),
      roomType: String(this.f.roomType)
    };

    this.systServ.updateRoom(room)
      .subscribe( data => {
        this.snackbar.open('Room Saved', '', {
            duration: 1500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          }
        );
        this.globalVars.spinner = false;
        this.roomModalShownEdit = false;
      }, error => {
        this.globalVars.spinner = false;
        console.log(error);
      });
  }

  confirmCancel(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.roomModalShownEdit = false;
    });
  }

  openDialogAddPhoto(): void {
    const dialogRef = this.dialog.open(AddPhotosComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.buildingId,
      }
    });
  }

  openDialogAddNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.buildingId,
      }
    });
  }

  openDialogUploadDocument(): void {
    const dialogRef = this.dialog.open(UploadDocumentComponent, {
      data: {
        form: this.f,
        roomId: this.roomId,
        buildingId: this.buildingId,
      }
    });
  }


}

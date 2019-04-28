import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { SystemsService } from '../../_services/systems.service';
import {RoomDetails} from '../../_models/systems.model';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.scss']
})
export class RoomdetailComponent implements OnInit {
  public roomDetailImages: Array<{src: string, caption: string, thumb: string}> = [{
     src: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
     caption: '',
     thumb: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
    }, {
     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDD_qoA8zJjQVOhDVWfjrJqowwJkfCC1v4ZPG8ZIPkLuW3gv',
     caption: '',
     thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDD_qoA8zJjQVOhDVWfjrJqowwJkfCC1v4ZPG8ZIPkLuW3gv',
    }, {
     src: 'http://www.letsgodigital.org/images/producten/3376/pictures/canon-eos-sample-photo.jpg',
     caption: '',
     thumb: 'http://www.letsgodigital.org/images/producten/3376/pictures/canon-eos-sample-photo.jpg',
    }, {
     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
     caption: '',
     thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    }, {
     src: 'http://eastmainstream.com/mmc/amintalati/wp-content/uploads/2018/02/Nikon-1-V3-sample-photo.jpg',
     caption: '',
     thumb: 'http://eastmainstream.com/mmc/amintalati/wp-content/uploads/2018/02/Nikon-1-V3-sample-photo.jpg',
    }, {
     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVov4yj9BfRY0sxaEvC0NjnYsfMiF-opuwGUSQAcOUzbrXxn3',
     caption: '',
     thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVov4yj9BfRY0sxaEvC0NjnYsfMiF-opuwGUSQAcOUzbrXxn3',
    }, {
     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
     caption: '',
     thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPlVZcqH4_LUpjyWsDxRZXG9SqUBBgRHHXFnlKvSd51agTsPR',
    }, {
     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyO85yZAkJjTAikilDYHh9BW6W1ptYzf_HgT26fXi-KsCkVjI',
     caption: '',
     thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyO85yZAkJjTAikilDYHh9BW6W1ptYzf_HgT26fXi-KsCkVjI',
    }, {
     src: 'https://i.ytimg.com/vi/DeXVlumJ2uQ/maxresdefault.jpg',
     caption: '',
     thumb: 'https://i.ytimg.com/vi/DeXVlumJ2uQ/maxresdefault.jpg',
    }, {
     src: 'https://i.ytimg.com/vi/6_Wq1_bTcX8/maxresdefault.jpg',
     caption: '',
     thumb: 'https://i.ytimg.com/vi/6_Wq1_bTcX8/maxresdefault.jpg',
    }, {
     src: 'https://i.ytimg.com/vi/QrBOEVIW_zM/maxresdefault.jpg',
     caption: '',
     thumb: 'https://i.ytimg.com/vi/QrBOEVIW_zM/maxresdefault.jpg',
    }, {
     src: 'https://i.ytimg.com/vi/RFywGWm8JV8/maxresdefault.jpg',
     caption: '',
     thumb: 'https://i.ytimg.com/vi/RFywGWm8JV8/maxresdefault.jpg',
    }, {
     src: 'https://i.ytimg.com/vi/wfVQRWNYVTo/maxresdefault.jpg',
     caption: '',
     thumb: 'https://i.ytimg.com/vi/wfVQRWNYVTo/maxresdefault.jpg',
    }
  ];
  public form: FormGroup;
  public roomModalShownEdit: Boolean = false;
  public roomId: number | string = window.location.pathname.split('/')[3];
  public mainPictureIndex: number = 0;
  constructor(
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private formBuilder: FormBuilder,
    private lightbox: Lightbox
  ) {}

  ngOnInit() {
    this.opemRoomDetailed(this.roomId);
  }
  opemRoomDetailed( id?: number | string) {
      this.globalVars.spinner = true;
      this.systServ.getRoomDetails(id)
        .subscribe((data: RoomDetails) => {
          console.log(data);

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
          });


          this.globalVars.spinner = false;
        }, error => {
          this.globalVars.spinner = false;
          console.log(error);
        });
  }
  previousSlideRoom() {
    if (this.mainPictureIndex !== 0) {
      --this.mainPictureIndex;
    } else {
      this.mainPictureIndex =  this.roomDetailImages.length - 1;
    }

  }
  nextSlideRoom() {
    if (this.mainPictureIndex < this.roomDetailImages.length - 1) {
        ++this.mainPictureIndex;
    } else {
      this.mainPictureIndex = 0;
    }

  }

  openImage(imageIndex): void {
    this.lightbox.open(this.roomDetailImages, imageIndex);

  }

}

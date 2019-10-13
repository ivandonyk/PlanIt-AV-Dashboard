import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { CrystalLightbox } from 'ngx-crystal-gallery';
// import { fixOrientation } from 'fix-orientation';
declare var EXIF: any;
import * as fixOrientation from 'fix-orientation';
import {GlobalVarsHelper} from '../../_helpers/global-vars';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() roomDetailImages: string;
  @ViewChild('carousel', {read: DragScrollComponent}) ds: DragScrollComponent;

  public mainPictureIndex: any = 0;
  public images: Array<{path: string}> = [];


  constructor(
    public crystalLightbox: CrystalLightbox,
    public globalVars: GlobalVarsHelper,

  ) {
  }
  ngOnInit() {
    const self = this;
    console.log(JSON.parse(this.roomDetailImages));
    const images = JSON.parse(this.roomDetailImages);
    images.forEach((item, index) => {
      self.globalVars.spinner = true;

      const img = document.createElement('img');
      img.src = 'https://cors-anywhere.herokuapp.com/' + item.path;
      img.width = 200;
      img.height = 200;
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        // ts-ignore
        let loadExif = function loadExif(callback) {
          return callback(1);
        };
        if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
          // @ts-ignore
          loadExif = function loadExif(callback) {
            return EXIF.getData(img, function () {
              return callback(EXIF.getTag(this, 'Orientation'));
            });
          };
        }

        return loadExif(function (orientation) {
          console.log(orientation)
          item.orientation = orientation;
          item.path = item.path + '?orient=' + orientation;
          self.images.push(item);
          self.globalVars.spinner = false;
        });
      };
    });
  }
  previousSlideRoom() {
    if (this.mainPictureIndex !== 0) {
      --this.mainPictureIndex;
    } else {
      this.mainPictureIndex =  this.images.length - 1;
    }
  }
  nextSlideRoom() {
    if (this.mainPictureIndex < this.images.length - 1) {
      ++this.mainPictureIndex;
    } else {
      this.mainPictureIndex = 0;
    }

  }
  regeneratePath(path) {
    return 'url("' + path + '")';
  }

}

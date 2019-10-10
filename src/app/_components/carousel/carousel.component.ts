import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { CrystalLightbox } from 'ngx-crystal-gallery';
// import { fixOrientation } from 'fix-orientation';
declare var EXIF: any;
import * as fixOrientation from 'fix-orientation';

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
  ) {
  }
  ngOnInit() {
    console.log(JSON.parse(this.roomDetailImages));
    const images = JSON.parse(this.roomDetailImages);
    // images.forEach((item, index) => {
    //   console.log(item)
    //
    //   const imgEle = document.createElement('img');
    //   imgEle.src = item.path;
    //   imgEle.width = 200;
    //   imgEle.height = 200;
    //
    //   //
    //   // fixOrientation(item.path, { image: true }, function (fixed, image) {
    //   //   // var img = new Image();
    //   //   // img.src = fixed;
    //   //  console.log(fixed)
    //   //  console.log(image);
    //   // });
    //
    //
    // })

    this.images = JSON.parse(this.roomDetailImages);
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
  // imgToBase64(img) {
  //   var canvas = document.createElement('canvas')
  //   var ctx = canvas.getContext('2d')
  //   ctx.fillStyle = '#fff';
  //   canvas.width = 200
  //   canvas.height = 200
  //   ctx.drawImage(img, 0, 0)
  //
  //   // If the image is not png, the format
  //   // must be specified here
  //   return canvas.toDataURL("image/jpeg");
  // }

  regeneratePath(path) {
    return 'url("' + path + '")';
  }

}

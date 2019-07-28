import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { CrystalLightbox } from 'ngx-crystal-gallery';

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
    public crystalLightbox: CrystalLightbox
  ) {
  }
  ngOnInit() {
    console.log(this)
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


  regeneratePath(path) {
    return 'url("' + path + '")';
  }
}

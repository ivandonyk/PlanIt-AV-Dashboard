import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() roomDetailImages: string;

  public mainPictureIndex: number = 0;
  public images: Array<{src: string, caption: string, thumb: string}> = [];


  constructor(
    private lightbox: Lightbox

  ) {
  }
  ngOnInit() {
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

  openImage(imageIndex): void {
    this.lightbox.open(this.images, imageIndex);

  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() roomDetailImages: string;
  @ViewChild('carousel', {read: DragScrollComponent}) ds: DragScrollComponent;

  public images: Array<{src: string, caption: string, thumb: string}> = [];


  constructor(
    private lightbox: Lightbox

  ) {
  }
  ngOnInit() {
    this.images = JSON.parse(this.roomDetailImages);
  }
  previousSlideRoom() {
    this.ds.moveLeft();

  }
  nextSlideRoom() {
    this.ds.moveRight();

  }

  openImage(imageIndex): void {
    this.lightbox.open(this.images, imageIndex);

  }
}

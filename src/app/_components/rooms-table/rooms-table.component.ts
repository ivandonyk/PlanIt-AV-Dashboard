import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room-table-component',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.scss']
})

export class RoomsTableComponent implements OnInit {
  @Input() data: string;
  @Input() displayedColumns: string;

  public roomId: number = null;

  constructor() {
  }
  ngOnInit() {

  }

  open(status?: boolean, id?: number) {

  }


}

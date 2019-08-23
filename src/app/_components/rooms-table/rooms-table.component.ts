import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-room-table-component',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.scss']
})

export class RoomsTableComponent implements OnInit {
  @Input() dataSource: string;
  @Input() tableid: string | number;
  @Input() displayedColumns: string ;
  @ViewChild(MatSort) sort: MatSort;
  @Output() clickRow = new EventEmitter<number>();


  public roomId: number = null;
  public searchQ: string = '';
  public data: any;
  public columns: Array<{key: string, title: string}>;
  public columnsHeader: Array<string> = ['colorCode'];

  constructor() {
  }
  ngOnInit() {
    this.data = new MatTableDataSource(JSON.parse(this.dataSource));
    this.columns = JSON.parse(this.displayedColumns);
    this.data.sort = this.sort;
    this.columns.forEach((item) => {
      this.columnsHeader.push(item.key);
    });

    if(window.localStorage.getItem('tableSearch' + this.tableid) != null) {
     this.applyFilter(window.localStorage.getItem('tableSearch' + this.tableid));
    }

  }

  open(id: number) {
    console.log(id);
    this.clickRow.emit(id);
  }

  applyFilter(filterValue: string) {
    if (!filterValue)
      return;
    window.localStorage.setItem('tableSearch' + this.tableid, filterValue);
    this.data.filter = filterValue.trim().toLowerCase();
    this.searchQ = filterValue;
  }

}

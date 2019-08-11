import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-project-planning-table-component',
  templateUrl: './project-planning-table.component.html',
  styleUrls: ['./project-planning-table.component.scss']
})

export class ProjectPlanningTableComponent implements OnInit {
  @Input() dataSource: string;
  @Input() displayedColumns: string;
  @ViewChild(MatSort) sort: MatSort;
  @Output() clickRow = new EventEmitter<number>();
  public columnsHeader: Array<string> = [];


  public roomId: number = null;
  public data: any;
  public columns: Array<{key: string, title: string}>;

  constructor() {
  }
  ngOnInit() {
    this.columns = JSON.parse(this.displayedColumns);
    this.data = new MatTableDataSource(JSON.parse(this.dataSource));
    this.columns.forEach((item) => {
      this.columnsHeader.push(item.key);
    });
    this.data.sort = this.sort;
  }

  open(id: number) {
    this.clickRow.emit(id);
  }

  numberWithCommas(x) {
    return x ?  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x;
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

}

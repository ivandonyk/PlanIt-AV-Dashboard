import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {ProjectPlan, ProjectPlanList} from '../../_models/project-plannings.model';
import {ProjectPlanningService} from '../../_services/project-planning.service';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss']
})
export class PrintDialogComponent implements OnInit {
  public printForm = this.fb.group({
    year: new FormControl(''),
    to: new FormControl(''),
    barChart: new FormControl(''),
  });
  public ProjPlanSum: ProjectPlan[];
  public selectedYears = [];
  public displayedColumns: Array<string> = ['year', 'one', 'two'];
  public years: Array<number> = [
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
    2036,
    2037,
    2038,
    2039,
    2040,
    2041,
    2042,
    2043,
    2044,
    2045,
    2046,
    2047,
    2048,
    2049,
    2050,
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PrintDialogComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    private snackbar: MatSnackBar,
    private projectPlanningServ: ProjectPlanningService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) { }

  ngOnInit() {
    this.getProjPlanSum();

  }

  onSubmit() {
    this.globalVars.spinner = true;
  }

  cancel() {
    this.dialogRef.close();
  }

  yearChanged () {
    const data = [];
    const rangeArr = this.range(this.printForm.value.year, this.printForm.value.to);
    if (rangeArr) {
      rangeArr.forEach(item => {
        const result = this.ProjPlanSum.filter(yer => Number(yer.year) === Number(item));
        if (result.length > 0) {
          data.push(result[0]);
        }
      });
      setTimeout(() => {
        this.selectedYears = data
        console.log(data);
        console.log(this.selectedYears);
      }, 2000);
    }
  }

  range(start, end) {

    const arr = [];
    while (start <= end) {
      arr.push(start++);
    }
    return arr;
  }

  getProjPlanSum() {
    this.projectPlanningServ.getProjPlanSum()
      .subscribe((data: ProjectPlanList) => {
        this.ProjPlanSum = data.projectPlanList;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;

      });

  }


}

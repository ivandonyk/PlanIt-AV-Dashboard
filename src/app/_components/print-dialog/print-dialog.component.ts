import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {ProjectPlan, ProjectPlanList, ProjPlanDetail, ProjPlanDetailObj} from '../../_models/project-plannings.model';
import {ProjectPlanningService} from '../../_services/project-planning.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  public customObj: any = {};
  public customArr: any = [];

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
    // this.globalVars.spinner = true;
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
        this.selectedYears = data;
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
        this.ProjPlanSum.forEach(item => {
          this.customObj['el_' + item.year] = {
            'proj': item,
            'status': {
              'list': null,
              'desc': null,
            },
            'list': null,
            'desc': null,
          };
        });
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;

      });

  }

  getProjPlanDetail(year, currentObj) {
    this.projectPlanningServ.getProjPlanDetail(year)
      .subscribe((data: ProjPlanDetailObj) => {
          currentObj.list = this.bodyRows(data.projectPlanDetailList);
      }, error => {
        console.log(error);
      });
  }
  // getProjectDesc(roomId, currentObj) {
  //   this.systServ.getProjectDesc(roomId)
  //     .subscribe((data) => {
  //       currentObj.desc = data['projectDescriptionList'];
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  generateJson() {

    Object.keys(this.customObj).forEach(item => {
      const year = item.split('_')[1];
      const elem = this.customObj['el_' + year];
      if (elem.status.list) {
        this.getProjPlanDetail(year, elem);
      }
      // if (elem.status.desc) {
      //   if (elem.list) {
      //     this.getProjectDesc(elem.list.roomId, elem);
      //   } else {
      //     this.getProjPlanDetail(year, elem);
      //     this.getProjectDesc(elem.list.roomId, elem);
      //   }
      // }
      this.customArr.push(elem);
    });
  }


  bodyRows(arr) {
    const body = [];
    arr.forEach(item => {
      body.push([
                  String(item.building),
                  String(item.room),
                  String(item.type),
                  String(item.tier),
                  String(item.coreAge),
                  String(item.equipmentAge),
                  String(item.projectedCost)
                ]);
    });
    return body;
  }


  downloadPdf() {
    this.globalVars.spinner = true;
    this.generateJson();

    const doc = new jsPDF();
    setTimeout(() => {
      this.customArr.forEach((item, index) => {
        let finalY = 0;
        if (doc.previousAutoTable) {
           finalY = doc.previousAutoTable.finalY;
        };

        doc.text(item.proj.year + ' ' + item.proj.projects +  ' $' + item.proj.amount, 14, finalY + 10);

        if (item.status.list ) {
          doc.autoTable({
            startY: finalY + 15,
            head: [['Building', 'Room', 'Type', 'Tier', 'Core Age', 'Equipment Age', 'Projected Cost']],
            body: item.list
          });
        }
      });
    }, 2000);



    console.log(this);

    setTimeout(() => {
      this.globalVars.spinner = false;
      doc.save('Test.pdf');
    }, 7000);
  }

}

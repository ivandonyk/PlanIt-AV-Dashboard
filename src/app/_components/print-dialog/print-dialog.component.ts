import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatTableModule, MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {ProjectPlan, ProjectPlanList, ProjPlanDetail, ProjPlanDetailObj} from '../../_models/project-plannings.model';
import {ProjectPlanningService} from '../../_services/project-planning.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Document, Paragraph, Packer, TextRun, ShadingType, Media } from 'docx';
import { saveAs } from 'file-saver';



interface Window {
  webkitURL?: any;
  URL?: any;
}

declare let window: Window;


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
  public customYearArr: any = [];
  public chart64: any;
  public imgURI: any;
  public img64: any;
  public withChart: any;

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
    const svg = document.querySelector('svg.ngx-charts');
    // const xml = new XMLSerializer().serializeToString(svg);
    // console.log(xml)
    // const svg64 = btoa(xml);
    // const b64start = 'data:image/png;base64,';
    // this.chart64 = b64start + svg64;
    // this.chart64 = b64start + svg64;


    this.downloadSvg(svg, 'chart.png')

    // console.log(this.chart64);
    this.getProjPlanSum();
  }

   downloadSvg(svg, fileName) {
    const $this = this;
    const copy = svg.cloneNode(true);
    this.copyStylesInline(copy, svg);
    const canvas = document.createElement('canvas');
    const bbox = svg.getBBox();
    canvas.width = (bbox.width + 400);
    canvas.height = (bbox.height + 400);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, bbox.width, bbox.height );
    const data = (new XMLSerializer()).serializeToString(copy);
    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = DOMURL.createObjectURL(svgBlob);
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
      if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
        const blob = canvas.msToBlob();
        $this.imgURI = blob;
        console.log(blob)
        navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        $this.imgURI = canvas.toDataURL('image/png');
        $this.img64 = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
        console.log($this.imgURI )
        // const imgURI = canvas
        //   .toDataURL('image/png')
        //   .replace('image/png', 'image/octet-stream');
      }
      document.removeChild(canvas);
    };
    img.src = url;
  }
   copyStylesInline(destinationNode, sourceNode) {
    const containerElements = ['svg', 'g'];
    for (let cd = 0; cd < destinationNode.childNodes.length; cd++) {
      const child = destinationNode.childNodes[cd];
      if (containerElements.indexOf(child.tagName) !== -1) {
        this.copyStylesInline(child, sourceNode.childNodes[cd]);
        continue;
      }
      const style = sourceNode.childNodes[cd].currentStyle ;
      if (style === 'undefined' || style == null) {
        continue;
      }
      for (let st = 0; st < style.length; st++){
        child.style.setProperty(style[st], style.getPropertyValue(style[st]));
      }
    }
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
            'list': [],
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
          // this.customYearObj['y_' + year] = data.projectPlanDetailList;
          this.customYearArr.push(...data.projectPlanDetailList);
          currentObj.list = this.bodyRows(data.projectPlanDetailList);
      }, error => {
        console.log(error);
      });
  }

  generateJson = async () => {
    this.customArr = [];
    this.customYearArr = [];
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
    console.log(this.withChart)
    if (this.withChart) {
      doc.addImage(this.imgURI, 'PNG', 1, 2);
    }


    setTimeout(() => {
      this.customArr.forEach((item, index) => {
        let finalY = this.withChart ? 50 : 0;
        if (doc.previousAutoTable) {
           finalY = doc.previousAutoTable.finalY;
        }


        if (item.status.list ) {

          doc.text(item.proj.year + ' ' + item.proj.projects +  ' $' + item.proj.amount, 14, finalY + 10);

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

  downloadExcel = async () => {
    this.globalVars.spinner = true;

    await this.generateJson();

    setTimeout(() => {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(this.customYearArr);
      XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
      this.globalVars.spinner = false;
      XLSX.writeFile(workBook, 'temp.xlsx');
    }, 5000);
  };

  downloadDoc = async () => {
    this.globalVars.spinner = true;

    await this.generateJson();
    const doc = new Document();


    const headersMargin = {
      top: 40,
      bottom: 40,
      left: 60,
      right: 60,
    };
    console.log(this);


    if (this.withChart) {
      doc.createImage(this.imgURI, 900, 830, {
        floating: {
          horizontalPosition: {
            offset: 0,
          },
          verticalPosition: {
            offset: 0,
          },
          margins: {
            top: 50,
          },
          allowOverlap: true,
        },
      });

      doc.addParagraph(new Paragraph('').heading1());
      doc.addParagraph(new Paragraph('').heading1());
      doc.addParagraph(new Paragraph('').heading1());
      doc.addParagraph(new Paragraph('').heading1());
      doc.addParagraph(new Paragraph('').heading1());
      doc.addParagraph(new Paragraph('').heading1());
      doc.addParagraph(new Paragraph('').heading1());
    }


    setTimeout(() => {
      this.customArr.forEach((item, index) => {
        doc.addParagraph(new Paragraph('').heading3());
        doc.addParagraph(new Paragraph('').heading3());
        doc.addParagraph(new Paragraph('').heading3());
        doc.addParagraph(new Paragraph(item.proj.year + ' ' + item.proj.projects +  ' $' + item.proj.amount).heading1());
        doc.addParagraph(new Paragraph('').heading3());

          console.log(item)
        const table = doc.createTable({
          rows: 1 + item.list.length,
          columns: 7,
          width: 200,
        });

        table.getCell(0, 0).addParagraph(new Paragraph('Building').heading1()).setMargins(headersMargin);
        table.getCell(0, 1).addParagraph(new Paragraph('Room').heading1()).setMargins(headersMargin);
        table.getCell(0, 2).addParagraph(new Paragraph('Type').heading1()).setMargins(headersMargin);
        table.getCell(0, 3).addParagraph(new Paragraph('Tier').heading1()).setMargins(headersMargin);
        table.getCell(0, 4).addParagraph(new Paragraph('Core Age').heading1()).setMargins(headersMargin);
        table.getCell(0, 5).addParagraph(new Paragraph('Equipment Age').heading1()).setMargins(headersMargin);
        table.getCell(0, 6).addParagraph(new Paragraph('Projected Cost').heading1()).setMargins(headersMargin);

        if (item.list.length > 0) {
          item.list.forEach( (itemD, indexD) => {
            const pos = indexD + 1;
            table.getCell(pos, 0).addParagraph(new Paragraph(String(itemD[0])));
            table.getCell(pos, 1).addParagraph(new Paragraph(String(itemD[1])));
            table.getCell(pos, 2).addParagraph(new Paragraph(String(itemD[2])));
            table.getCell(pos, 3).addParagraph(new Paragraph(String(itemD[3])));
            table.getCell(pos, 4).addParagraph(new Paragraph(String(itemD[4])));
            table.getCell(pos, 5).addParagraph(new Paragraph(String(itemD[5])));
            table.getCell(pos, 6).addParagraph(new Paragraph(String(itemD[6])));
          });
        }

      });

      const packer = new Packer();

      packer.toBlob(doc).then(blob => {
        saveAs(blob, "doc.docx");
        console.log("Document created successfully");
      });
      this.globalVars.spinner = false;
    }, 9000);


  }

}

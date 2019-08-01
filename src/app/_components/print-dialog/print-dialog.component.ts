import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import {MatDialogRef, MatSnackBar , MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {ProjectPlan, ProjectPlanList , ProjPlanDetailObj} from '../../_models/project-plannings.model';
import {ProjectPlanningService} from '../../_services/project-planning.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Document, Paragraph, Packer, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import {AuthenticationService} from '../../_services/authentication.service';



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
  public singleArr: Array<{name: string, value: number}> = [];
  public ProjPlanSum: ProjectPlan[];
  public selectedYears = [];
  public displayedColumns: Array<string> = ['year', 'one', 'two'];
  public years: Array<number> = [];
  public yearsEnd: Array<number> = [];
  public customObj: any = {};
  public customArr: any = [];
  public customYearArr: any = [];
  public chart64: any;
  public imgURI: any;
  public img64: any;
  public withChart: any;
  public textChart: any = [];
  public view: Array<number> = [300, 200];


  public colorScheme = {
    domain: ['#fa0006']
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PrintDialogComponent>,
    private systServ: SystemsService,
    public globalVars: GlobalVarsHelper,
    public authServ: AuthenticationService,
    private snackbar: MatSnackBar,
    private projectPlanningServ: ProjectPlanningService,
    @Inject(MAT_DIALOG_DATA) public data: {
      years: {
        start: number,
        end: number,
      }
    }
  ) { }

  ngOnInit() {


    this.years = this.range(this.data.years.start, this.data.years.end);
    this.yearsEnd = this.range(this.data.years.start, this.data.years.end);
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
        navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        $this.imgURI = canvas.toDataURL('image/png');
        $this.img64 = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
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
      for (let st = 0; st < style.length; st++) {
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

  yearChanged() {
    const data = [];
    this.yearsEnd = this.range(this.printForm.value.year, this.data.years.end);
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
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }

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
        if (error.error.error === 'invalid_token') {
          this.authServ.logout();
        }
      });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  generateJson = async () => {
    this.customArr = [];
    this.customYearArr = [];
    this.singleArr = [];
    Object.keys(this.customObj).forEach(item => {
      const year = item.split('_')[1];
      const elem = this.customObj['el_' + year];
      if (elem.status.list) {
         this.getProjPlanDetail(year, elem);


        const result = this.ProjPlanSum.filter(yer => Number(yer.year) === Number(year));

          this.singleArr.push({
            name: result[0].year,
            value: result[0].amount
          });
        this.textChart.push({
          year: result[0].year,
          amount: result[0].amount
        });
          Object.assign(this, this.singleArr);

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

    setTimeout(() => {
      const svg = document.querySelector('#hiddenChart svg.ngx-charts');
      this.downloadSvg(svg, 'chart.png');
    }, 1000);

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
                  String('$' + this.numberWithCommas(String(item.projectedCost)))
                ]);
    });
    return body;
  }

  downloadPdf() {
    this.globalVars.spinner = true;
    this.customArr = [];
    this.generateJson();
    const doc = new jsPDF();
    doc.text('Client Company AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '', 14 , 10).setFontSize(11);
    setTimeout(() => {
      if (this.withChart) {
        doc.addImage(this.imgURI, 'PNG', 10, 20);
      }
      this.customArr.forEach((item) => {
        let finalY = this.withChart ? 65 : 20;
        if (doc.previousAutoTable) {
           finalY = doc.previousAutoTable.finalY;
        }
        if (item.status.list ) {
          doc.text(item.proj.year + ' ' + item.proj.projects +  ' $' + this.numberWithCommas(item.proj.amount), 10, finalY + 10).setFontSize(11);

          doc.autoTable({
            startY: finalY + 15,
            head: [['Building', 'Room', 'Type', 'Tier', 'Core Age', 'Equipment Age', 'Projected Cost']],
            body: item.list,
            headStyles:  {
              fillColor: [255, 255, 255],
              textColor: [130, 130, 130],
              lineColor: [0, 0, 0],
              lineWidth: 0.1,
              fontStyle: 'normal4'

            },
            bodyStyles:  {
              lineColor: [0, 0, 0],
              lineWidth: 0.1,
            }, // Cells in first column centered and green
          });
        }
      });
    }, 2000);
    setTimeout(() => {
      this.globalVars.spinner = false;
      doc.save('Client Company AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '.pdf');
    }, 7000);
  }

  downloadExcel = async () => {
    this.globalVars.spinner = true;

    await this.generateJson();

    setTimeout(() => {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(this.customYearArr);
      const chart = XLSX.utils.json_to_sheet(this.textChart);
      XLSX.utils.book_append_sheet(workBook, chart, 'AV Projects Total by Year');
      XLSX.utils.book_append_sheet(workBook, workSheet, 'AV Porject Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to);
      this.globalVars.spinner = false;
      XLSX.writeFile(workBook, 'Client Company AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '.xlsx');
    }, 5000);
  }

  downloadDoc = async () => {
    this.globalVars.spinner = true;
    this.customArr = [];
    await this.generateJson();
    const doc = new Document();


    const headersMargin = {
      top: 40,
      bottom: 40,
      left: 60,
      right: 60,
    };

    doc.Styles.createParagraphStyle('title', 'title')
      .size(40)
      .font('Arial');

    doc.addParagraph(new Paragraph('Client Company AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to).title().style('title'));



    doc.Styles.createParagraphStyle('Heading2', 'Heading')
      .quickFormat()
      .size(23)
      .color('555555')
      .font('Arial');

    doc.Styles.createParagraphStyle('Heading3', 'Heading')
      .quickFormat()
      .size(30)
      .color('000000')
      .font('Arial');

    doc.Styles.createParagraphStyle('Paragraph', 'Paragraph')
      .quickFormat()
      .size(30)
      .color('000000')
      .font('Arial');

    doc.Styles.createParagraphStyle('cell', 'cell')
      .quickFormat()
      .size(23)
      .color('000000')
      .font('Arial');

    const svg = document.querySelector('#hiddenChart svg.ngx-charts');
    this.downloadSvg(svg, 'chart.png');
    setTimeout(() => {
      if (this.withChart) {
        const svg = document.querySelector('#hiddenChart svg.ngx-charts');
        this.downloadSvg(svg, 'chart.png');
        doc.createImage(this.imgURI, 400, 350, {
          floating: {
            horizontalPosition: {
              offset: 1014400,
            },
            verticalPosition: {
              offset: 2014400,
            },
            margins: {
              top: 150,
              left: 200,
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
        doc.addParagraph(new Paragraph('').heading1());
        doc.addParagraph(new Paragraph('').heading1());
        doc.addParagraph(new Paragraph('').heading1());
      }

      this.customArr.forEach((item, index) => {

        if (item.list.length > 0) {
          doc.addParagraph(new Paragraph('').heading3());
          doc.addParagraph(new Paragraph('').heading3());
          doc.addParagraph(new Paragraph('').heading3());
          doc.addParagraph(new Paragraph(item.proj.year + ' ' + item.proj.projects +  ' $' + this.numberWithCommas(item.proj.amount)).heading1().style('Heading3'));
          doc.addParagraph(new Paragraph('').heading3());

          const table = doc.createTable({
            rows: 1 + item.list.length,
            columns: 7,
            width: 100,
            widthUnitType: WidthType.PERCENTAGE,
          });


          table.getCell(0, 0).addParagraph(new Paragraph('Building').heading1().style('Heading2')).setMargins(headersMargin);
          table.getCell(0, 1).addParagraph(new Paragraph('Room').heading1().style('Heading2')).setMargins(headersMargin);
          table.getCell(0, 2).addParagraph(new Paragraph('Type').heading1().style('Heading2')).setMargins(headersMargin);
          table.getCell(0, 3).addParagraph(new Paragraph('Tier').heading1().style('Heading2')).setMargins(headersMargin);
          table.getCell(0, 4).addParagraph(new Paragraph('Core Age').heading1().style('Heading2')).setMargins(headersMargin);
          table.getCell(0, 5).addParagraph(new Paragraph('Equipment Age').heading1().style('Heading2')).setMargins(headersMargin);
          table.getCell(0, 6).addParagraph(new Paragraph('Projected Cost').heading1().style('Heading2')).setMargins(headersMargin);

          if (item.list.length > 0) {
            item.list.forEach( (itemD, indexD) => {
              const pos = indexD + 1;
              table.getCell(pos, 0).addParagraph(new Paragraph(String(itemD[0])).style('cell'));
              table.getCell(pos, 1).addParagraph(new Paragraph(String(itemD[1])).style('cell'));
              table.getCell(pos, 2).addParagraph(new Paragraph(String(itemD[2])).style('cell'));
              table.getCell(pos, 3).addParagraph(new Paragraph(String(itemD[3])).style('cell'));
              table.getCell(pos, 4).addParagraph(new Paragraph(String(itemD[4])).style('cell'));
              table.getCell(pos, 5).addParagraph(new Paragraph(String(itemD[5])).style('cell'));
              table.getCell(pos, 6).addParagraph(new Paragraph(String(itemD[6])).style('cell'));
            });
          }
        }

      });

      const packer = new Packer();

      packer.toBlob(doc).then(blob => {
        saveAs(blob, 'Client Company AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '.docx');
      });
      this.globalVars.spinner = false;
    }, 9000);


  }

}

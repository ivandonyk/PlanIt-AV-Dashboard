import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import {MatDialogRef, MatSnackBar , MAT_DIALOG_DATA} from '@angular/material';
import {SystemsService} from '../../_services/systems.service';
import {GlobalVarsHelper} from '../../_helpers/global-vars';
import {ProjectPlan, ProjectPlanList , ProjPlanDetailObj} from '../../_models/project-plannings.model';
import {ProjectPlanningService} from '../../_services/project-planning.service';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Document, Paragraph, Packer, WidthType, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { AuthenticationService } from '../../_services/authentication.service';
import { DashboardService } from '../../_services/dashboard.service';
import { Dashboard } from '../../_models/dashboard.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  public businessName: any = "";


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
    private dashServ: DashboardService,
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

    this.dashServ.getDashboardData()
      .subscribe((data: Dashboard) => {
        this.businessName = data.businessName;
        this.globalVars.spinner = false;
      }, error => {
        console.log(error.error);
        if (error.error.error === 'invalid_token'){
          this.authServ.logout();
        }
      });
  }

  downloadSvg(svg, fileName) {
    const $this = this;
    const copy = svg.cloneNode(true);
    this.copyStylesInline(copy, svg);
    const canvas = document.createElement('canvas');
    const bbox = svg.getBBox();
    console.log(bbox)
    canvas.width = ( 300);
    canvas.height = ( 200);
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
            'items': [],
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
          currentObj.items.push(...data.projectPlanDetailList)
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
    this.textChart = [];
    this.singleArr = [];
    Object.keys(this.customObj).forEach(item => {
      const year = item.split('_')[1];
      const elem = this.customObj['el_' + year];
      if (elem.status.list) {
         this.getProjPlanDetail(year, elem);

        const result = this.ProjPlanSum.filter(yer => Number(yer.year) === Number(year));


        console.log(this.singleArr);

        this.singleArr.push({
          name: result[0].year,
          value: Number(result[0].amount)
        });

        this.textChart.push({
          Year: result[0].year,
          Amount: '$' + this.numberWithCommas(Number(result[0].amount))
        });
          Object.assign(this, this.singleArr);
        setTimeout(() => {
          const textArr = document.querySelectorAll('ngx-charts-bar-vertical text');
          for (let i = 0; i < textArr.length; i++) {
            textArr[i].innerHTML = textArr[i].innerHTML.replace(/[^0-9]/g, '');
          }
        }, 200);
      }
      // if (elem.status.desc) {
      //   if (elem.list) {
      //     this.getProjectDesc(elem.list.roomId, elem);
      //   } else {
      //     this.getProjPlanDetail(year, elem);
      //     this.getProjectDesc(elem.list.roomId, elem);
      //   }
      // }
      // setTimeout(() => {
      console.log(elem)
        this.customArr.push(elem);
      // }, 10000)
    });
    console.log(this)


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
    let dd;


    setTimeout(() => {
      dd = {
        info: {
          title: this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to,
          subject: this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to,
        },
        content: [
          {
            stack: [
              this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '',
            ],
            style: 'header'
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 20],
          },
          title: {
            margin: [0, 40, 40, 5],
            bold: true,
          }
        }

      };

      if (this.withChart) {
        dd.content.push({
          image: this.imgURI,
          width: 250,
          height: 150,
        });
      }

      console.log(this.textChart)

      const textChartArr = [
        [ { text: 'Year', bold: true }, { text: 'Amount', bold: true }]
      ];

      this.textChart.forEach((item, index) => {
        textChartArr.push([item.Year, item.Amount]);
      } )

      dd.content.push({
        table: {
          headerRows: 1,
          widths: [ 'auto', 'auto' ],
          body: textChartArr
        }
      });




      this.customArr.forEach((item, itemIndex) => {
        if (item.status.list) {

          dd.content.push({
              stack: [
                item.proj.year + ' ' + item.proj.projects +  ' $' + this.numberWithCommas(item.proj.amount),
              ],
              style: 'title'
            });

          item.items.forEach((room, roomIndex) => {
            let desc = '';
            let descTitle = '';
            if (item.status.desc && room.projectDesc != null) {
              desc = room.projectDesc;
              descTitle = 'Project Description';
            }

            dd.content.push({
              stack: [
                  {
                    text: room.building + ' - ' + room.room + (room.projectedCost != null ? ' $' + this.numberWithCommas(room.projectedCost) : ''),
                    margin: [40, 0],
                    bold: true
                  },
                  {
                    text: 'Tier ' + room.tier,
                    margin: [40, 0],
                  },
                  {
                    text: 'Room Type: ' + room.type,
                    margin: [40, 0],
                  },
                  {
                    text: descTitle,
                    bold: true,
                    margin: [40, 10, 0, 0],
                  },
                  {
                    text: desc,
                    margin: [80, 10],
                  }
                ]
            });


          });
        }
      });


      setTimeout(() => {
        this.globalVars.spinner = false;
        pdfMake.createPdf(dd).download(this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '.pdf');
      }, 9000);
    }, 2000);




  }

  downloadExcel = async () => {
    this.globalVars.spinner = true;

    await this.generateJson();

    setTimeout(() => {
      this.customYearArr.forEach((item, index) => {
        delete item.roomId;
        Object.keys(item).forEach((itemDeep, index) => {
          switch (itemDeep) {
            case 'updateYear':
              item['Update Year'] =  item['updateYear'];
              delete item.updateYear;
              break;
            case 'building':
              item['Building Name'] =  item['building'];
              delete item.building;
              break;
            case 'room':
              item['Room Name'] =  item['room'];
              delete item.room;
              break;
            case 'type':
              item['Type'] =  item['type'];
              delete item.type;
              break;
            case 'tier':
              item['Tier'] =  item['tier'];
              delete item.tier;
              break;
            case 'coreAge':
              item['Core Age'] =  item['coreAge'];
              delete item.coreAge;
              break;
            case 'equipmentAge':
              item['Equipment Age'] =  item['equipmentAge'];
              delete item.equipmentAge;
              break;
            case 'projectedCost':
              console.log(item['projectedCost'])
              item['Projected Cost'] =  item['projectedCost'] != null ? '$' + this.numberWithCommas(item['projectedCost']) : item['projectedCost'];
              delete item.projectedCost;
              break;
            case 'lastAvInstallYear':
              item['Last Av Install Year'] =  item['lastAvInstallYear'];
              delete item.lastAvInstallYear;
              break;
            case 'lifecycle':
              item['Lifecycle'] =  item['lifecycle'];
              delete item.lifecycle;
              break;
            case 'projectDesc':
              item['Project Description'] =  item['projectDesc'];
              delete item.projectDesc;
              break;
          }
        });
      });
      console.log(this)
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(this.customYearArr, {
        header: ["Update Year", "Building Name", "Room Name", "Type", "Tier", "Core Age", "Equipment Age", "Projected Cost", "Last Av Install Year", "Lifecycle", "Project Description"]
      });
      const chart = XLSX.utils.json_to_sheet(this.textChart);
      XLSX.utils.book_append_sheet(workBook, chart, 'AV Projects Total by Year');
      XLSX.utils.book_append_sheet(workBook, workSheet, 'AV Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to);
      this.globalVars.spinner = false;
      XLSX.writeFile(workBook, this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '.xlsx');
    }, 10000);
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

    doc.addParagraph(new Paragraph(this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to).title().style('title'));



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
      .font('Arial')
      .quickFormat();

    doc.Styles.createParagraphStyle('ParagraphBold', 'ParagraphBold')
      .bold()
      .font('Arial')
      .quickFormat()

    doc.Styles.createParagraphStyle('titleCustomFirst', 'titleCustomFirst')
      .bold()
      .size(22)
      .font('Arial')
      .quickFormat();

    doc.Styles.createParagraphStyle('titleCustom', 'titleCustom')
      .bold()
      .underline('single', '000')
      .spacing({ before: 20 * 72 * .1, after: 20 * 72 * .05})
      .font('Arial')
      .quickFormat();


    const svg = document.querySelector('#hiddenChart svg.ngx-charts');
    this.downloadSvg(svg, 'chart.png');
    setTimeout(() => {
      if (this.withChart) {
        const svg = document.querySelector('#hiddenChart svg.ngx-charts');
        this.downloadSvg(svg, 'chart.png');
        doc.createImage(this.imgURI, 250, 150, {
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

      if (this.textChart.length > 0) {
        doc.addParagraph(new Paragraph('').heading1());
        doc.addParagraph(new Paragraph('').heading1());

        const table = doc.createTable({
          rows: 1 + this.textChart.length,
          columns: 2,
          width: 30,
          widthUnitType: WidthType.PERCENTAGE,
        });

        table.getCell(0, 0).addParagraph(new Paragraph('Year').heading1().style('Heading2')).setMargins(headersMargin);
        table.getCell(0, 1).addParagraph(new Paragraph('Amount').heading1().style('Heading2')).setMargins(headersMargin);

        this.textChart.forEach( (itemD, indexD) => {
          const pos = indexD + 1;
          table.getCell(pos, 0).addParagraph(new Paragraph(String(itemD.Year)).style('cell'));
          table.getCell(pos, 1).addParagraph(new Paragraph(String(itemD.Amount)).style('cell'));
        });
      }


      this.customArr.forEach((item, index) => {

        if (item.list.length > 0) {
          doc.addParagraph(new Paragraph('').heading4());
          doc.addParagraph(new Paragraph('').heading4());
          doc.addParagraph(new Paragraph(item.proj.year + ' ' + item.proj.projects +  ' $' + this.numberWithCommas(item.proj.amount)).style('titleCustomFirst'));




          item.items.forEach((room, roomIndex) => {
            doc.addParagraph(new Paragraph(room.building + ' - ' + room.room + (room.projectedCost != null ? ' $' + this.numberWithCommas(room.projectedCost) : '')).style('titleCustom').indent({left: 550}));
            doc.addParagraph(new Paragraph('Tier ' + room.tier).style('Paragraph').indent({left: 550}));
            doc.addParagraph(new Paragraph('Room Type: ' + room.type).style('Paragraph').indent({left: 550}));
            if (item.status.desc && room.projectDesc != null) {
              doc.addParagraph(new Paragraph(''));
              const desc = room.projectDesc;
              const descTitle = 'Project Description';
              doc.addParagraph(new Paragraph(descTitle).style('ParagraphBold').indent({left: 550}));
              doc.addParagraph(new Paragraph(desc).style('Paragraph').indent({left: 1050}));
            }


            doc.addParagraph(new Paragraph('').heading4());
          });
        }

      });


      setTimeout( () => {
        const packer = new Packer();

        packer.toBlob(doc).then(blob => {
          saveAs(blob, this.businessName + ' AV Capital Project Plan ' + this.printForm.value.year + ' - ' + this.printForm.value.to + '.docx');
        });
        this.globalVars.spinner = false;
      }, 9000);
    }, 3000);



  }

}

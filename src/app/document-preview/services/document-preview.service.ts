import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Subject } from 'rxjs';
import { QuoteData } from 'src/app/databar/quote-data';
import { DatabarService } from 'src/app/databar/services/databar-service.service';
import { avenirNext } from '../assets/custom-fonts/AvenirNext-Regular-normal.module';
import { avenirNextDB } from '../assets/custom-fonts/AvenirNext-DemiBold-normal.module';
import { baskerville } from '../assets/custom-fonts/Baskervville-Regular-normal.module';
import { baskervile_semibold } from '../assets/custom-fonts/Baskerville-SemiBold-05-normal.module';
import { avenirBlack } from '../assets/custom-fonts/Avenir-Black-03-normal.module';
import { futuraBold } from '../assets/custom-fonts/Futura-Bold-03-normal.module';
import { avenirNextMedium } from '../assets/custom-fonts/AvenirNext-Medium-06-normal.module';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DocumentPreviewService {
  private databarService: DatabarService;
  currencyString = 'INR';
  pdfURI: string;
  pdfUriChange: Subject<string> = new Subject<string>();
  constructor(databarService: DatabarService) {
    this.databarService = databarService;
    this.dataSource = this.databarService.getDatasource();
  }
  PDF: jsPDF;
  dataSource: MatTableDataSource<QuoteData>;
  headerWidth = new jsPDF().getImageProperties('assets/q-01.png').width;
  headerHeight = new jsPDF().getImageProperties('assets/q-01.png').height;
  footerWidth = new jsPDF().getImageProperties('assets/q-02.png').width;
  footerHeight = new jsPDF().getImageProperties('assets/q-02.png').height;
  public async loadPDF() {
    let data: any[][] = [];
    this.PDF = new jsPDF();
    this.PDF.addFileToVFS('AvenirNext-Regular.ttf', avenirNext);
    this.PDF.addFont('AvenirNext-Regular.ttf', 'AvenirNext', 'normal');
    this.PDF.addFileToVFS('AvenirNext-DemiBold.ttf', avenirNextDB);
    this.PDF.addFont('AvenirNext-DemiBold.ttf', 'AvenirNextDemiBold', 'normal');
    this.PDF.addFileToVFS('Baskerville-Regular.ttf', baskerville);
    this.PDF.addFont('Baskerville-Regular.ttf', 'Baskerville', 'bold');
    this.PDF.addFileToVFS('Baskerville-SemiBold.ttf', baskervile_semibold);
    this.PDF.addFont(
      'Baskerville-SemiBold.ttf',
      'Baskerville-SemiBold',
      'normal'
    );
    this.PDF.addFileToVFS('AvenirNext-Medium-06.ttf', avenirNextMedium);
    this.PDF.addFont('AvenirNext-Medium-06.ttf', 'AvenirNext-Medium', 'normal');
    this.PDF.addFileToVFS('Avenir-Black-03.ttf', avenirBlack);
    this.PDF.addFont('Avenir-Black-03.ttf', 'Avenir-Black', 'normal');
    this.PDF.addFileToVFS('Futura-Bold-03.ttf', futuraBold);
    this.PDF.addFont('Futura-Bold-03.ttf', 'Futura-Bold', 'normal');
    let count = 0;
    this.dataSource.filteredData.forEach(
      (obj: { details: any; amount: any }) => {
        let arr: any[] = [];
        arr.push(count + 1);
        arr.push(obj.details);
        arr.push(obj.amount);
        count += 1;
        data.push(arr);
      }
    );
    console.log(data);
    let width = this.PDF.internal.pageSize.getWidth();
    let height = this.PDF.internal.pageSize.getHeight();
    this.PDF.setFontSize(11);
    this.PDF.setFont('AvenirNext-Medium');
    this.PDF.setTextColor('#FAA21D');

    this.PDF.text(
      this.databarService.getHeaderDetails().invoiceDate,
      width - 30,
      80
    );
    console.log(this.databarService.getHeaderDetails());
    this.PDF.setTextColor('#C02F67');
    this.PDF.setFontSize(12);
    this.PDF.setFont('Avenir-Black');
    this.PDF.text(this.databarService.getHeaderDetails().coupleText, 15, 90);
    this.PDF.setFontSize(10);
    this.PDF.setFont('Futura-Bold');
    this.PDF.text(
      this.databarService.getHeaderDetails().eventName.toUpperCase(),
      15,
      110
    );
    this.PDF.setFontSize(12);
    this.PDF.setTextColor('#000000');
    this.PDF.setFont('Baskerville-SemiBold');
    this.PDF.text(this.databarService.getHeaderDetails().dateText, 15, 115);
    this.PDF.text(this.databarService.getHeaderDetails().venueText, 15, 120);
    this.PDF.setTextColor('#FAA21D');
    this.PDF.setFont('AvenirNextDemiBold');

    this.PDF.text('1', width - 30, 275);
    let headerWidth = this.headerWidth;
    let headerHeight = this.headerHeight;
    let headerScalingFactor = width / this.headerWidth;
    // this.PDF.addImage(
    //   'assets/q-01.png',
    //   'PNG',
    //   0,
    //   0,
    //   width,
    //   headerHeight * headerScalingFactor
    // );
    let footerWidth = this.footerWidth;
    let footerHeight = this.footerHeight;
    let footerScalingFactor = width / this.footerWidth;
    // this.PDF.addImage(
    //   'assets/q-02.png',
    //   'PNG',
    //   0,
    //   height - footerHeight * footerScalingFactor,
    //   width,
    //   footerHeight * footerScalingFactor
    // );
    console.log(this.databarService.getTotal());
    autoTable(this.PDF, {
      head: [['SR.NO.', 'DETAILS', 'AMOUNT']],
      tableLineColor: [250, 162, 29],
      tableLineWidth: 0.3,
      body: data,
      foot: [
        [
          '',
          'TOTAL',
          'INR ' + this.databarService.getTotal().toLocaleString('en-IN'),
        ],
      ],
      startY: 130,
      theme: 'grid',
      useCss: true,
      columnStyles: {
        0: { cellWidth: 17 },
        1: { cellWidth: 120 },
        2: { cellWidth: 'auto' },
      },
      headStyles: {
        font: 'Futura-Bold',
        textColor: '#C02F67',
        fillColor: '#ffffff',
        fontSize: 10,
        lineColor: [250, 162, 29],
        lineWidth: 0.3,
        halign: 'center',
        valign: 'middle',
      },
      bodyStyles: {
        fontStyle: 'bold',
        fontSize: 12,
        textColor: [0, 0, 0],
        font: 'Baskerville-SemiBold',
        lineColor: [250, 162, 29],
        lineWidth: 0.3,
        halign: 'left',
        valign: 'middle',
      },
      footStyles: {
        font: 'Futura-Bold',
        textColor: '#C02F67',
        fillColor: '#ffffff',
        fontSize: 14,
        lineColor: [250, 162, 29],
        lineWidth: 0.3,
        halign: 'right',
        valign: 'middle',
        minCellHeight: 12,
      },
      margin: {
        top: 80,
        bottom: 30,
      },
      showFoot: 'lastPage',
      willDrawCell: function (data) {
        if (data.section != 'head' && data.section != 'foot') {
          if (
            data.column.index == data.table.columns.length - 1 &&
            data.cell.text[0]
          ) {
            console.log(data.cell.text);
            console.log(data.cell.raw);
            let transformedCurrency = parseInt(
              data.cell.text[0]
            ).toLocaleString('en-IN');
            data.cell.text[0] = transformedCurrency
              ? 'INR ' + transformedCurrency
              : '';
            data.cell.styles.halign = 'center';
          }
          if (data.column.index == 0 && data.cell.text[0]) {
            data.cell.styles.halign = 'center';
          }
        }
      },
      didParseCell: function (data) {
        if (
          data.section == 'foot' &&
          data.column.index == data.table.columns.length - 1
        ) {
          data.cell.styles.textColor = [0, 0, 0];
          data.cell.styles.font = 'Baskerville-SemiBold';
          data.cell.styles.halign = 'center';
        }
      },
      didDrawPage: function (data) {
        data.doc.addImage(
          'assets/q-01.png',
          'PNG',
          0,
          0,
          width,
          headerHeight * headerScalingFactor
        );
        data.doc.addImage(
          'assets/q-02.png',
          'PNG',
          0,
          height - footerHeight * footerScalingFactor,
          width,
          footerHeight * footerScalingFactor
        );
        data.doc.text(data.pageNumber.toString(), width - 30, 275);
      },
    });
    this.pdfURI = this.PDF.output('datauristring');
    this.pdfUriChange.next(this.pdfURI);
  }

  public downloadPDF() {
    if (this.pdfURI) {
      this.PDF.save('download.pdf');
    }
  }
}

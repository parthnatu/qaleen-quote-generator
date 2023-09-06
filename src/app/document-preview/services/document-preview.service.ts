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
@Injectable({
  providedIn: 'root',
})
export class DocumentPreviewService {
  private databarService: DatabarService;
  pdfURI: string;
  pdfUriChange: Subject<string> = new Subject<string>();
  constructor(databarService: DatabarService) {
    this.databarService = databarService;
    this.dataSource = this.databarService.getDatasource();
  }
  PDF: jsPDF;
  currentDate = new Date();
  dataSource: MatTableDataSource<QuoteData>;

  public async loadPDF() {
    return new Promise((resolve) => {
      let data: any[][] = [];
      this.PDF = new jsPDF();
      this.PDF.addFileToVFS('AvenirNext-Regular.ttf', avenirNext);
      this.PDF.addFont('AvenirNext-Regular.ttf', 'AvenirNext', 'normal');
      this.PDF.addFileToVFS('AvenirNext-DemiBold.ttf', avenirNextDB);
      this.PDF.addFont(
        'AvenirNext-DemiBold.ttf',
        'AvenirNextDemiBold',
        'normal'
      );
      this.PDF.addFileToVFS('Baskerville-Regular.ttf', baskerville);
      this.PDF.addFont('Baskerville-Regular.ttf', 'Baskerville', 'bold');
      this.dataSource.filteredData.forEach(
        (obj: { serial_number: any; details: any; amount: any }) => {
          let arr: any[] = [];
          arr.push(obj.serial_number);
          arr.push(obj.details);
          arr.push(obj.amount);
          data.push(arr);
        }
      );
      console.log(data);
      let width = this.PDF.internal.pageSize.getWidth();
      let height = this.PDF.internal.pageSize.getHeight();
      this.PDF.setFontSize(11);
      this.PDF.setFont('AvenirNextDemiBold');
      this.PDF.setTextColor('#FAA21D');

      this.PDF.text(
        this.currentDate.getDay() +
          '.' +
          this.currentDate.getMonth() +
          '.' +
          this.currentDate.getFullYear(),
        width - 30,
        80
      );
      console.log(this.databarService.getHeaderDetails());
      this.PDF.setTextColor('#C02F67');
      this.PDF.setFontSize(12);
      this.PDF.text(this.databarService.getHeaderDetails().coupleText, 15, 90);
      this.PDF.setFontSize(11);
      this.PDF.text(this.databarService.getHeaderDetails().eventName, 15, 110);
      this.PDF.setTextColor('#000000');
      this.PDF.text(this.databarService.getHeaderDetails().dateText, 15, 115);
      this.PDF.text(this.databarService.getHeaderDetails().venueText, 15, 120);
      this.PDF.setTextColor('#FAA21D');

      this.PDF.text('1', width - 30, 275);
      let headerWidth = this.PDF.getImageProperties('assets/q-01.png').width;
      let headerHeight = this.PDF.getImageProperties('assets/q-01.png').height;
      let headerScalingFactor = width / headerWidth;
      // this.PDF.addImage(
      //   'assets/q-01.png',
      //   'PNG',
      //   0,
      //   0,
      //   width,
      //   headerHeight * headerScalingFactor
      // );
      let footerWidth = this.PDF.getImageProperties('assets/q-02.png').width;
      let footerHeight = this.PDF.getImageProperties('assets/q-02.png').height;
      let footerScalingFactor = width / footerWidth;
      // this.PDF.addImage(
      //   'assets/q-02.png',
      //   'PNG',
      //   0,
      //   height - footerHeight * footerScalingFactor,
      //   width,
      //   footerHeight * footerScalingFactor
      // );
      autoTable(this.PDF, {
        head: [['SR.NO.', 'DETAILS', 'AMOUNT']],
        tableLineColor: [250, 162, 29],
        tableLineWidth: 0.3,
        body: data,
        startY: 130,
        theme: 'grid',
        useCss: true,
        columnStyles: {
          0: { cellWidth: 17 },
          1: { cellWidth: 120 },
          2: { cellWidth: 'auto' },
        },
        headStyles: {
          font: 'AvenirNextDemiBold',
          textColor: '#C02F67',
          fillColor: '#ffffff',
          lineColor: [250, 162, 29],
          lineWidth: 0.3,
          halign: 'center',
          valign: 'middle',
        },
        bodyStyles: {
          fontStyle: 'bold',
          fontSize: 12,
          font: 'Baskerville',
          lineColor: [250, 162, 29],
          lineWidth: 0.3,
        },

        margin: {
          top: 80,
          bottom: 30,
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
    });
  }

  public downloadPDF() {
    if (this.pdfURI) {
      this.PDF.save('download.pdf');
    }
  }
}

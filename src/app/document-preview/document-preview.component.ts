import { DocumentPreviewService } from './services/document-preview.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatabarService } from '../databar/services/databar-service.service';
import { QuoteData } from '../databar/quote-data';
import { MatTableDataSource } from '@angular/material/table';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css'],
})
export class DocumentPreviewComponent implements OnInit {
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent: PdfViewerComponent;

  PDF = new jsPDF();
  public pdfSrc: string;
  currentDate = new Date();
  private documentPreviewService: DocumentPreviewService;
  zoom_to: number;
  _subscription: any;
  constructor(documentPreviewService: DocumentPreviewService) {
    this.documentPreviewService = documentPreviewService;
    // this.documentPreviewService.loadPDF();
    this._subscription = this.documentPreviewService.pdfUriChange.subscribe(
      (value) => {
        console.log(this.pdfSrc);
        this.pdfSrc = value;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.currentDate);
  }

  downloadPDF() {
    this.documentPreviewService.downloadPDF();
  }

  pageRendered() {
    this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
  }
}

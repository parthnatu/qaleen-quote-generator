import { DocumentPreviewService } from './../document-preview/services/document-preview.service';
import { DatabarService } from './services/databar-service.service';
import { Component, ViewChild } from '@angular/core';
import { QuoteData } from './quote-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'databar',
  templateUrl: './databar.component.html',
  styleUrls: ['./databar.component.css'],
})
export class DatabarComponent {
  constructor(
    databarService: DatabarService,
    documentPreviewService: DocumentPreviewService
  ) {
    this.databarService = databarService;
    this.documentPreviewService = documentPreviewService;
    this.dataSource = this.databarService.getDatasource();
  }
  private databarService: DatabarService;
  private documentPreviewService: DocumentPreviewService;
  displayedColumns: string[] = ['serial_number', 'details', 'amount'];
  dataSource: MatTableDataSource<QuoteData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  quoteItemDetail: string = '';
  quoteItemAmount: number = 0;
  coupleText: string = '';
  dateText: string = '';
  eventName: string = '';
  venueText: string = '';

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  refresh() {}

  public addItem() {
    var newRow = new QuoteData();
    newRow.amount = this.quoteItemAmount;
    newRow.details = this.quoteItemDetail;
    newRow.serial_number = this.dataSource.data.length + 1;
    this.databarService.addToDataSource(newRow);
    this.databarService.setHeaderDetails(
      this.coupleText,
      this.dateText,
      this.eventName,
      this.venueText
    );
    this.documentPreviewService.loadPDF();
  }

  public reloadPDFHeader() {
    this.databarService.setHeaderDetails(
      this.coupleText,
      this.dateText,
      this.eventName,
      this.venueText
    );
    this.documentPreviewService.loadPDF();
  }
}

import { DocumentPreviewService } from './../document-preview/services/document-preview.service';
import { DatabarService } from './services/databar-service.service';
import { Component, ViewChild } from '@angular/core';
import { QuoteData } from './quote-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailModalComponent } from '../edit-detail-modal/edit-detail-modal.component';

@Component({
  selector: 'databar',
  templateUrl: './databar.component.html',
  styleUrls: ['./databar.component.css'],
})
export class DatabarComponent {
  constructor(
    databarService: DatabarService,
    documentPreviewService: DocumentPreviewService,
    public dialog: MatDialog
  ) {
    this.databarService = databarService;
    this.documentPreviewService = documentPreviewService;
    this.dataSource = this.databarService.getDatasource();
  }
  private databarService: DatabarService;
  private documentPreviewService: DocumentPreviewService;
  displayedColumns: string[] = ['details', 'amount', 'menu'];
  dataSource: MatTableDataSource<QuoteData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  quoteItemDetail: string = '';
  quoteItemAmount: number = 0;
  coupleText: string = '';
  dateText: string = '';
  eventName: string = '';
  venueText: string = '';

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(EditDetailModalComponent, {
      width: '400px',
      data: this.dataSource.data.at(index),
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.dataSource._updateChangeSubscription();
      this.documentPreviewService.loadPDF();
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  refresh() {}

  public addItem() {
    var newRow = new QuoteData();
    newRow.amount = this.quoteItemAmount;
    newRow.details = this.quoteItemDetail;
    this.databarService.addToDataSource(newRow);
    this.databarService.setHeaderDetails(
      this.coupleText,
      this.dateText,
      this.eventName,
      this.venueText
    );
    this.documentPreviewService.loadPDF();
  }

  public removeItem(index: number) {
    console.log('deleting : ' + index);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
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

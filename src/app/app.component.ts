import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DocumentPreviewService } from './document-preview/services/document-preview.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qaleen-quote-generator';
  private documentPreviewService: DocumentPreviewService;
  constructor(documentPreviewService: DocumentPreviewService) {
    this.documentPreviewService = documentPreviewService;
  }

  downloadPDF() {
    this.documentPreviewService.downloadPDF();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { QuoteData } from '../databar/quote-data';
@Component({
  selector: 'edit-detail',
  templateUrl: './edit-detail-modal.component.html',
  styleUrls: ['./edit-detail-modal.component.css'],
})
export class EditDetailModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuoteData
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}

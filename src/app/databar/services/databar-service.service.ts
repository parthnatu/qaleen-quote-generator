import { Injectable } from '@angular/core';
import { QuoteData } from '../quote-data';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class DatabarService {
  constructor() {}

  datasource = new MatTableDataSource<QuoteData>();
  invoiceDate: string;
  coupleText: string;
  dateText: string;
  eventName: string;
  venueText: string;
  totalCost: number = 0;
  addToDataSource(row: QuoteData) {
    this.totalCost = this.totalCost + Number(row.amount);
    this.datasource.data.push(row);
    this.datasource.data = [...this.datasource.data];
  }

  removeFromDataSource(index: number, amount: number) {
    this.totalCost = this.totalCost - amount;
    this.datasource.data.splice(index, 1);
    this.datasource._updateChangeSubscription();
  }

  public getDatasource() {
    return this.datasource;
  }

  setHeaderDetails(
    invoiceDate: string = '',
    coupleText: string = '',
    dateText: string = '',
    eventName: string = '',
    venueText: string = ''
  ) {
    this.invoiceDate = invoiceDate;
    this.coupleText = coupleText;
    this.dateText = dateText;
    this.eventName = eventName;
    this.venueText = venueText;
  }

  public getHeaderDetails() {
    return {
      invoiceDate: this.invoiceDate,
      coupleText: this.coupleText,
      dateText: this.dateText,
      eventName: this.eventName,
      venueText: this.venueText,
    };
  }

  public getTotal(): number {
    return this.totalCost;
  }

  public setTotal(amount: number) {
    this.totalCost = amount;
  }
}

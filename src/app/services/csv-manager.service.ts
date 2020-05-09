import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jsPDF from 'jspdf';
import {HttpServiceService} from './http-service.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service perform the requests of stats.csv, fp.csv and ise.csv to the server
 */
export class CsvManagerService {

  private stats;
  private fpr;
  private isepr;
  private clean;

  constructor(private http: HttpClient, private myHttp: HttpServiceService) {
    this.stats = this.myHttp.ip + '/stats';
    this.fpr = this.myHttp.ip + '/fpr';
    this.isepr = this.myHttp.ip + '/isepr';
  }

  getStats() {
    return this.http.get(this.stats, {responseType: 'text'});
  }

  getFPR() {
    return this.http.get(this.fpr, {responseType: 'text'});
  }

  getISEPR() {
    return this.http.get(this.isepr, {responseType: 'text'});
  }

  downloadPDF(chartId) {
    const newCanvas = document.querySelector('#' + chartId) as HTMLCanvasElement;

    // create image from dummy canvas
    const newCanvasImg = newCanvas.toDataURL('image/png', 1.0);

    // creates PDF from img
    const doc = new jsPDF('landscape');
    doc.addImage(newCanvasImg, 'PNG', 10, 10, 280, 150 );
    doc.save('chart.pdf');
  }

}

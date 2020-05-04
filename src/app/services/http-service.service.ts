import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

/**
 * This service perform the save and the calculateFilter request to the server
 */
export class HttpServiceService {

  base = 'https://sbfbackend1.herokuapp.com';
 // base = 'http://localhost:3000';
  port = '3000';
  ip = this.base;
  isCaluclating = false;


  constructor(private http: HttpClient) {}

  async calculateFilter( formData: FormData) {
    this.isCaluclating = true;
    // 1. save params
    console.time('save');
    console.log('Start save parameters');

    await new Promise((res, _) => {
      const saveUrl = this.ip + '/save';
      this.http.post(saveUrl, formData).subscribe( _ => res('Ok'));
    });
    console.log('Finish save parameters in ');
    console.timeEnd('save');

    // 2. calculate filter
    console.time('calc');
    console.log('Start calculate filter');

    await this.calc();

    console.log('Finish save parameters in ');
    console.timeEnd('calc');

    this.isCaluclating = false;
    return 'Ok';
  }

  async calc() {
    const calcUrl = this.ip + '/calculateFilter';
    await new Promise((res, _) => this.http.get(calcUrl).subscribe(() => {console.log('done'); res('Ok'); }));
    return 'Ok';
  }

}

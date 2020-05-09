import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * This service saves the data taken from the server in the right data structure for the whole-filter component
 */
export class WholeFilterService {

  k = 0;
  m = 0;
  n = 0;
  p = 0;

  p1 = [];
  n1 = [];

  p2 = [];
  m2 = [];

  p3 = [];
  k3 = [];


  constructor() { }

  setParams( k, m, n, p) {
    this.k = k;
    this.m = m;
    this.n = n;
    this.p = p;
    this.calculateArrays();
  }

  calculateArrays() {
    this.calculate1();
    this.calculate2();
    this.calculate3();
  }

  calculate1() {
    this.p1.length = 0;
    this.n1.length = 0;

  //  const step = this.n * (0.53);
  //  let myN =  this.n * (0.77);
    const step = 30000;
    let myN = this.n - (1 * step);

    let index = 0;
    while ( index <= 20) {
      const newN = myN;
      this.n1.push(myN);
      this.p1.push(this.calculateP(this.k, this.m, newN));
      myN += step;
      index++;
    }
  }

  calculate2() {

    this.p2.length = 0;
    this.m2.length = 0;

    const step = 100000;
    let myM = this.m - (9 * step);
    let index = 0;

    while (index <= 20) {
      this.m2.push(myM); // Byte
      this.p2.push(this.calculateP(this.k, myM, this.n));
      myM = myM + step;
      index++;
    }
  }

  calculate3() {
    this.k3.length = 0;
    this.p3.length = 0;

    const step = 1; // Math.round(this.k * (0.20));
    let myK = this.k - (9 * step);
    let index = 0;

    while ( index <= 20) {
      this.k3.push(myK);
      this.p3.push(this.calculateP(myK, this.m, this.n));
      myK += step;
      index++;
    }
  }

  calculateP(k, m, n) {
    // pow(1 - exp(-k / (m / n)), k)
    const exp = Math.exp( (- k) / ( m / n));
    const base = 1 - exp;
    return Math.pow( base, k);
  }

  getStrNum(x: number) {
    const xStr = x.toExponential(2);
    const xArr = xStr.split('e');
    return xArr[0];
  }
}

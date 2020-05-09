import { Injectable } from '@angular/core';
import {Chart} from 'chart.js';
import {WholeFilterService} from './whole-filter.service';
import {FilterService} from './filter.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service manages the charts of the application.
 * Each chart is initialized in its own component and update in this service.
 */
export class ChartsService {

  chartElements: Chart = [];
  chartCells: Chart = [];
  chartEmersion: Chart = [];
  chartFPP: Chart = [];
  chartInterset: Chart = [];
  chartAPriori: Chart = [];

  pVSk: Chart = [];
  pVSm: Chart = [];
  pVSn: Chart = [];

  constructor(public wholeFilter: WholeFilterService, public filter: FilterService ) {}

  updateCharts(area, cells, expectedCells, members, emersion, expectedEmersion, aPrioriIsep,
               isep, isepr, aPrioriSafep, aPrioriFpp, fpp, fpr) {
    this.updateDatasets(area, cells, expectedCells, members, emersion, expectedEmersion, aPrioriIsep,
        isep, isepr, aPrioriSafep, aPrioriFpp, fpp, fpr);
    setTimeout(() => { this.updateRender(); }, 500);

  }

  updateDatasets(area, cells, expectedCells, members, emersion, expectedEmersion, aPrioriIsep,
                 isep, isepr, aPrioriSafep, aPrioriFpp, fpp, fpr) {
    this.updateChartElements(area, members);
    this.updateChartCells(area, cells, expectedCells);
    this.updateChartEmersion(area, emersion, expectedEmersion);
    this.updateChartFPP(area, aPrioriFpp, fpp, fpr);
    this.updateChartInterset(area, aPrioriIsep, isep, isepr);
    this.updateChartAPriori(area, aPrioriSafep);
  }

  updateRender() {

    this.chartElements.update();
    this.chartCells.update();
    this.chartEmersion.update();
    this.chartFPP.update();
    this.chartInterset.update();
    this.chartAPriori.update();

    this.pVSk.update();
    this.pVSm.update();
    this.pVSn.update();
  }

  updateWholeFilter() {
    console.log('update whole filter charts');
    this.wholeFilter.setParams(this.filter.k, this.filter.m, this.filter.n, this.filter.p);

    this.pVSk.data.labels = this.wholeFilter.k3;
    this.pVSk.data.datasets[0].data = this.wholeFilter.p3;

    this.pVSm.data.labels = this.wholeFilter.m2;
    this.pVSm.data.datasets[0].data = this.wholeFilter.p2;

    this.pVSn.data.labels = this.wholeFilter.n1;
    this.pVSn.data.datasets[0].data = this.wholeFilter.p1;
  }

  updateChartCells(area, cells, expectedCells) {
    this.chartCells.data.labels = area;
    this.chartCells.data.datasets[0].data = cells;
    this.chartCells.data.datasets [1].data = expectedCells;
  }

  updateChartElements(area, members) {
    this.chartElements.data.labels = area;
    this.chartElements.data.datasets[0].data = members;
  }

  updateChartEmersion(area, emersion, expectedEmersion) {
    this.chartEmersion.data.labels = area;
    this.chartEmersion.data.datasets[0].data = expectedEmersion;
    this.chartEmersion.data.datasets[1].data = emersion;
  }

  updateChartFPP(area, aPrioriFpp, fpp, fpr) {
    this.chartFPP.data.labels = area;
    this.chartFPP.data.datasets[0].data = aPrioriFpp;
    this.chartFPP.data.datasets[1].data = fpp;
    this.chartFPP.data.datasets[2].data = fpr;
  }

  updateChartInterset(area, aPrioriIsep, isep, isepr) {
    this.chartInterset.data.labels = area;
    this.chartInterset.data.datasets[0].data = aPrioriIsep;
    this.chartInterset.data.datasets[1].data = isep;
    this.chartInterset.data.datasets[2].data = isepr;
  }

  updateChartAPriori(area, aPrioriSafep) {
    this.chartAPriori.data.labels = area;
    this.chartAPriori.data.datasets[0].data = aPrioriSafep;
  }

}

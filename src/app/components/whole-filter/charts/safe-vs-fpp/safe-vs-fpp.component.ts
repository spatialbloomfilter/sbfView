import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {FilterService} from '../../../../services/filter.service';
import {CsvManagerService} from '../../../../services/csv-manager.service';

@Component({
  selector: 'app-safe-vs-fpp',
  templateUrl: './safe-vs-fpp.component.html',
  styleUrls: ['./safe-vs-fpp.component.sass']
})
export class SafeVsFppComponent implements OnInit {
  chart3: Chart = [];
  l4 = [];
  d4 = [];

  backgroundColor = 'rgb(54, 187, 245, 0.6)';
  borderColor = 'rgb(14, 121, 163)';

  constructor(public filter: FilterService, public csvManager: CsvManagerService) {}

  ngOnInit() {
    this.chart3 = this.getChart('safe-vs-fpp', this.l4, this.d4, 'safeness vs fpp', 'safeness', '??');
  }

  getChart(ctx: string, mylabels, mydata, title: string, xlabel: string, ylabel: string): Chart {

    return new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: mylabels,

        datasets: [{
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          data: mydata
        }]
      },

      // Configuration options go here
      options: {
        title: {
          display: true,
          text: title
        },

        scales: {

          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: ylabel
            },
            ticks: {
              min: 0,
              max: 1,
              stepSize: 0.5
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: xlabel
            }
          }]
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  test: any;
  constructor(
    private DashboardService: DashboardService,
    private http: HttpClient
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.test = 34;
  }

  public stats: any;

  ngOnInit(): void {
    this.getStats();
  }

  // Bar
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: ' A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: ' B' },
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Orders'], ['Customers'], 'Requests'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Line
  public lineChartData: ChartDataSets[] = [
    { data: [34, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  public getStats() {
    this.DashboardService.getStats().subscribe(
      (response) => {
        this.stats = response;
        console.log(this.stats);

        // Pie
        this.pieChartOptions = {
          responsive: true,
        };
        //this.pieChartLabels = [['Orders'], ['Customers'], 'Requests'];
        this.pieChartData = [
          this.stats.orders,
          this.stats.customers,
          this.stats.pendingOrders,
        ];
        this.pieChartType = 'pie';
        this.pieChartLegend = true;
        this.pieChartPlugins = [];

        // Line
        this.lineChartData = [
          {
            data: [
              this.stats.monthlySales.Jan,
              this.stats.monthlySales.Feb,
              this.stats.monthlySales.Mar,
              this.stats.monthlySales.Apr,
              this.stats.monthlySales.May,
              this.stats.monthlySales.Jun,
              this.stats.monthlySales.Jul,
              this.stats.monthlySales.Aug,
              this.stats.monthlySales.Sep,
              this.stats.monthlySales.Oct,
              this.stats.monthlySales.Nov,
              this.stats.monthlySales.Dec,
            ],
            label: 'Earnings',
          },
        ];
        this.lineChartLabels = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        this.lineChartOptions = {
          responsive: true,
        };
        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
          },
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lineChartPlugins = [];
      },
      (error) => {
        console.error('Request failed with error: ' + error);
      }
    );
  }
}

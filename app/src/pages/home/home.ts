import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as HighCharts from 'highcharts';

import { ChartDataProvider } from '../../providers/chart-data/chart-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private homeChart;

  constructor(public charts: ChartDataProvider, public navCtrl: NavController) {

  }

  ionViewDidLoad(){
  	this.charts.subscribe((data)=>{
  		var xList = [];
  		var minList = [];
  		var maxList = [];
  		for(var datum of data){
  			xList.push(datum.date);
  			minList.push(datum.min);
  			maxList.push(datum.max);
  		}
	  	this.homeChart = HighCharts.chart('container', {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Humidity'
			},
			xAxis: {
			    categories: xList
			},
			series: [
				{
					name: "Min", data: minList
				},
				{
					name: "Max", data: maxList
				}
			]
		});
	}, console.error);
  }

}

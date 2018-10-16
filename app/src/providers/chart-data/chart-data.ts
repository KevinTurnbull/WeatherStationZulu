import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChartDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartDataProvider {

  constructor(public http: HttpClient) {
  	this.triggerLookup();
  }

  private successCallbacks:Function[] = [];
  private failureCallbacks:Function[] = [];

  private lastData = undefined;

  public triggerLookup(term?:string){
  	if (term === undefined) term = "Aquarium";
  	console.log("Looking up",term);
  	var searchLocation = `https://temperature-monitor.azurewebsites.net/api/humidity/summary?location=${term}&ianaTimeZone=Pacific/Auckland&startdate=2018-10-02&enddate=2018-10-18`;
  	console.log("at", searchLocation);
  	var self = this;
  	this.http.get(searchLocation).subscribe((data)=>{
  		self.lastData = data;
  		self.successCallbacks.forEach((fn)=>{fn(data);});
  	});
  }

  public subscribe(onSuccess: Function, onFailure: Function){
  	this.successCallbacks.push(onSuccess);
  	if (this.lastData)
  		onSuccess(this.lastData);
  	this.failureCallbacks.push(onFailure);
  }
  public clearCallbacks(){
  	this.successCallbacks = [];
  	this.failureCallbacks = [];
  }

}

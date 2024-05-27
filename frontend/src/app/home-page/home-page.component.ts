import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {Sensor} from "../../models/entities";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  dates: string[] = [];
  sensors: Sensor[] = [];

  constructor(public http: HttpClient, private router : Router) {
    this.getDates();
    this.getSensors();
  }

  async getDates(){
    const call = this.http.get<string[]>('http://localhost:5162/api/dates');
    this.dates = await  firstValueFrom<string[]>(call);
    console.log('Dates: '+this.dates);
  }

  clickDate(date: string) {
    this.router.navigate(['/humidity/', date], {replaceUrl:true})
  }

  async getSensors(){
    const call = this.http.get<Sensor[]>('http://localhost:5162/api/get/sensors');
    this.sensors = await  firstValueFrom<Sensor[]>(call);
  }

  clickPlant(sensor: number | undefined) {
    this.router.navigate(['/day/watered/', sensor], {replaceUrl:true})
  }
}

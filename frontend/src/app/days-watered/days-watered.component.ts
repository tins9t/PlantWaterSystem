import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {DaysWatered} from "../../models/entities";

@Component({
  selector: 'app-days-watered',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './days-watered.component.html',
  styleUrl: './days-watered.component.css'
})
export class DaysWateredComponent {
  dayWateredValues: DaysWatered[] = [];

  constructor(public http: HttpClient, private router : Router, private route: ActivatedRoute) {
    this.getDaysWatered();
  }

  async getDaysWatered(){
    const sensorId = (await firstValueFrom(this.route.paramMap)).get('sensorId');
    const call= this.http.get<DaysWatered[]>('http://localhost:5162/api/days/watered/by/'+sensorId);
    this.dayWateredValues = await firstValueFrom<DaysWatered[]>(call);

  }

  clickBack() {
    this.router.navigate([''], {replaceUrl:true})
  }
}

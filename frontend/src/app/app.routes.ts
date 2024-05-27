import { Routes } from '@angular/router';
import {HumidityGraphComponent} from "./humidity-graph/humidity-graph.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {DaysWateredComponent} from "./days-watered/days-watered.component";

export const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'humidity/:date', component: HumidityGraphComponent },
  { path: 'day/watered/:sensorId', component: DaysWateredComponent }
];

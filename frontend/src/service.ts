import { Injectable } from '@angular/core';
import {HumidityMeasure} from "./models/entities";

@Injectable({
  providedIn: 'root'
})
export class Service {

  public humidityMeasures: HumidityMeasure[] = [];
  constructor() { }
}

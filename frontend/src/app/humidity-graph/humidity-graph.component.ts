import {Component, OnInit} from '@angular/core';
import {Service} from "../../service";
import {ActivatedRoute, Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {HumidityMeasure} from "../../models/entities";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {CanvasJS, CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

@Component({
  selector: 'app-humidity-graph',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './humidity-graph.component.html',
  styleUrl: './humidity-graph.component.css'
})
export class HumidityGraphComponent implements OnInit{

  humidityValues: HumidityMeasure[] = [];
  chartOptions: any;
  constructor(public service: Service, private route: ActivatedRoute, private http: HttpClient, private router : Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.getHumidityValuesByDate(); // Wait for data fetching to complete
    this.renderChart(); // Render the chart after data is fetched
  }

  async getHumidityValuesByDate(){
    const date = (await firstValueFrom(this.route.paramMap)).get('date');
    const call= this.http.get<HumidityMeasure[]>('http://localhost:5162/api/humiditymeasure/'+ date);
    this.humidityValues = await  firstValueFrom<HumidityMeasure[]>(call);

    console.log("Humidity values: ", this.humidityValues, ' Date: ', date)
  }
  async renderChart() {
    const date = (await firstValueFrom(this.route.paramMap)).get('date');
    const dataPoints = this.humidityValues.map(measure => ({
      label: measure.time!.substring(0, 5),
      y: measure.humidity,
      markerType: measure.wasWatered ? 'circle' : 'none',
      markerColor: measure.wasWatered ? '#86469C' : null,
      indexLabel: measure.wasWatered ? 'Watered' : null,
      indexLabelFontColor: 'black',
      indexLabelPlacement: 'outside',
      indexLabelFontSize: 14
    }));

    dataPoints.forEach((dataPoint, index) => {
      console.log(`Data point ${index + 1}:`, dataPoint);
    });

    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light2',
      title: {
        text: 'Humidity Over Time '+date
      },
      axisX: {
        title: 'Time',
        valueFormatString: 'HH:mm'
      },
      axisY: {
        title: 'Humidity',
        maximum: 4000, // Define the maximum humidity value
        minimum: 2000, // Define the minimum humidity value
        interval: 500, // Define the interval between ticks
        labelFormatter: function (e:any) { // Custom label formatter
          return e.value === 2000 ? 'Wet' : (e.value === 4000 ? 'Dry' : e.value);
        }
      },
      data: [{
        type: 'line',
        dataPoints: dataPoints
      }]
    };

    CanvasJS.addColorSet('customColorSet', ['#4CAF50']);
    this.chartOptions.colorSet = 'customColorSet';
  }

  clickBack() {
    this.router.navigate([''], {replaceUrl:true})
  }
}

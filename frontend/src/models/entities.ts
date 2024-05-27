export class HumidityMeasure {
  sensorId?: number;
  humidity?: number;
  wasWatered?: boolean;
  time?: string;
  date?: Date;
}

export class DaysWatered{
  sensorId?: number;
  wasWatered?: boolean;
  date?: Date;
}

export class Sensor {
  sensorId?: number;
  plantName?: string;
}

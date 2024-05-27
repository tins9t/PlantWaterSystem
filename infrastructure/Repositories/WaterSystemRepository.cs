using Dapper;
using infrastructure;
namespace infra.Repositories;

public class WaterSystemRepository
{
    public IEnumerable<HumidityMeasure> GetHumidityValuesFromDate(string date)
    {
        var sql = $@"SELECT sensor_id as {nameof(HumidityMeasure.SensorId)}, 
       humidity as {nameof(HumidityMeasure.Humidity)}, was_watered as {nameof(HumidityMeasure.WasWatered)}, 
       time as {nameof(HumidityMeasure.Time)}, date as {nameof(HumidityMeasure.Date)} FROM humidity_measure WHERE date = '{date}';";
        using (var conn = DataConnection.DataSource.OpenConnection())
        {
            return conn.Query<HumidityMeasure>(sql, new { date });
        }
    }

    public IEnumerable<string> GetDates()
    {
        var sql = $@"SELECT DISTINCT date FROM humidity_measure;";
        using (var conn = DataConnection.DataSource.OpenConnection())
        {
            var datesWithTime = conn.Query<DateTime>(sql);
            return datesWithTime.Select(date => date.Date.ToString("yyyy-MM-dd"));
        }
    }
    
    public IEnumerable<DaysWatered> GetDaysWateredBySensor(int sensorId)
    {
        var sql = $@"SELECT sensor_id as {nameof(DaysWatered.SensorId)}, 
                 was_watered as {nameof(DaysWatered.WasWatered)}, 
                 date as {nameof(DaysWatered.Date)} 
                 FROM day_watered WHERE sensor_id = @SensorId";
        using (var conn = DataConnection.DataSource.OpenConnection())
        {
            return conn.Query<DaysWatered>(sql, new { SensorId = sensorId });
        }
    }
    
    public IEnumerable<Sensor> GetSensors()
    {
        var sql =
            $@"SELECT sensor_id as {nameof(Sensor.SensorId)}, plant_name as {nameof(Sensor.PlantName)} FROM sensor";
        using (var conn = DataConnection.DataSource.OpenConnection())
        {
            return conn.Query<Sensor>(sql).ToList();
        }
    }
}
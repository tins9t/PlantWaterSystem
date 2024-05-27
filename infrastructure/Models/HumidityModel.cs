namespace infrastructure;

public class HumidityMeasure
{
    public int SensorId { get; set; }
    public int Humidity { get; set; }
    public bool WasWatered { get; set; }
    public String? Time { get; set; }
    public String? Date { get; set; }
}
using infrastructure;
using Microsoft.AspNetCore.Mvc;
using service;

namespace PlantWaterSystem.Controllers;

public class MainController : ControllerBase
{
    private readonly Service _service;
    
    public MainController(Service service)
    {
        _service = service;
    }

    [Route("api/humiditymeasure/{date}")]
    [HttpGet]
    public IEnumerable<HumidityMeasure> GetHumidityValuesFromDate([FromRoute] string date)
    {
        return _service.GetHumidityValuesFromDate(date);
    }

    [Route("api/dates")]
    [HttpGet]
    public IEnumerable<string> GetDates()
    {
        return _service.GetDates();
    }

    [Route("api/days/watered/by/{sensorId}")]
    [HttpGet]
    public IEnumerable<DaysWatered> GetDaysWateredBySensorId([FromRoute] int sensorId)
    {
        return _service.GetDayWatered(sensorId);
    }

    [Route("api/get/sensors")]
    [HttpGet]
    public IEnumerable<Sensor> GetSensors()
    {
        return _service.GetSensors();
    }
}
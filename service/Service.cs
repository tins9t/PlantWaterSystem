using infra.Repositories;
using infrastructure;

namespace service;

public class Service

{
    private readonly WaterSystemRepository _waterSystemRepository;

    public Service(WaterSystemRepository waterSystemRepository)
    {
        _waterSystemRepository = waterSystemRepository;
    }

    public IEnumerable<HumidityMeasure> GetHumidityValuesFromDate(string date)
    {
        return _waterSystemRepository.GetHumidityValuesFromDate(date);
    }

    public IEnumerable<string> GetDates()
    {
        return _waterSystemRepository.GetDates();
    }

    public IEnumerable<DaysWatered> GetDayWatered(int sensorId)
    {
        return _waterSystemRepository.GetDaysWateredBySensor(sensorId);
    }

    public IEnumerable<Sensor> GetSensors()
    {
        return _waterSystemRepository.GetSensors();
    }
}
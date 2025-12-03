import CurrentWeather from './CurrentWeather'
import WeatherMetrics from './WeatherMetrics'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'

export default function WeatherContent({ weatherData, location, selectedDayIndex, onDaySelect, units }) {
  return (
    <div className="weather-content active">
      <div className="weather-main-layout">
        <div className="weather-left">
          <CurrentWeather
            current={weatherData.current}
            daily={weatherData.daily}
            location={location}
            units={units}
          />
          <WeatherMetrics current={weatherData.current} units={units} />
          <DailyForecast daily={weatherData.daily} units={units} />
        </div>

        <div className="weather-right">
          <HourlyForecast
            hourly={weatherData.hourly}
            selectedDayIndex={selectedDayIndex}
            onDaySelect={onDaySelect}
            units={units}
          />
        </div>
      </div>
    </div>
  )
}


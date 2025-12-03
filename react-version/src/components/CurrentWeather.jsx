import { convertTemperature, getWeatherClass, weatherIcons, formatDate, formatTime } from '../utils/helpers'

export default function CurrentWeather({ current, daily, location, units }) {
  const temp = convertTemperature(current.temperature_2m, units.temperature)
  const weatherClass = getWeatherClass(current.weather_code)

  return (
    <section className={`current-weather ${weatherClass}`}>
      <div className="weather-background-animation"></div>
      <div className="current-weather-content">
        <div className="location-info">
          <h2 className="location-name">
            {location.name}{location.country ? `, ${location.country}` : ''}
          </h2>
          <p className="location-date">{formatDate(new Date())}</p>
        </div>
        <div className="temperature-display">
          <img
            className="weather-icon"
            src={`/assets/images/${weatherIcons[current.weather_code] || 'icon-sunny.webp'}`}
            alt="Weather condition"
          />
          <div className="temperature-wrapper">
            <span className="temperature">{Math.round(temp)}</span>
            <span className="temperature-unit">°</span>
          </div>
        </div>
      </div>
      {daily.sunrise?.[0] && daily.sunset?.[0] && (
        <div className="sun-times">
          <div className="sun-time">
            <span className="sun-icon">🌅</span>
            <span>{formatTime(new Date(daily.sunrise[0]))}</span>
          </div>
          <div className="sun-time">
            <span className="sun-icon">🌇</span>
            <span>{formatTime(new Date(daily.sunset[0]))}</span>
          </div>
        </div>
      )}
    </section>
  )
}


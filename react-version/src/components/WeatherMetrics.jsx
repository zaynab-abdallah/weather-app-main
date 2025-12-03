import { convertTemperature, convertWindSpeed, convertPrecipitation, getWindUnit, getPrecipitationUnit } from '../utils/helpers'

export default function WeatherMetrics({ current, units }) {
  const feelsLike = convertTemperature(current.temperature_2m, units.temperature)
  const windSpeed = convertWindSpeed(current.wind_speed_10m, units.wind)
  const precipitation = convertPrecipitation(current.precipitation, units.precipitation)

  return (
    <section className="weather-metrics">
      <div className="metric-card">
        <div className="metric-label">Feels like</div>
        <div className="metric-value">
          <span>{Math.round(feelsLike)}</span>
          <span className="temperature-unit">°</span>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Humidity</div>
        <div className="metric-value">
          <span>{Math.round(current.relative_humidity_2m)}</span>%
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Wind</div>
        <div className="metric-value">
          <span>{Math.round(windSpeed)}</span>
          <span> {getWindUnit(units)}</span>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Precipitation</div>
        <div className="metric-value">
          <span>{precipitation.toFixed(1)}</span>
          <span> {getPrecipitationUnit(units)}</span>
        </div>
      </div>
    </section>
  )
}


'use client'

import { DailyWeather, Units } from '@/types'
import { convertTemperature, weatherIcons } from '@/lib/utils'

interface DailyForecastProps {
  daily: DailyWeather
  units: Units
}

export default function DailyForecast({ daily, units }: DailyForecastProps) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()

  return (
    <section className="daily-forecast">
      <h2 className="section-title">Daily forecast</h2>
      <div className="forecast-list">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = new Date(today)
          date.setDate(today.getDate() + i)
          const dayName = days[date.getDay()]
          
          const weatherCode = daily.weather_code[i]
          const maxTemp = convertTemperature(daily.temperature_2m_max[i], units.temperature)
          const minTemp = convertTemperature(daily.temperature_2m_min[i], units.temperature)

          return (
            <div key={i} className="forecast-item">
              <div className="forecast-day">{dayName}</div>
              <div className="forecast-icon-wrapper">
                <img
                  src={`/assets/images/${weatherIcons[weatherCode] || 'icon-sunny.webp'}`}
                  alt="Weather"
                  className="forecast-icon"
                />
              </div>
              <div className="forecast-temps">
                <span className="forecast-high">{Math.round(maxTemp)}°</span>
                <span className="forecast-low">{Math.round(minTemp)}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}


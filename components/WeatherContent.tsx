'use client'

import { WeatherData, Location, Units } from '@/types'
import CurrentWeather from './CurrentWeather'
import WeatherMetrics from './WeatherMetrics'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'

interface WeatherContentProps {
  weatherData: WeatherData
  location: Location
  selectedDayIndex: number
  onDaySelect: (index: number) => void
  units: Units
}

export default function WeatherContent({
  weatherData,
  location,
  selectedDayIndex,
  onDaySelect,
  units
}: WeatherContentProps) {
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
          <WeatherMetrics
            current={weatherData.current}
            units={units}
          />
        </div>

        <div className="weather-right">
          <DailyForecast
            daily={weatherData.daily}
            units={units}
          />
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


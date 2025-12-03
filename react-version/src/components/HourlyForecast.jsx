import { convertTemperature, weatherIcons, formatHour } from '../utils/helpers'

export default function HourlyForecast({ hourly, selectedDayIndex, onDaySelect, units }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()
  
  // Calculate hourly data
  const now = new Date()
  const currentHour = now.getHours()
  
  let startIndex = 0
  let hoursToShow = 24
  
  if (selectedDayIndex === 0) {
    for (let i = 0; i < hourly.time.length; i++) {
      const time = new Date(hourly.time[i])
      if (time.getDate() === now.getDate() && time.getHours() >= currentHour) {
        startIndex = i
        break
      }
    }
    hoursToShow = Math.min(24, hourly.time.length - startIndex)
  } else {
    const selectedDate = new Date(now)
    selectedDate.setDate(now.getDate() + selectedDayIndex)
    selectedDate.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < hourly.time.length; i++) {
      const time = new Date(hourly.time[i])
      if (time.getTime() >= selectedDate.getTime()) {
        startIndex = i
        break
      }
    }
    hoursToShow = 24
  }

  return (
    <section className="hourly-forecast">
      <div className="hourly-header">
        <h2 className="section-title">Hourly forecast</h2>
        <div className="day-selector">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            const dayName = days[date.getDay()]

            return (
              <button
                key={i}
                className={`day-button ${i === selectedDayIndex ? 'active' : ''}`}
                onClick={() => onDaySelect(i)}
              >
                {dayName}
              </button>
            )
          })}
        </div>
      </div>
      <div className="hourly-list">
        {Array.from({ length: hoursToShow }).map((_, index) => {
          const i = startIndex + index
          if (i >= hourly.time.length) return null
          
          const time = new Date(hourly.time[i])
          const hour = time.getHours()
          const weatherCode = hourly.weather_code[i]
          const temp = convertTemperature(hourly.temperature_2m[i], units.temperature)

          return (
            <div key={i} className="hourly-item">
              <div className="hourly-time">{formatHour(hour)}</div>
              <img
                src={`/assets/images/${weatherIcons[weatherCode] || 'icon-sunny.webp'}`}
                alt="Weather"
                className="hourly-icon"
              />
              <div className="hourly-temp">{Math.round(temp)}°</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}


export const weatherIcons = {
  0: 'icon-sunny.webp',
  1: 'icon-partly-cloudy.webp',
  2: 'icon-partly-cloudy.webp',
  3: 'icon-overcast.webp',
  45: 'icon-fog.webp',
  48: 'icon-fog.webp',
  51: 'icon-drizzle.webp',
  53: 'icon-drizzle.webp',
  55: 'icon-drizzle.webp',
  61: 'icon-rain.webp',
  63: 'icon-rain.webp',
  65: 'icon-rain.webp',
  71: 'icon-snow.webp',
  73: 'icon-snow.webp',
  75: 'icon-snow.webp',
  80: 'icon-rain.webp',
  81: 'icon-rain.webp',
  82: 'icon-rain.webp',
  85: 'icon-snow.webp',
  86: 'icon-snow.webp',
  95: 'icon-storm.webp',
  96: 'icon-storm.webp',
  99: 'icon-storm.webp'
}

export function convertTemperature(celsius, unit) {
  if (unit === 'fahrenheit') return (celsius * 9/5) + 32
  return celsius
}

export function convertWindSpeed(kmh, unit) {
  if (unit === 'mph') return kmh * 0.621371
  return kmh
}

export function convertPrecipitation(mm, unit) {
  if (unit === 'in') return mm * 0.0393701
  return mm
}

export function getTemperatureUnit(units) {
  return units.temperature === 'fahrenheit' ? '°F' : '°C'
}

export function getWindUnit(units) {
  return units.wind === 'mph' ? 'mph' : 'km/h'
}

export function getPrecipitationUnit(units) {
  return units.precipitation === 'in' ? 'in' : 'mm'
}

export function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function formatTime(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${String(minutes).padStart(2, '0')}${period}`
}

export function formatHour(hour) {
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}${period}`
}

export function getWeatherClass(weatherCode) {
  if (weatherCode === 0 || weatherCode === 1) return 'sunny'
  if (weatherCode >= 2 && weatherCode <= 3) return 'cloudy'
  if (weatherCode >= 45 && weatherCode <= 48) return 'cloudy'
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) return 'rainy'
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) return 'snowy'
  if (weatherCode >= 95) return 'stormy'
  return ''
}


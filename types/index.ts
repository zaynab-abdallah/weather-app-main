export type Theme = 'dark' | 'light'

export interface Units {
  system: 'metric' | 'imperial'
  temperature: 'celsius' | 'fahrenheit'
  wind: 'kmh' | 'mph'
  precipitation: 'mm' | 'in'
}

export interface Location {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone?: string
}

export interface CurrentWeather {
  temperature_2m: number
  relative_humidity_2m: number
  weather_code: number
  wind_speed_10m: number
  precipitation: number
  uv_index?: number
  visibility?: number
  surface_pressure?: number
}

export interface HourlyWeather {
  time: string[]
  temperature_2m: number[]
  weather_code: number[]
  precipitation: number[]
}

export interface DailyWeather {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  sunrise: string[]
  sunset: string[]
  uv_index_max: number[]
}

export interface WeatherData {
  location: Location
  current: CurrentWeather
  hourly: HourlyWeather
  daily: DailyWeather
}

export interface CompareWeatherData {
  location: Location
  weather: CurrentWeather
}


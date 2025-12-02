import { Location, WeatherData } from '@/types'

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export async function searchWeather(query: string): Promise<WeatherData | null> {
  try {
    // Get coordinates from location name
    const geocodeUrl = `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      return null
    }
    
    const location = geocodeData.results[0]
    const locationData: Location = {
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone || 'auto'
    }
    
    // Fetch weather data
    const params = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      timezone: locationData.timezone,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index,visibility,surface_pressure',
      hourly: 'temperature_2m,weather_code,precipitation',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max',
      forecast_days: '7'
    })
    
    const weatherUrl = `${WEATHER_API}?${params}`
    const weatherResponse = await fetch(weatherUrl)
    
    if (!weatherResponse.ok) {
      throw new Error('Weather API request failed')
    }
    
    const weatherData = await weatherResponse.json()
    
    return {
      location: locationData,
      current: weatherData.current,
      hourly: weatherData.hourly,
      daily: weatherData.daily
    }
  } catch (error) {
    console.error('Search error:', error)
    return null
  }
}

export async function getUserLocation(): Promise<Location | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          name: 'My Location',
          country: '',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timezone: 'auto'
        })
      },
      () => {
        resolve(null)
      },
      {
        timeout: 5000,
        maximumAge: 0
      }
    )
  })
}

export async function fetchWeatherByCoords(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      timezone: 'auto',
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index,visibility,surface_pressure',
      hourly: 'temperature_2m,weather_code,precipitation',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max',
      forecast_days: '7'
    })
    
    const weatherUrl = `${WEATHER_API}?${params}`
    const weatherResponse = await fetch(weatherUrl)
    
    if (!weatherResponse.ok) {
      throw new Error('Weather API request failed')
    }
    
    const weatherData = await weatherResponse.json()
    
    return {
      location: {
        name: 'My Location',
        country: '',
        latitude,
        longitude,
        timezone: 'auto'
      },
      current: weatherData.current,
      hourly: weatherData.hourly,
      daily: weatherData.daily
    }
  } catch (error) {
    console.error('Fetch weather error:', error)
    return null
  }
}


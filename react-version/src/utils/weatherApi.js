const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export async function searchWeather(query) {
  try {
    // Get coordinates
    const geocodeUrl = `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      return null
    }
    
    const location = geocodeData.results[0]
    const locationData = {
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone || 'auto'
    }
    
    // Fetch weather
    const params = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: locationData.timezone,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation',
      hourly: 'temperature_2m,weather_code,precipitation',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset',
      forecast_days: '7'
    })
    
    const weatherUrl = `${WEATHER_API}?${params}`
    const weatherResponse = await fetch(weatherUrl)
    
    if (!weatherResponse.ok) {
      throw new Error('Weather API failed')
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


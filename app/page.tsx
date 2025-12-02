'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import SearchSection from '@/components/SearchSection'
import WeatherContent from '@/components/WeatherContent'
import FavoritesPanel from '@/components/FavoritesPanel'
import ComparePanel from '@/components/ComparePanel'
import FAQs from '@/components/FAQs'
import { searchWeather, getUserLocation } from '@/lib/weatherApi'
import { WeatherData, Location, Units, Theme } from '@/types'

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<Location[]>([])
  const [theme, setTheme] = useState<Theme>('dark')
  const [units, setUnits] = useState<Units>({
    system: 'metric',
    temperature: 'celsius',
    wind: 'kmh',
    precipitation: 'mm'
  })
  const [showFavorites, setShowFavorites] = useState(false)
  const [showCompare, setShowCompare] = useState(false)

  // Load saved preferences
  useEffect(() => {
    const savedUnits = localStorage.getItem('weatherUnits')
    const savedFavorites = localStorage.getItem('weatherFavorites')
    const savedTheme = localStorage.getItem('weatherTheme')
    
    if (savedUnits) setUnits(JSON.parse(savedUnits))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    
    // Auto theme based on time
    const hour = new Date().getHours()
    const autoTheme = (hour >= 6 && hour < 20) ? 'light' : 'dark'
    setTheme(savedTheme ? savedTheme as Theme : autoTheme)
    
    // Load initial weather
    loadInitialWeather()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Apply theme
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : ''
    localStorage.setItem('weatherTheme', theme)
  }, [theme])

  // Save units
  useEffect(() => {
    localStorage.setItem('weatherUnits', JSON.stringify(units))
  }, [units])

  // Save favorites
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites))
  }, [favorites])

  const loadInitialWeather = async () => {
    try {
      setLoading(true)
      console.log('Loading initial weather for London...')
      // Try to use default city
      const data = await searchWeather('London')
      console.log('Initial weather data:', data)
      if (data) {
        setWeatherData(data)
        setCurrentLocation(data.location)
        console.log('Weather loaded successfully')
      } else {
        console.error('No data received')
        setError('Failed to load weather data')
      }
    } catch (err) {
      console.error('Error loading initial weather:', err)
      setError('Failed to load weather data')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    try {
      setLoading(true)
      setError('')
      console.log('Searching for:', query)
      const data = await searchWeather(query)
      console.log('Weather data received:', data)
      if (data) {
        setWeatherData(data)
        setCurrentLocation(data.location)
        setSelectedDayIndex(0)
      } else {
        setError('Location not found. Please try a different city.')
      }
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = () => {
    if (!currentLocation) return
    
    const exists = favorites.some(f => 
      f.latitude === currentLocation.latitude && 
      f.longitude === currentLocation.longitude
    )
    
    if (exists) {
      setFavorites(favorites.filter(f => 
        f.latitude !== currentLocation.latitude || 
        f.longitude !== currentLocation.longitude
      ))
    } else {
      setFavorites([...favorites, currentLocation])
    }
  }

  const isFavorite = currentLocation && favorites.some(f =>
    f.latitude === currentLocation.latitude &&
    f.longitude === currentLocation.longitude
  )

  return (
    <div className="container">
      <Header
        theme={theme}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onFavoritesClick={() => setShowFavorites(!showFavorites)}
        onCompareClick={() => setShowCompare(!showCompare)}
        units={units}
        onUnitsChange={setUnits}
      />

      <main className="main-content">
        <SearchSection
          onSearch={handleSearch}
          onUseLocation={loadInitialWeather}
          onToggleFavorite={toggleFavorite}
          isFavorite={!!isFavorite}
          showFavoriteButton={!!currentLocation}
          error={error}
          loading={loading}
        />

        {weatherData && currentLocation && (
          <WeatherContent
            weatherData={weatherData}
            location={currentLocation}
            selectedDayIndex={selectedDayIndex}
            onDaySelect={setSelectedDayIndex}
            units={units}
          />
        )}

        <FAQs />
      </main>

      <FavoritesPanel
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onLoadFavorite={handleSearch}
        onRemoveFavorite={(location) => {
          setFavorites(favorites.filter(f => 
            f.latitude !== location.latitude || 
            f.longitude !== location.longitude
          ))
        }}
        units={units}
      />

      <ComparePanel
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        units={units}
      />

      <div className="attribution">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </div>
  )
}


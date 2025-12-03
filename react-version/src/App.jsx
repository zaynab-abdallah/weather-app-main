import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import WeatherContent from './components/WeatherContent'
import FavoritesPanel from './components/FavoritesPanel'
import ComparePanel from './components/ComparePanel'
import FAQs from './components/FAQs'
import { searchWeather } from './utils/weatherApi'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState([])
  const [theme, setTheme] = useState('dark')
  const [units, setUnits] = useState({
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
    
    const hour = new Date().getHours()
    const autoTheme = (hour >= 6 && hour < 20) ? 'light' : 'dark'
    setTheme(savedTheme || autoTheme)
    
    // Load initial weather
    loadInitialWeather()
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
      const data = await searchWeather('London')
      if (data) {
        setWeatherData(data)
        setCurrentLocation(data.location)
      }
    } catch (err) {
      console.error('Error loading weather:', err)
      setError('Failed to load weather data')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    try {
      setLoading(true)
      setError('')
      const data = await searchWeather(query)
      if (data) {
        setWeatherData(data)
        setCurrentLocation(data.location)
        setSelectedDayIndex(0)
      } else {
        setError('Location not found. Please try a different city.')
      }
    } catch (err) {
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

export default App


// Weather App JavaScript

// State Management
const state = {
  currentLocation: null,
  weatherData: null,
  selectedDayIndex: 0,
  favorites: [],
  theme: 'dark', // 'dark' or 'light'
  units: {
    system: 'metric', // 'metric' or 'imperial'
    temperature: 'celsius', // 'celsius' or 'fahrenheit'
    wind: 'kmh', // 'kmh' or 'mph'
    precipitation: 'mm' // 'mm' or 'in'
  },
  voiceRecognition: null,
  isListening: false
};

// DOM Elements
const elements = {
  searchForm: document.getElementById('searchForm'),
  searchInput: document.getElementById('searchInput'),
  errorMessage: document.getElementById('errorMessage'),
  loadingState: document.getElementById('loadingState'),
  weatherContent: document.getElementById('weatherContent'),
  unitsToggle: document.querySelector('.units-toggle'),
  unitsMenu: document.querySelector('.units-menu'),
  weatherIcon: document.getElementById('weatherIcon'),
  temperature: document.getElementById('temperature'),
  temperatureUnit: document.getElementById('temperatureUnit'),
  locationName: document.getElementById('locationName'),
  locationDate: document.getElementById('locationDate'),
  feelsLike: document.getElementById('feelsLike'),
  feelsLikeUnit: document.getElementById('feelsLikeUnit'),
  humidity: document.getElementById('humidity'),
  windSpeed: document.getElementById('windSpeed'),
  windUnit: document.getElementById('windUnit'),
  precipitation: document.getElementById('precipitation'),
  precipUnit: document.getElementById('precipUnit'),
  dailyForecast: document.getElementById('dailyForecast'),
  daySelector: document.getElementById('daySelector'),
  hourlyForecast: document.getElementById('hourlyForecast'),
  currentWeatherSection: document.getElementById('currentWeatherSection'),
  uvIndex: document.getElementById('uvIndex'),
  visibility: document.getElementById('visibility'),
  visibilityUnit: document.getElementById('visibilityUnit'),
  pressure: document.getElementById('pressure'),
  pressureUnit: document.getElementById('pressureUnit'),
  sunrise: document.getElementById('sunrise'),
  sunset: document.getElementById('sunset'),
  themeToggle: document.getElementById('themeToggle'),
  voiceSearchButton: document.getElementById('voiceSearchButton'),
  useLocationButton: document.getElementById('useLocationButton'),
  addFavoriteButton: document.getElementById('addFavoriteButton'),
  favoritesToggle: document.getElementById('favoritesToggle'),
  favoritesPanel: document.getElementById('favoritesPanel'),
  favoritesList: document.getElementById('favoritesList'),
  closeFavoritesPanel: document.getElementById('closeFavoritesPanel'),
  compareToggle: document.getElementById('compareToggle'),
  comparePanel: document.getElementById('comparePanel'),
  compareInput1: document.getElementById('compareInput1'),
  compareInput2: document.getElementById('compareInput2'),
  compareButton: document.getElementById('compareButton'),
  compareResults: document.getElementById('compareResults'),
  closeComparePanel: document.getElementById('closeComparePanel'),
  faqsList: document.querySelectorAll('.faq-question')
};

// Weather Code to Icon Mapping
const weatherIcons = {
  0: 'icon-sunny.webp', // Clear sky
  1: 'icon-partly-cloudy.webp', // Mainly clear
  2: 'icon-partly-cloudy.webp', // Partly cloudy
  3: 'icon-overcast.webp', // Overcast
  45: 'icon-fog.webp', // Fog
  48: 'icon-fog.webp', // Depositing rime fog
  51: 'icon-drizzle.webp', // Light drizzle
  53: 'icon-drizzle.webp', // Moderate drizzle
  55: 'icon-drizzle.webp', // Dense drizzle
  56: 'icon-drizzle.webp', // Light freezing drizzle
  57: 'icon-drizzle.webp', // Dense freezing drizzle
  61: 'icon-rain.webp', // Slight rain
  63: 'icon-rain.webp', // Moderate rain
  65: 'icon-rain.webp', // Heavy rain
  66: 'icon-rain.webp', // Light freezing rain
  67: 'icon-rain.webp', // Heavy freezing rain
  71: 'icon-snow.webp', // Slight snow fall
  73: 'icon-snow.webp', // Moderate snow fall
  75: 'icon-snow.webp', // Heavy snow fall
  77: 'icon-snow.webp', // Snow grains
  80: 'icon-rain.webp', // Slight rain showers
  81: 'icon-rain.webp', // Moderate rain showers
  82: 'icon-rain.webp', // Violent rain showers
  85: 'icon-snow.webp', // Slight snow showers
  86: 'icon-snow.webp', // Heavy snow showers
  95: 'icon-storm.webp', // Thunderstorm
  96: 'icon-storm.webp', // Thunderstorm with slight hail
  99: 'icon-storm.webp' // Thunderstorm with heavy hail
};

// Initialize App
function init() {
  setupEventListeners();
  loadSavedUnits();
  loadFavorites();
  updateUnitButtons();
  initializeTheme();
  initializeVoiceRecognition();
  setupFAQs();
  // Load default city weather
  setTimeout(() => {
    searchWeather('London');
  }, 500);
}

// Setup Event Listeners
function setupEventListeners() {
  // Search form
  elements.searchForm.addEventListener('submit', handleSearch);
  
  // Search input - Enter key support
  elements.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      elements.searchForm.dispatchEvent(new Event('submit'));
    }
  });
  
  // Units dropdown toggle
  elements.unitsToggle.addEventListener('click', toggleUnitsMenu);
  elements.unitsToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleUnitsMenu();
    }
    if (e.key === 'Escape') {
      closeUnitsMenu();
    }
  });
  
  // Close units menu when clicking outside
  document.addEventListener('click', (e) => {
    const unitsDropdown = document.querySelector('.units-dropdown');
    if (unitsDropdown && !unitsDropdown.contains(e.target)) {
      closeUnitsMenu();
    }
  });
  
  // Unit option buttons
  document.querySelectorAll('.unit-option').forEach(button => {
    button.addEventListener('click', handleUnitChange);
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleUnitChange({ target: button });
      }
    });
  });

  // Theme toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }

  // Voice search
  if (elements.voiceSearchButton) {
    elements.voiceSearchButton.addEventListener('click', toggleVoiceSearch);
  }

  // Use location button
  if (elements.useLocationButton) {
    elements.useLocationButton.addEventListener('click', getUserLocation);
  }

  // Favorites
  if (elements.addFavoriteButton) {
    elements.addFavoriteButton.addEventListener('click', toggleFavorite);
  }
  if (elements.favoritesToggle) {
    elements.favoritesToggle.addEventListener('click', () => togglePanel('favorites'));
  }
  if (elements.closeFavoritesPanel) {
    elements.closeFavoritesPanel.addEventListener('click', () => togglePanel('favorites'));
  }

  // Compare
  if (elements.compareToggle) {
    elements.compareToggle.addEventListener('click', () => togglePanel('compare'));
  }
  if (elements.closeComparePanel) {
    elements.closeComparePanel.addEventListener('click', () => togglePanel('compare'));
  }
  if (elements.compareButton) {
    elements.compareButton.addEventListener('click', compareLocations);
  }

  // Close panels when clicking overlay
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('panel-overlay')) {
      closeAllPanels();
    }
  });
}

// Get user location using Geolocation API
function getUserLocation() {
  if (!navigator.geolocation) {
    searchWeather('London');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      // Use coordinates directly without reverse geocoding
      state.currentLocation = {
        name: 'My Location',
        country: '',
        latitude,
        longitude,
        timezone: 'auto'
      };
      await fetchWeatherData();
    },
    (error) => {
      console.error('Geolocation error:', error);
      searchWeather('London');
    },
    {
      timeout: 5000,
      maximumAge: 0
    }
  );
}

// Get location by IP (fallback)
async function getLocationByIP() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    if (data.city) {
      await searchWeather(data.city);
    } else {
      // Default to London if IP location fails
      await searchWeather('London');
    }
  } catch (error) {
    console.error('Error getting location:', error);
    // Default to London
    await searchWeather('London');
  }
}

// Handle Search
async function handleSearch(e) {
  e.preventDefault();
  const query = elements.searchInput.value.trim();
  if (!query) return;
  
  await searchWeather(query);
}

// Search Weather
async function searchWeather(query) {
  try {
    showLoading();
    hideError();
    
    // First, get coordinates from location name
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      showError('Location not found. Please try a different city name.');
      hideLoading();
      return;
    }
    
    const location = geocodeData.results[0];
    state.currentLocation = {
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone || 'auto'
    };
    
    // Fetch weather data
    await fetchWeatherData();
    
  } catch (error) {
    console.error('Search error:', error);
    showError('Failed to fetch weather data. Please try again.');
    hideLoading();
  }
}

// Fetch Weather Data
async function fetchWeatherData() {
  try {
    const { latitude, longitude, timezone } = state.currentLocation;
    
    // Build API URL with all required parameters
    const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      timezone: timezone,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index,visibility,surface_pressure',
      hourly: 'temperature_2m,weather_code,precipitation',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max',
      forecast_days: 7
    });
    
    const url = `https://api.open-meteo.com/v1/forecast?${params}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    state.weatherData = data;
    state.selectedDayIndex = 0;
    
    renderWeather();
    hideLoading();
    
  } catch (error) {
    console.error('Weather fetch error:', error);
    showError('Failed to fetch weather data. Please try again.');
    hideLoading();
  }
}

// Render Weather
function renderWeather() {
  if (!state.weatherData || !state.currentLocation) return;
  
  renderCurrentWeather();
  renderMetrics();
  renderDailyForecast();
  renderDaySelector();
  renderHourlyForecast();
  
  elements.weatherContent.classList.add('active');
}

// Render Current Weather
function renderCurrentWeather() {
  const current = state.weatherData.current;
  const daily = state.weatherData.daily;
  const weatherCode = current.weather_code;
  const temp = convertTemperature(current.temperature_2m);
  
  if (elements.weatherIcon) {
    elements.weatherIcon.src = `./assets/images/${weatherIcons[weatherCode] || 'icon-sunny.webp'}`;
    elements.weatherIcon.alt = `Weather condition: ${weatherCode}`;
  }
  
  if (elements.temperature) elements.temperature.textContent = Math.round(temp);
  if (elements.temperatureUnit) elements.temperatureUnit.textContent = getTemperatureUnit();
  
  if (elements.locationName) elements.locationName.textContent = `${state.currentLocation.name}, ${state.currentLocation.country}`;
  if (elements.locationDate) elements.locationDate.textContent = formatDate(new Date());
  
  // Update weather background animation class
  updateWeatherBackground(weatherCode);
  
  // Render sunrise/sunset
  if (daily.sunrise && daily.sunrise[0] && elements.sunrise) {
    const sunriseTime = new Date(daily.sunrise[0]);
    elements.sunrise.textContent = formatTime(sunriseTime);
  }
  if (daily.sunset && daily.sunset[0] && elements.sunset) {
    const sunsetTime = new Date(daily.sunset[0]);
    elements.sunset.textContent = formatTime(sunsetTime);
  }
  
  // Update favorite button
  updateFavoriteButton();
}

// Render Metrics
function renderMetrics() {
  const current = state.weatherData.current;
  
  // Feels like (using apparent temperature approximation)
  const feelsLikeTemp = convertTemperature(current.temperature_2m);
  if (elements.feelsLike) elements.feelsLike.textContent = Math.round(feelsLikeTemp);
  if (elements.feelsLikeUnit) elements.feelsLikeUnit.textContent = getTemperatureUnit();
  
  // Humidity
  if (elements.humidity) elements.humidity.textContent = Math.round(current.relative_humidity_2m);
  
  // Wind Speed
  const windSpeed = convertWindSpeed(current.wind_speed_10m);
  if (elements.windSpeed) elements.windSpeed.textContent = Math.round(windSpeed);
  if (elements.windUnit) elements.windUnit.textContent = getWindUnit();
  
  // Precipitation
  const precipitation = convertPrecipitation(current.precipitation);
  if (elements.precipitation) elements.precipitation.textContent = precipitation.toFixed(1);
  if (elements.precipUnit) elements.precipUnit.textContent = getPrecipitationUnit();
  
  // UV Index
  if (current.uv_index !== undefined && elements.uvIndex) {
    elements.uvIndex.textContent = Math.round(current.uv_index);
  }
  
  // Visibility
  if (current.visibility !== undefined && elements.visibility) {
    const visibility = state.units.system === 'imperial' 
      ? (current.visibility / 1.609).toFixed(1) 
      : current.visibility.toFixed(1);
    elements.visibility.textContent = visibility;
    if (elements.visibilityUnit) elements.visibilityUnit.textContent = state.units.system === 'imperial' ? 'mi' : 'km';
  }
  
  // Air Pressure
  if (current.surface_pressure !== undefined && elements.pressure) {
    elements.pressure.textContent = Math.round(current.surface_pressure);
    if (elements.pressureUnit) elements.pressureUnit.textContent = 'hPa';
  }
}

// Render Daily Forecast
function renderDailyForecast() {
  const daily = state.weatherData.daily;
  elements.dailyForecast.innerHTML = '';
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayName = days[date.getDay()];
    
    const weatherCode = daily.weather_code[i];
    const maxTemp = convertTemperature(daily.temperature_2m_max[i]);
    const minTemp = convertTemperature(daily.temperature_2m_min[i]);
    
    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    forecastItem.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-icon-wrapper">
        <img src="./assets/images/${weatherIcons[weatherCode] || 'icon-sunny.webp'}" 
             alt="Weather" 
             class="forecast-icon">
      </div>
      <div class="forecast-temps">
        <span class="forecast-high">${Math.round(maxTemp)}°</span>
        <span class="forecast-low">${Math.round(minTemp)}°</span>
      </div>
    `;
    
    elements.dailyForecast.appendChild(forecastItem);
  }
}

// Render Day Selector
function renderDaySelector() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  elements.daySelector.innerHTML = '';
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayName = days[date.getDay()];
    
    const button = document.createElement('button');
    button.className = `day-button ${i === state.selectedDayIndex ? 'active' : ''}`;
    button.textContent = dayName;
    button.addEventListener('click', () => {
      state.selectedDayIndex = i;
      renderDaySelector();
      renderHourlyForecast();
    });
    
    elements.daySelector.appendChild(button);
  }
}

// Render Hourly Forecast
function renderHourlyForecast() {
  const hourly = state.weatherData.hourly;
  const now = new Date();
  const currentHour = now.getHours();
  
  let startIndex = 0;
  let hoursToShow = 24;
  
  if (state.selectedDayIndex === 0) {
    // For today, start from current hour
    // Find the index of the current hour in the hourly data
    for (let i = 0; i < hourly.time.length; i++) {
      const time = new Date(hourly.time[i]);
      if (time.getDate() === now.getDate() && time.getHours() >= currentHour) {
        startIndex = i;
        break;
      }
    }
    // Show remaining hours of today (up to 24 hours)
    hoursToShow = Math.min(24, hourly.time.length - startIndex);
  } else {
    // For future days, calculate the start index
    // Find the first hour of the selected day
    const selectedDate = new Date(now);
    selectedDate.setDate(now.getDate() + state.selectedDayIndex);
    selectedDate.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < hourly.time.length; i++) {
      const time = new Date(hourly.time[i]);
      if (time.getTime() >= selectedDate.getTime()) {
        startIndex = i;
        break;
      }
    }
    hoursToShow = 24;
  }
  
  elements.hourlyForecast.innerHTML = '';
  
  for (let i = startIndex; i < startIndex + hoursToShow && i < hourly.time.length; i++) {
    const time = new Date(hourly.time[i]);
    const hour = time.getHours();
    const weatherCode = hourly.weather_code[i];
    const temp = convertTemperature(hourly.temperature_2m[i]);
    
    const hourlyItem = document.createElement('div');
    hourlyItem.className = 'hourly-item';
    hourlyItem.innerHTML = `
      <div class="hourly-time">${formatHour(hour)}</div>
      <img src="./assets/images/${weatherIcons[weatherCode] || 'icon-sunny.webp'}" 
           alt="Weather" 
           class="hourly-icon">
      <div class="hourly-temp">${Math.round(temp)}°</div>
    `;
    
    elements.hourlyForecast.appendChild(hourlyItem);
  }
}

// Unit Conversion Functions
function convertTemperature(celsius) {
  if (state.units.temperature === 'fahrenheit') {
    return (celsius * 9/5) + 32;
  }
  return celsius;
}

function convertWindSpeed(kmh) {
  if (state.units.wind === 'mph') {
    return kmh * 0.621371;
  }
  return kmh;
}

function convertPrecipitation(mm) {
  if (state.units.precipitation === 'in') {
    return mm * 0.0393701;
  }
  return mm;
}

function getTemperatureUnit() {
  return state.units.temperature === 'fahrenheit' ? '°F' : '°C';
}

function getWindUnit() {
  return state.units.wind === 'mph' ? 'mph' : 'km/h';
}

function getPrecipitationUnit() {
  return state.units.precipitation === 'in' ? 'in' : 'mm';
}

// Handle Unit Change
function handleUnitChange(e) {
  const button = e.target;
  const unit = button.dataset.unit;
  const type = button.dataset.type;
  const value = button.dataset.value;
  
  if (unit === 'metric' || unit === 'imperial') {
    // System toggle
    state.units.system = unit;
    if (unit === 'metric') {
      state.units.temperature = 'celsius';
      state.units.wind = 'kmh';
      state.units.precipitation = 'mm';
    } else {
      state.units.temperature = 'fahrenheit';
      state.units.wind = 'mph';
      state.units.precipitation = 'in';
    }
  } else if (type && value) {
    // Specific unit type
    state.units[type] = value;
  }
  
  updateUnitButtons();
  saveUnits();
  
  if (state.weatherData) {
    renderWeather();
  }
}

// Update Unit Buttons
function updateUnitButtons() {
  document.querySelectorAll('.unit-option').forEach(button => {
    button.classList.remove('active');
    
    const unit = button.dataset.unit;
    const type = button.dataset.type;
    const value = button.dataset.value;
    
    if (unit === state.units.system) {
      button.classList.add('active');
    } else if (type && value && state.units[type] === value) {
      button.classList.add('active');
    }
  });
}

// Toggle Units Menu
function toggleUnitsMenu() {
  const isExpanded = elements.unitsToggle.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    closeUnitsMenu();
  } else {
    openUnitsMenu();
  }
}

// Open Units Menu
function openUnitsMenu() {
  elements.unitsToggle.setAttribute('aria-expanded', 'true');
  elements.unitsMenu.classList.add('active');
}

// Close Units Menu
function closeUnitsMenu() {
  elements.unitsToggle.setAttribute('aria-expanded', 'false');
  elements.unitsMenu.classList.remove('active');
}

// Save Units to LocalStorage
function saveUnits() {
  localStorage.setItem('weatherUnits', JSON.stringify(state.units));
}

// Load Saved Units
function loadSavedUnits() {
  const saved = localStorage.getItem('weatherUnits');
  if (saved) {
    try {
      state.units = { ...state.units, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading saved units:', e);
    }
  }
}

// Utility Functions
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatHour(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}${period}`;
}

function showLoading() {
  elements.loadingState.classList.add('active');
  elements.weatherContent.classList.remove('active');
}

function hideLoading() {
  elements.loadingState.classList.remove('active');
}

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.add('show');
}

function hideError() {
  elements.errorMessage.classList.remove('show');
}

// Format time helper
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')}${period}`;
}

// Update Weather Background Animation
function updateWeatherBackground(weatherCode) {
  if (!elements.currentWeatherSection) return;
  
  // Remove all weather classes
  elements.currentWeatherSection.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'stormy');
  
  // Add appropriate class based on weather code
  if (weatherCode === 0 || weatherCode === 1) {
    elements.currentWeatherSection.classList.add('sunny');
  } else if (weatherCode >= 2 && weatherCode <= 3) {
    elements.currentWeatherSection.classList.add('cloudy');
  } else if (weatherCode >= 45 && weatherCode <= 48) {
    elements.currentWeatherSection.classList.add('cloudy');
  } else if (weatherCode >= 51 && weatherCode <= 67 || weatherCode >= 80 && weatherCode <= 82) {
    elements.currentWeatherSection.classList.add('rainy');
  } else if (weatherCode >= 71 && weatherCode <= 77 || weatherCode >= 85 && weatherCode <= 86) {
    elements.currentWeatherSection.classList.add('snowy');
  } else if (weatherCode >= 95 && weatherCode <= 99) {
    elements.currentWeatherSection.classList.add('stormy');
  }
}

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('weatherTheme');
  const hour = new Date().getHours();
  
  // Auto theme based on time of day (6 AM - 8 PM = light, else dark)
  if (!savedTheme) {
    state.theme = (hour >= 6 && hour < 20) ? 'light' : 'dark';
  } else {
    state.theme = savedTheme;
  }
  
  applyTheme();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  localStorage.setItem('weatherTheme', state.theme);
}

function applyTheme() {
  if (state.theme === 'light') {
    document.body.classList.add('light-theme');
    if (elements.themeToggle) {
      elements.themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }
  } else {
    document.body.classList.remove('light-theme');
    if (elements.themeToggle) {
      elements.themeToggle.querySelector('.theme-icon').textContent = '🌙';
    }
  }
}

// Voice Search
function initializeVoiceRecognition() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    state.voiceRecognition = new SpeechRecognition();
    state.voiceRecognition.continuous = false;
    state.voiceRecognition.interimResults = false;
    state.voiceRecognition.lang = 'en-US';
    
    state.voiceRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      elements.searchInput.value = transcript;
      searchWeather(transcript);
      stopVoiceSearch();
    };
    
    state.voiceRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopVoiceSearch();
      showError('Voice recognition failed. Please try again.');
    };
    
    state.voiceRecognition.onend = () => {
      stopVoiceSearch();
    };
  }
}

function toggleVoiceSearch() {
  if (!state.voiceRecognition) {
    showError('Voice search is not supported in your browser.');
    return;
  }
  
  if (state.isListening) {
    stopVoiceSearch();
  } else {
    startVoiceSearch();
  }
}

function startVoiceSearch() {
  if (!state.voiceRecognition) return;
  
  try {
    state.voiceRecognition.start();
    state.isListening = true;
    if (elements.voiceSearchButton) {
      elements.voiceSearchButton.classList.add('listening');
    }
  } catch (error) {
    console.error('Error starting voice recognition:', error);
  }
}

function stopVoiceSearch() {
  if (state.voiceRecognition && state.isListening) {
    try {
      state.voiceRecognition.stop();
    } catch (error) {
      // Ignore errors when stopping
    }
    state.isListening = false;
    if (elements.voiceSearchButton) {
      elements.voiceSearchButton.classList.remove('listening');
    }
  }
}

// Favorites Management
function loadFavorites() {
  const saved = localStorage.getItem('weatherFavorites');
  if (saved) {
    try {
      state.favorites = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading favorites:', e);
      state.favorites = [];
    }
  }
  renderFavorites();
}

function saveFavorites() {
  localStorage.setItem('weatherFavorites', JSON.stringify(state.favorites));
}

function isFavorite() {
  if (!state.currentLocation) return false;
  return state.favorites.some(fav => 
    fav.latitude === state.currentLocation.latitude &&
    fav.longitude === state.currentLocation.longitude
  );
}

function toggleFavorite() {
  if (!state.currentLocation) return;
  
  const index = state.favorites.findIndex(fav =>
    fav.latitude === state.currentLocation.latitude &&
    fav.longitude === state.currentLocation.longitude
  );
  
  if (index > -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push({
      name: state.currentLocation.name,
      country: state.currentLocation.country,
      latitude: state.currentLocation.latitude,
      longitude: state.currentLocation.longitude
    });
  }
  
  saveFavorites();
  renderFavorites();
  updateFavoriteButton();
}

function updateFavoriteButton() {
  if (!elements.addFavoriteButton) return;
  
  if (state.currentLocation) {
    elements.addFavoriteButton.style.display = 'flex';
    if (isFavorite()) {
      elements.addFavoriteButton.classList.add('active');
      elements.addFavoriteButton.innerHTML = '<span>⭐</span> Remove from Favorites';
    } else {
      elements.addFavoriteButton.classList.remove('active');
      elements.addFavoriteButton.innerHTML = '<span>⭐</span> Add to Favorites';
    }
  } else {
    elements.addFavoriteButton.style.display = 'none';
  }
}

async function renderFavorites() {
  if (!elements.favoritesList) return;
  
  elements.favoritesList.innerHTML = '';
  
  if (state.favorites.length === 0) {
    elements.favoritesList.innerHTML = '<p style="text-align: center; color: var(--neutral-300); padding: var(--spacing-lg);">No favorites yet. Add locations to see them here!</p>';
    return;
  }
  
  for (const favorite of state.favorites) {
    try {
      // Fetch current weather for favorite
      const params = new URLSearchParams({
        latitude: favorite.latitude,
        longitude: favorite.longitude,
        current: 'temperature_2m',
        timezone: 'auto'
      });
      
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      const data = await response.json();
      const temp = convertTemperature(data.current.temperature_2m);
      
      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorite-item';
      favoriteItem.innerHTML = `
        <div class="favorite-item-info">
          <div class="favorite-item-name">${favorite.name}${favorite.country ? ', ' + favorite.country : ''}</div>
          <div class="favorite-item-temp">${Math.round(temp)}${getTemperatureUnit()}</div>
        </div>
        <div class="favorite-item-actions">
          <button onclick="loadFavorite('${favorite.latitude}', '${favorite.longitude}')" aria-label="Load ${favorite.name}">📍</button>
          <button onclick="removeFavorite('${favorite.latitude}', '${favorite.longitude}')" aria-label="Remove ${favorite.name}">🗑️</button>
        </div>
      `;
      
      elements.favoritesList.appendChild(favoriteItem);
    } catch (error) {
      console.error('Error loading favorite weather:', error);
    }
  }
}

// Make functions globally available for onclick handlers
window.loadFavorite = async function(lat, lon) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  
  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0];
      state.currentLocation = {
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone || 'auto'
      };
      await fetchWeatherData();
      togglePanel('favorites');
    }
  } catch (error) {
    console.error('Error loading favorite:', error);
  }
};

window.removeFavorite = function(lat, lon) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  
  state.favorites = state.favorites.filter(fav =>
    fav.latitude !== latitude || fav.longitude !== longitude
  );
  
  saveFavorites();
  renderFavorites();
  updateFavoriteButton();
};

// Panel Management
function togglePanel(panelName) {
  const panel = panelName === 'favorites' ? elements.favoritesPanel : elements.comparePanel;
  const overlay = document.querySelector('.panel-overlay') || createOverlay();
  
  if (panel.classList.contains('active')) {
    panel.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    closeAllPanels();
    panel.classList.add('active');
    overlay.classList.add('active');
  }
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'panel-overlay';
  document.body.appendChild(overlay);
  return overlay;
}

function closeAllPanels() {
  if (elements.favoritesPanel) elements.favoritesPanel.classList.remove('active');
  if (elements.comparePanel) elements.comparePanel.classList.remove('active');
  const overlay = document.querySelector('.panel-overlay');
  if (overlay) overlay.classList.remove('active');
}

// Compare Locations
async function compareLocations() {
  const loc1 = elements.compareInput1.value.trim();
  const loc2 = elements.compareInput2.value.trim();
  
  if (!loc1 || !loc2) {
    showError('Please enter both locations to compare.');
    return;
  }
  
  try {
    showLoading();
    
    const [weather1, weather2] = await Promise.all([
      fetchWeatherForLocation(loc1),
      fetchWeatherForLocation(loc2)
    ]);
    
    if (!weather1 || !weather2) {
      showError('Failed to fetch weather for one or both locations.');
      hideLoading();
      return;
    }
    
    renderCompareResults(weather1, weather2);
    hideLoading();
  } catch (error) {
    console.error('Compare error:', error);
    showError('Failed to compare locations. Please try again.');
    hideLoading();
  }
}

async function fetchWeatherForLocation(query) {
  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      return null;
    }
    
    const location = geocodeData.results[0];
    const params = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index,visibility,surface_pressure',
      timezone: location.timezone || 'auto'
    });
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${params}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    
    return {
      location: {
        name: location.name,
        country: location.country
      },
      weather: weatherData.current
    };
  } catch (error) {
    console.error('Error fetching weather for comparison:', error);
    return null;
  }
}

function renderCompareResults(weather1, weather2) {
  if (!elements.compareResults) return;
  
  const current = state.weatherData?.current;
  const temp1 = convertTemperature(weather1.weather.temperature_2m);
  const temp2 = convertTemperature(weather2.weather.temperature_2m);
  const wind1 = convertWindSpeed(weather1.weather.wind_speed_10m);
  const wind2 = convertWindSpeed(weather2.weather.wind_speed_10m);
  const precip1 = convertPrecipitation(weather1.weather.precipitation);
  const precip2 = convertPrecipitation(weather2.weather.precipitation);
  
  elements.compareResults.innerHTML = `
    <div class="compare-card">
      <h3>${weather1.location.name}${weather1.location.country ? ', ' + weather1.location.country : ''}</h3>
      <div class="compare-metric">
        <span class="compare-metric-label">Temperature</span>
        <span class="compare-metric-value">${Math.round(temp1)}${getTemperatureUnit()}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Humidity</span>
        <span class="compare-metric-value">${Math.round(weather1.weather.relative_humidity_2m)}%</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Wind Speed</span>
        <span class="compare-metric-value">${Math.round(wind1)} ${getWindUnit()}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Precipitation</span>
        <span class="compare-metric-value">${precip1.toFixed(1)} ${getPrecipitationUnit()}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">UV Index</span>
        <span class="compare-metric-value">${Math.round(weather1.weather.uv_index || 0)}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Visibility</span>
        <span class="compare-metric-value">${weather1.weather.visibility ? (state.units.system === 'imperial' ? (weather1.weather.visibility / 1.609).toFixed(1) + ' mi' : weather1.weather.visibility.toFixed(1) + ' km') : 'N/A'}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Pressure</span>
        <span class="compare-metric-value">${Math.round(weather1.weather.surface_pressure || 0)} hPa</span>
      </div>
    </div>
    <div class="compare-card">
      <h3>${weather2.location.name}${weather2.location.country ? ', ' + weather2.location.country : ''}</h3>
      <div class="compare-metric">
        <span class="compare-metric-label">Temperature</span>
        <span class="compare-metric-value">${Math.round(temp2)}${getTemperatureUnit()}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Humidity</span>
        <span class="compare-metric-value">${Math.round(weather2.weather.relative_humidity_2m)}%</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Wind Speed</span>
        <span class="compare-metric-value">${Math.round(wind2)} ${getWindUnit()}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Precipitation</span>
        <span class="compare-metric-value">${precip2.toFixed(1)} ${getPrecipitationUnit()}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">UV Index</span>
        <span class="compare-metric-value">${Math.round(weather2.weather.uv_index || 0)}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Visibility</span>
        <span class="compare-metric-value">${weather2.weather.visibility ? (state.units.system === 'imperial' ? (weather2.weather.visibility / 1.609).toFixed(1) + ' mi' : weather2.weather.visibility.toFixed(1) + ' km') : 'N/A'}</span>
      </div>
      <div class="compare-metric">
        <span class="compare-metric-label">Pressure</span>
        <span class="compare-metric-value">${Math.round(weather2.weather.surface_pressure || 0)} hPa</span>
      </div>
    </div>
  `;
}

// FAQs Setup
function setupFAQs() {
  const faqQuestions = document.querySelectorAll('.faq-question')
  if (!faqQuestions || faqQuestions.length === 0) return
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true'
      
      // Close all other FAQs
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.setAttribute('aria-expanded', 'false')
        }
      })
      
      // Toggle current FAQ
      question.setAttribute('aria-expanded', !isExpanded)
    })
  })
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


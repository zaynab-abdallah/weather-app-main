import { useState } from 'react'

export default function Header({ theme, onThemeToggle, onFavoritesClick, onCompareClick, units, onUnitsChange }) {
  const [showUnitsMenu, setShowUnitsMenu] = useState(false)

  const handleUnitChange = (type, value) => {
    if (type === 'system') {
      if (value === 'metric') {
        onUnitsChange({
          system: 'metric',
          temperature: 'celsius',
          wind: 'kmh',
          precipitation: 'mm'
        })
      } else {
        onUnitsChange({
          system: 'imperial',
          temperature: 'fahrenheit',
          wind: 'mph',
          precipitation: 'in'
        })
      }
    } else {
      onUnitsChange({ ...units, [type]: value })
    }
  }

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">☀️</span>
        <span className="logo-text">Weather Now</span>
      </div>
      <div className="header-actions">
        <button className="icon-button" onClick={onThemeToggle} aria-label="Toggle theme">
          <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </button>
        <button className="icon-button" onClick={onFavoritesClick} aria-label="View favorites">
          <span className="favorites-icon">⭐</span>
        </button>
        <button className="icon-button" onClick={onCompareClick} aria-label="Compare locations">
          <span className="compare-icon">⚖</span>
        </button>
        <div className="units-dropdown">
          <button
            className="units-toggle"
            onClick={() => setShowUnitsMenu(!showUnitsMenu)}
            aria-label="Toggle units dropdown"
            aria-expanded={showUnitsMenu}
          >
            <span>Units</span>
            <img src="/assets/images/icon-dropdown.svg" alt="" className="dropdown-icon" />
          </button>
          <div className={`units-menu ${showUnitsMenu ? 'active' : ''}`} role="menu">
            <div className="units-section">
              <div className="units-label">Switch to Imperial/Metric</div>
              <div className="units-toggle-group">
                <button
                  className={`unit-option ${units.system === 'metric' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('system', 'metric')}
                >
                  Metric
                </button>
                <button
                  className={`unit-option ${units.system === 'imperial' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('system', 'imperial')}
                >
                  Imperial
                </button>
              </div>
            </div>
            <div className="units-section">
              <div className="units-label">Temperature</div>
              <div className="units-toggle-group">
                <button
                  className={`unit-option ${units.temperature === 'celsius' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('temperature', 'celsius')}
                >
                  Celsius (°C)
                </button>
                <button
                  className={`unit-option ${units.temperature === 'fahrenheit' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('temperature', 'fahrenheit')}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>
            <div className="units-section">
              <div className="units-label">Wind Speed</div>
              <div className="units-toggle-group">
                <button
                  className={`unit-option ${units.wind === 'kmh' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('wind', 'kmh')}
                >
                  km/h
                </button>
                <button
                  className={`unit-option ${units.wind === 'mph' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('wind', 'mph')}
                >
                  mph
                </button>
              </div>
            </div>
            <div className="units-section">
              <div className="units-label">Precipitation</div>
              <div className="units-toggle-group">
                <button
                  className={`unit-option ${units.precipitation === 'mm' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('precipitation', 'mm')}
                >
                  Millimeters (mm)
                </button>
                <button
                  className={`unit-option ${units.precipitation === 'in' ? 'active' : ''}`}
                  onClick={() => handleUnitChange('precipitation', 'in')}
                >
                  Inches (in)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


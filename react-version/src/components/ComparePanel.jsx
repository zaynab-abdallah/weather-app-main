import { useState } from 'react'
import { searchWeather } from '../utils/weatherApi'
import { convertTemperature, convertWindSpeed, getTemperatureUnit, getWindUnit } from '../utils/helpers'

export default function ComparePanel({ isOpen, onClose, units }) {
  const [location1, setLocation1] = useState('')
  const [location2, setLocation2] = useState('')
  const [compareData, setCompareData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    if (!location1.trim() || !location2.trim()) return
    
    setLoading(true)
    try {
      const [data1, data2] = await Promise.all([
        searchWeather(location1),
        searchWeather(location2)
      ])
      
      if (data1 && data2) {
        setCompareData({ data1, data2 })
      }
    } catch (error) {
      console.error('Compare error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && <div className="panel-overlay active" onClick={onClose}></div>}
      <aside className={`compare-panel ${isOpen ? 'active' : ''}`}>
        <div className="panel-header">
          <h2>Compare Locations</h2>
          <button className="close-panel" onClick={onClose}>×</button>
        </div>
        <div className="compare-content">
          <div className="compare-inputs">
            <input
              type="text"
              className="compare-input"
              value={location1}
              onChange={(e) => setLocation1(e.target.value)}
              placeholder="Location 1"
            />
            <input
              type="text"
              className="compare-input"
              value={location2}
              onChange={(e) => setLocation2(e.target.value)}
              placeholder="Location 2"
            />
            <button className="compare-button" onClick={handleCompare}>Compare</button>
          </div>
          {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
          {compareData && (
            <div className="compare-results">
              <div className="compare-card">
                <h3>{compareData.data1.location.name}</h3>
                <div className="compare-metric">
                  <span className="compare-metric-label">Temperature</span>
                  <span className="compare-metric-value">
                    {Math.round(convertTemperature(compareData.data1.current.temperature_2m, units.temperature))}
                    {getTemperatureUnit(units)}
                  </span>
                </div>
                <div className="compare-metric">
                  <span className="compare-metric-label">Humidity</span>
                  <span className="compare-metric-value">
                    {Math.round(compareData.data1.current.relative_humidity_2m)}%
                  </span>
                </div>
                <div className="compare-metric">
                  <span className="compare-metric-label">Wind</span>
                  <span className="compare-metric-value">
                    {Math.round(convertWindSpeed(compareData.data1.current.wind_speed_10m, units.wind))} {getWindUnit(units)}
                  </span>
                </div>
              </div>
              <div className="compare-card">
                <h3>{compareData.data2.location.name}</h3>
                <div className="compare-metric">
                  <span className="compare-metric-label">Temperature</span>
                  <span className="compare-metric-value">
                    {Math.round(convertTemperature(compareData.data2.current.temperature_2m, units.temperature))}
                    {getTemperatureUnit(units)}
                  </span>
                </div>
                <div className="compare-metric">
                  <span className="compare-metric-label">Humidity</span>
                  <span className="compare-metric-value">
                    {Math.round(compareData.data2.current.relative_humidity_2m)}%
                  </span>
                </div>
                <div className="compare-metric">
                  <span className="compare-metric-label">Wind</span>
                  <span className="compare-metric-value">
                    {Math.round(convertWindSpeed(compareData.data2.current.wind_speed_10m, units.wind))} {getWindUnit(units)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}


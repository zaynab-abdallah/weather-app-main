import { useState } from 'react'

export default function SearchSection({ onSearch, error, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <section className="search-section">
      <h1 className="search-title">How's the sky looking today?</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <img src="/assets/images/icon-search.svg" alt="Search" className="search-icon-left" />
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a place..."
            aria-label="Search for a city"
          />
          <button type="submit" className="search-button" aria-label="Search">
            Search
          </button>
        </div>
        {error && (
          <div className="error-message show" role="alert">
            {error}
          </div>
        )}
      </form>
      
      {loading && (
        <div className="loading-state active">
          <img src="/assets/images/icon-loading.svg" alt="Loading" />
          <p>Loading weather data...</p>
        </div>
      )}
    </section>
  )
}


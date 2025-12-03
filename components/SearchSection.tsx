'use client'

import { useState, FormEvent } from 'react'

interface SearchSectionProps {
  onSearch: (query: string) => void
  onUseLocation: () => void
  onToggleFavorite: () => void
  isFavorite: boolean
  showFavoriteButton: boolean
  error: string
  loading: boolean
}

export default function SearchSection({
  onSearch,
  onUseLocation,
  onToggleFavorite,
  isFavorite,
  showFavoriteButton,
  error,
  loading
}: SearchSectionProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <section className="search-section">
      <h1 className="search-title">How&apos;s the sky looking today?</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-wrapper">
          <div className="search-input-wrapper">
            <img
              src="/assets/images/icon-search.svg"
              alt="Search"
              className="search-icon-left"
            />
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a place..."
              aria-label="Search for a city"
            />
          </div>
          <button type="submit" className="search-button" aria-label="Search">
            Search
          </button>
        </div>
        {error && (
          <div className="error-message show" role="alert" aria-live="polite">
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


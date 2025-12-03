export default function FavoritesPanel({ isOpen, onClose, favorites, onLoadFavorite, onRemoveFavorite }) {
  return (
    <>
      {isOpen && <div className="panel-overlay active" onClick={onClose}></div>}
      <aside className={`favorites-panel ${isOpen ? 'active' : ''}`}>
        <div className="panel-header">
          <h2>Favorites</h2>
          <button className="close-panel" onClick={onClose} aria-label="Close favorites">
            ×
          </button>
        </div>
        <div className="favorites-list">
          {favorites.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--neutral-300)', padding: 'var(--spacing-lg)' }}>
              No favorites yet. Add locations to see them here!
            </p>
          ) : (
            favorites.map((fav, index) => (
              <div key={index} className="favorite-item">
                <div className="favorite-item-info" onClick={() => {
                  onLoadFavorite(fav.name)
                  onClose()
                }}>
                  <div className="favorite-item-name">
                    {fav.name}{fav.country ? `, ${fav.country}` : ''}
                  </div>
                </div>
                <div className="favorite-item-actions">
                  <button onClick={() => { onLoadFavorite(fav.name); onClose() }}>📍</button>
                  <button onClick={() => onRemoveFavorite(fav)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}


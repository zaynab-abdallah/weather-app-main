# Weather App - Next.js Version

This is a modern weather application built with Next.js, React, and TypeScript.

## Features

✨ **Core Features:**
- Search for weather by city name
- Current weather with detailed metrics
- 7-day daily forecast
- Hourly forecast with day selector
- Unit conversion (Imperial/Metric)
- Geolocation detection

🎨 **Advanced Features:**
- Favorites/saved locations
- Compare locations side-by-side
- Dark/Light mode themes (auto-adapts to time of day)
- Animated weather backgrounds
- Progressive Web App (PWA) support
- Responsive design (mobile, tablet, desktop)

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
weather-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header with theme & units
│   ├── SearchSection.tsx   # Search functionality
│   ├── WeatherContent.tsx  # Main weather display
│   ├── CurrentWeather.tsx  # Current weather card
│   ├── WeatherMetrics.tsx  # Weather metrics grid
│   ├── DailyForecast.tsx   # 7-day forecast
│   ├── HourlyForecast.tsx  # Hourly forecast
│   ├── FavoritesPanel.tsx  # Favorites sidebar
│   ├── ComparePanel.tsx    # Compare locations
│   └── FAQs.tsx            # FAQs section
├── lib/
│   ├── weatherApi.ts       # API integration
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript types
├── public/
│   └── assets/             # Images and fonts
├── package.json
├── tsconfig.json
└── next.config.js
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **React 18** - UI library
- **Open-Meteo API** - Weather data (no API key required)

## API

This project uses the [Open-Meteo API](https://open-meteo.com/):
- Completely free
- No API key required
- No rate limits for personal use

## License

This project is based on a Frontend Mentor challenge.


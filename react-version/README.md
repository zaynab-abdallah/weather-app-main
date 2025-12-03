# Weather App - React + Vite Version

تطبيق طقس حديث مبني باستخدام React و Vite.

## 🚀 التشغيل السريع

### 1. تثبيت المكتبات:
```bash
cd react-version
npm install
```

### 2. نسخ مجلد Assets:
انسخ مجلد `assets` من المشروع الأصلي إلى `react-version/public/`:
```bash
# من المجلد الرئيسي
Copy-Item -Path assets -Destination react-version/public/assets -Recurse
```

### 3. تشغيل المشروع:
```bash
npm run dev
```

سيعمل التطبيق على: `http://localhost:5173`

---

## 📁 هيكل المشروع

```
react-version/
├── public/
│   └── assets/          # الصور والخطوط
├── src/
│   ├── components/      # مكونات React
│   │   ├── Header.jsx
│   │   ├── SearchSection.jsx
│   │   ├── WeatherContent.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── WeatherMetrics.jsx
│   │   ├── DailyForecast.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── FavoritesPanel.jsx
│   │   ├── ComparePanel.jsx
│   │   └── FAQs.jsx
│   ├── utils/
│   │   ├── weatherApi.js    # API calls
│   │   └── helpers.js       # Utility functions
│   ├── App.jsx              # المكون الرئيسي
│   ├── main.jsx             # Entry point
│   └── index.css            # Styles
├── index.html
├── package.json
└── vite.config.js
```

---

## ✨ المميزات

- ⚡ Vite - بناء سريع جداً
- ⚛️ React 18 - أحدث إصدار
- 🎨 Component-based - مكونات منفصلة
- 🔥 Hot Module Replacement - تحديث فوري
- 📦 ES Modules - JavaScript حديث

---

## 🛠️ الأوامر المتاحة

```bash
npm run dev      # تشغيل Development
npm run build    # بناء للإنتاج
npm run preview  # معاينة النسخة المبنية
```

---

## 📝 ملاحظات

- **التصميم**: نفس التصميم المحسّن من النسخة الأصلية
- **المزايا**: جميع المزايا متوفرة (Favorites, Compare, Theme Toggle)
- **API**: Open-Meteo (مجاني بدون API key)

---

**استمتع بتطبيق الطقس مع React!** 🎉


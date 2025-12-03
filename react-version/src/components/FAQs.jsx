import { useState } from 'react'

const faqs = [
  {
    question: 'How does the weather app detect my location?',
    answer: "The app uses your browser's Geolocation API to detect your current location."
  },
  {
    question: 'How do I save favorite locations?',
    answer: 'After searching for a location, you can add it to favorites by clicking the star icon.'
  },
  {
    question: 'Can I compare weather between two locations?',
    answer: 'Yes! Click the compare icon (⚖) in the header to compare two locations side-by-side.'
  },
  {
    question: 'What weather data is available?',
    answer: 'The app shows temperature, humidity, wind speed, precipitation, 7-day forecasts, and hourly forecasts.'
  }
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="faqs-section">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              aria-expanded={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span className="faq-icon">+</span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'active' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


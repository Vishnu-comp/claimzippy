import React, { useState } from 'react';
import axios from 'axios';

const AQI = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '699cab3ee3eb1f353d0a18c0b5c96c9e7d77425f';

  const getAQIIcon = (aqi) => {
    if (aqi <= 50) return '🟢'; // Good (green)
    if (aqi <= 100) return '🟡'; // Moderate (yellow)
    if (aqi <= 150) return '🟠'; // Unhealthy for sensitive (orange)
    if (aqi <= 200) return '🔴'; // Unhealthy (red)
    if (aqi <= 300) return '🟣'; // Very unhealthy (purple)
    return '⚫'; // Hazardous (black)
  };

  const handleSearch = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(
        `https://api.waqi.info/feed/${city}/?token=${API_KEY}`
      );
      if (response.data.status === 'ok') {
        const data = response.data.data;
        setResult({
          aqi: data.aqi,
          city: data.city.name,
          time: data.time.s,
        });
      } else {
        setError('City not found or API error. Please try again.');
      }
    } catch (err) {
      setError('Unable to fetch data. Please check the city name or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="aqi-section">
      <h2>Air Quality Index (AQI)</h2>
      <div className="aqi-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Check Air Quality'}
        </button>
        <br/>
      </div>
      {error && <p style={{ color: 'red', marginTop: '1em' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '1em' }}>
          <p><strong>City:</strong> {result.city}</p>
          <p><strong>AQI:</strong> {result.aqi} {getAQIIcon(result.aqi)}</p>
          <p><strong>Last Updated:</strong> {result.time}</p>
          <br/>
        </div>
        
      )}
    </section>
    
  );
};

export default AQI;

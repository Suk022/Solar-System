import React, { useState, useEffect } from 'react';

const trackerButtonStyle = {
  background: 'rgba(40, 37, 37, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#fff',
  padding: '0.6rem 1.5rem',
  borderRadius: '20px',
  cursor: 'pointer',
  fontFamily: "'Arial', sans-serif",
  fontSize: '.6rem',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  width: '120px', 
  textAlign: 'center',
  marginBottom: '0.5rem',
};

const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 2000,
};

const modalContentStyle = {
    background: 'rgba(28, 28, 30, 0.98)', padding: '2rem', borderRadius: '12px',
    width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
    position: 'relative', border: '1px solid #444', color: '#fff',
};

const closeButtonStyle = {
    position: 'absolute', top: '1rem', right: '1rem', background: 'none',
    border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer',
};

const asteroidItemStyle = {
    padding: '1rem',
    borderBottom: '1px solid #444',
};


const AsteroidTracker = ({ isSidebarOpen, onOpen, onClose: onCloseCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const fetchAsteroids = async () => {
    if (asteroids.length > 0) return;
    setLoading(true);
    const today = getTodayDate();
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch asteroid data');
      const data = await response.json();
      setAsteroids(data.near_earth_objects[today] || []);
    } catch (error) {
      console.error("Error fetching asteroids:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen && onOpen();
    fetchAsteroids();
  };

  const handleClose = () => {
    setIsOpen(false);
    onCloseCallback && onCloseCallback();
  };

  const containerStyle = {
    opacity: isSidebarOpen ? 0 : 1,
    visibility: isSidebarOpen ? 'hidden' : 'visible',
    transition: 'all 0.3s ease',
    pointerEvents: isSidebarOpen ? 'none' : 'auto',
  };

  return (
    <div style={containerStyle}>
      <button
        style={trackerButtonStyle}
        onClick={handleOpen}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = ' rgba(30, 28, 28, 0.2)'}
        title="Track asteroids near Earth today"
      >
        ASTEROID TRACKER
      </button>
      {isOpen && (
        <div style={modalOverlayStyle} onClick={handleClose}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={handleClose}>×</button>
            <h2 style={{ marginBottom: '1rem' }}>Near-Earth Asteroids for {getTodayDate()}</h2>
            {loading && <p>Loading asteroid data...</p>}
            {!loading && asteroids.length > 0 ? (
              <div>
                {asteroids.map(asteroid => (
                  <div key={asteroid.id} style={asteroidItemStyle}>
                    <h3 style={{ color: '#4ecdc4' }}>{asteroid.name}</h3>
                    <p>Estimated Diameter: {Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)} meters</p>
                    <p>Closest Approach: {asteroid.close_approach_data[0].close_approach_date_full.split(' ')[1]} UT</p>
                    <p>Miss Distance: {Math.round(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
                    <p style={{ color: asteroid.is_potentially_hazardous_asteroid ? '#ff6b6b' : '#fff' }}>
                      Potentially Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                    </p>
                  </div>
                ))}
              </div>
            ) : !loading && <p>No asteroid data available for today.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsteroidTracker; 
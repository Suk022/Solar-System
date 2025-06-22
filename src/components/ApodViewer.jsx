import React, { useState, useEffect } from 'react';

const getApodButtonStyle = (isSidebarOpen) => ({
  position: 'relative',
  background: 'rgba(40, 37, 37, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#fff',
  padding: '0.6rem 1.5rem',
  borderRadius: '20px',
  cursor: 'pointer',
  fontFamily: "'Arial', sans-serif",
  fontSize: '.7rem',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  width: '90px',
  textAlign: 'center',
  opacity: isSidebarOpen ? 0 : 1,
  visibility: isSidebarOpen ? 'hidden' : 'visible',
  pointerEvents: isSidebarOpen ? 'none' : 'auto',
});

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const modalContentStyle = {
  background: 'rgba(28, 28, 30, 0.98)',
  padding: '2rem',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  border: '1px solid #444',
  color: '#fff',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '2rem',
  cursor: 'pointer',
};

const mediaStyle = {
  width: '100%',
  maxHeight: '500px',
  objectFit: 'contain',
  borderRadius: '8px',
  marginBottom: '1rem',
};

const ApodViewer = ({ isSidebarOpen, onOpen, onClose: onCloseCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  const fetchApod = async () => {
    if (apodData) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch APOD data');
      const data = await response.json();
      setApodData(data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
      setApodData(null); 
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen && onOpen();
    fetchApod();
  };

  const handleClose = () => {
    setIsOpen(false);
    onCloseCallback && onCloseCallback();
  };

  return (
    <>
      <button
        style={getApodButtonStyle(isSidebarOpen)}
        onClick={handleOpen}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(40, 37, 37, 0.1)'}
        title="Click to view today's APOD from NASA"
      >
        APOD
      </button>
      {isOpen && (
        <div style={modalOverlayStyle} onClick={handleClose}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={handleClose}>×</button>
            {loading && <p>Loading Picture of the Day...</p>}
            {!loading && apodData && (
              <>
                <h2 style={{ marginBottom: '1rem' }}>{apodData.title}</h2>
                {apodData.media_type === 'image' ? (
                  <img src={apodData.hdurl || apodData.url} alt={apodData.title} style={mediaStyle} />
                ) : (
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    frameBorder="0"
                    allow="fullscreen"
                    style={{ ...mediaStyle, height: '500px' }}
                  ></iframe>
                )}
                <p style={{ lineHeight: '1.6' }}>{apodData.explanation}</p>
              </>
            )}
            {!loading && !apodData && <p>Could not load the Picture of the Day. Please try again later.</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ApodViewer; 
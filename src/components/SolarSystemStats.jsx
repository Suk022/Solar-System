import React, { useState } from 'react';

const buttonStyle = {
  position: 'fixed',
  top: '3rem',
  left: '.6rem',
  zIndex: 1003,
  background: 'transparent',
  border: 'none',
  borderRadius: '8px',
  padding: '0.75rem 1.5rem',
  color: '#fff',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease-in-out',
};

const menuContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: '350px',
  backgroundColor: 'transparent',
  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#fff',
  transform: 'translateX(-100%)',
  transition: 'transform 0.3s ease-in-out',
  overflowY: 'auto',
  zIndex: 1002,
  backdropFilter: 'blur(10px)',
};

const openMenuStyle = {
  ...menuContainerStyle,
  transform: 'translateX(0)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(68, 160, 141, 0.1))',
};

const titleStyle = {
  fontSize: '1.4rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: 0,
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#4ecdc4',
  cursor: 'pointer',
  fontSize: '1.2rem',
  padding: '0.5rem',
  borderRadius: '50%',
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s',
};

const sectionStyle = {
  margin: '1rem',
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
};

const sectionTitleStyle = {
  fontSize: '1rem',
  color: '#4ecdc4',
  marginBottom: '1rem',
  fontWeight: 'bold',
  borderBottom: '2px solid rgba(78, 205, 196, 0.3)',
  paddingBottom: '0.5rem',
};

const statItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  fontSize: '0.8rem',
};

const statLabelStyle = {
  color: '#ccc',
  fontWeight: '500',
};

const statValueStyle = {
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'right',
  fontSize: '0.8rem',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1001,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease-in-out',
};

const overlayVisibleStyle = {
  ...overlayStyle,
  opacity: 1,
  visibility: 'visible',
};

const SolarSystemStats = ({ isSidebarOpen, isAnyInfoComponentOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuStyle = isMenuOpen ? openMenuStyle : menuContainerStyle;
  const overlayStyleFinal = isMenuOpen ? overlayVisibleStyle : overlayStyle;

  // Hide button when sidebar or any features componenet is open
  const shouldHideButton = isSidebarOpen || isAnyInfoComponentOpen;

  return (
    <>
      <button 
        onClick={toggleMenu}
        style={{
          ...buttonStyle,
          display: (isMenuOpen || shouldHideButton) ? 'none' : 'block'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        Cosmic Overview
      </button>

      <div style={overlayStyleFinal} onClick={closeMenu} />
      
      <div style={menuStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Cosmic Overview</h2>
          <button 
            onClick={closeMenu}
            style={closeButtonStyle}
            title="Close menu"
          >
            ×
          </button>
        </div>

        {/* Our Solar System Stats */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Our Solar System</h3>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Planets</span>
            <span style={statValueStyle}>8</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Confirmed Moons</span>
            <span style={statValueStyle}>290+</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Star</span>
            <span style={statValueStyle}>1 (The Sun)</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Dwarf Planets</span>
            <span style={statValueStyle}>5 (Pluto, Eris, etc.)</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Known Asteroids</span>
            <span style={statValueStyle}>1,330,000+</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Known Comets</span>
            <span style={statValueStyle}>5,400+</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Active Spacecraft</span>
            <span style={statValueStyle}>24 beyond Earth</span>
          </div>
        </div>

        {/* Milky Way Galaxy Stats */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Milky Way Galaxy</h3>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Stars</span>
            <span style={statValueStyle}>100–400 billion</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Planets</span>
            <span style={statValueStyle}>100+ billion</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Earth-like Planets</span>
            <span style={statValueStyle}>~40 billion</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Diameter</span>
            <span style={statValueStyle}>100,000 light-years</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Our Location</span>
            <span style={statValueStyle}>~27,000 ly from center</span>
          </div>
        </div>

        {/* Universe-Wide Stats */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>The Universe</h3>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Galaxies</span>
            <span style={statValueStyle}>~2 trillion</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Total Stars</span>
            <span style={statValueStyle}>1×10²⁴</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Age</span>
            <span style={statValueStyle}>13.8 billion years</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Expansion Rate</span>
            <span style={statValueStyle}>~73 km/s/Mpc</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarSystemStats; 
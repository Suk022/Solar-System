import React, { useState } from "react";
import SolarSystem3D from "../components/SolarSystem3D";
import Sidebar from "../components/Sidebar";
import HelpButton from "../components/HelpButton";
import ApodViewer from "../components/ApodViewer";
import AsteroidTracker from "../components/AsteroidTracker";
import RandomSpaceFact from "../components/RandomSpaceFact";
import SolarSystemStats from "../components/SolarSystemStats";
import '../styles.css';

const infoButtonsContainerStyle = {
  position: 'fixed',
  bottom: '1.5rem',
  right: '1.5rem',
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

const Home = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnyInfoComponentOpen, setIsAnyInfoComponentOpen] = useState(false);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    // Optional: delay clearing the selected planet until after animation
    setTimeout(() => setSelectedPlanet(null), 300);
  };

  const handleInfoComponentOpen = () => {
    setIsAnyInfoComponentOpen(true);
  };

  const handleInfoComponentClose = () => {
    setIsAnyInfoComponentOpen(false);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Explore Our Solar System</h1>
      </div>
      <div className="solar-system-container" style={{
        transform: isSidebarOpen ? 'translateX(-200px) scale(0.85)' : 'none',
        transition: 'transform 0.3s ease-in-out',
      }}>
        <SolarSystem3D 
          onPlanetClick={handlePlanetClick}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
      <Sidebar 
        planet={selectedPlanet} 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar}
      />
      <SolarSystemStats 
        isSidebarOpen={isSidebarOpen} 
        isAnyInfoComponentOpen={isAnyInfoComponentOpen}
      />
      <HelpButton />
      <div style={infoButtonsContainerStyle}>
        <AsteroidTracker 
          isSidebarOpen={isSidebarOpen} 
          onOpen={handleInfoComponentOpen}
          onClose={handleInfoComponentClose}
        />
        <RandomSpaceFact 
          isSidebarOpen={isSidebarOpen} 
          onOpen={handleInfoComponentOpen}
          onClose={handleInfoComponentClose}
        />
        <ApodViewer 
          isSidebarOpen={isSidebarOpen} 
          onOpen={handleInfoComponentOpen}
          onClose={handleInfoComponentClose}
        />
      </div>
    </div>
  );
};

export default Home; 
import React, { useState, useEffect } from 'react';
import roboIcon from './../../../assets/Images/robo.png'; // Make sure this path is correct
import MediBot from './MediBot';

function Bot() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);

  const handleChatClick = () => {
    if (!isDragging) {
      setChatbotOpen(prevState => !prevState);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 50, // 50 is half the width of the icon
        y: e.clientY - 50  // 50 is half the height of the icon
      });
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{
      position: 'fixed',
      bottom: `${position.y}px`,
      right: `${position.x}px`,
      zIndex: 1000,
    }}>
      <div
        onClick={handleChatClick}
        onMouseDown={handleMouseDown}
        style={{
          width: '100px',
          height: '100px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src={roboIcon} 
          alt="Chat Icon" 
          style={{
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
          }} 
        />
      </div>
      {chatbotOpen && <MediBot onClose={() => setChatbotOpen(false)} />}
    </div>
  );
}

export default Bot;

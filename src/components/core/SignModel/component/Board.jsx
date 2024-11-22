import React, { useState, useRef } from 'react';
import Whiteboard from '../component/Whiteboard';
import '../component/board.css'

const Board = () => {
    const [selectedCategory, setSelectedCategory] = useState('common');
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const whiteboardRef = useRef(null);
  
    const signCategories = {
      common: [
        { id: 1, symbol: '👋', description: 'Hello' },
        { id: 2, symbol: '🙏', description: 'Please' },
        { id: 3, symbol: '👍', description: 'Yes/Good' },
        { id: 4, symbol: '👎', description: 'No/Bad' },
        { id: 5, symbol: '🙌', description: 'Hooray' },
      ],
      emotions: [
        { id: 6, symbol: '😊', description: 'Happy' },
        { id: 7, symbol: '😢', description: 'Sad' },
        { id: 8, symbol: '😠', description: 'Angry' },
        { id: 9, symbol: '😮', description: 'Surprised' },
        { id: 10, symbol: '😕', description: 'Confused' },
      ],
      animals: [
        { id: 11, symbol: '🐶', description: 'Dog' },
        { id: 12, symbol: '🐱', description: 'Cat' },
        { id: 13, symbol: '🐵', description: 'Monkey' },
        { id: 14, symbol: '🐘', description: 'Elephant' },
        { id: 15, symbol: '🦁', description: 'Lion' },
      ],
    };
  
    const handleSymbolClick = (symbol) => {
      setSelectedSymbol(symbol);
      if (whiteboardRef.current) {
        whiteboardRef.current.addSymbol(symbol);
      }
    };
  
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Fun Sign Language Whiteboard</h1>
        </header>
        <main className="main-content">
          <aside className="symbol-sidebar">
            <div className="category-buttons">
              {Object.keys(signCategories).map((category) => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`} // Fixed className syntax
              >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <div className="symbol-grid">
              {signCategories[selectedCategory].map((sign) => (
                <button
                key={sign.id}
                onClick={() => handleSymbolClick(sign.symbol)}
                className={`symbol-button ${selectedSymbol === sign.symbol ? 'selected' : ''}`} // Fixed className syntax
                title={sign.description}
              >
                  {sign.symbol}
                </button>
              ))}
            </div>
          </aside>
          <div className="whiteboard-container">
            <Whiteboard ref={whiteboardRef} />
          </div>
        </main>
      </div>
    );
  };
  

export default Board

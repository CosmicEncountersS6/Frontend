import React, { useState } from 'react';
// Removed react-router-dom imports
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// Removed placeholder page imports
// import AnimationDemo from './components/AnimationDemo';
// import DifficultyPage from './components/DifficultyPage';
import AlienSelector from './components/AlienSelector';

const App: React.FC = () => {
    return (
        // Removed Router, Routes, and Route
        <div style={{ 
            backgroundColor: '#1a1a1a',
            minHeight: '100vh',
            color: 'white'
        }}>
            {/* Render AlienSelector component */}
            <AlienSelector />
        </div>
    );
};

export default App; 
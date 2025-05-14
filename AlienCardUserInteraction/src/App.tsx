import React from 'react';
import { AnimationDemo } from './components/AnimationDemo';

const App: React.FC = () => {
    return (
        <div style={{ 
            backgroundColor: '#1a1a1a',
            minHeight: '100vh',
            color: '#333'
        }}>
            <AnimationDemo />
        </div>
    );
};

export default App; 
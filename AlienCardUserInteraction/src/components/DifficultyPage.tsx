import React, { useState } from 'react';
import { DeckExplosion } from './DeckExplosion';
import { Card } from '../types/Card';

interface DifficultyPageProps {
    onGenerateAliens: (difficulty: { easy: number, medium: number, hard: number }) => void;
    onAnimationComplete: (aliens: Card[]) => void; // Callback to transition to the next page
}

const DifficultyPage: React.FC<DifficultyPageProps> = ({ onGenerateAliens, onAnimationComplete }) => {
    const [difficulty, setDifficulty] = useState({ easy: 1, medium: 1, hard: 1 });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAliens, setGeneratedAliens] = useState<Card[]>([]); // State to hold generated aliens

    const handleInputChange = (level: 'easy' | 'medium' | 'hard', value: number) => {
        setDifficulty(prev => ({ ...prev, [level]: Math.max(0, value) }));
    };

    const handleIncrement = (level: 'easy' | 'medium' | 'hard') => {
        setDifficulty(prev => ({ ...prev, [level]: prev[level] + 1 }));
    };

    const handleDecrement = (level: 'easy' | 'medium' | 'hard') => {
        setDifficulty(prev => ({ ...prev, [level]: Math.max(0, prev[level] - 1) }));
    };

    const handleGenerateClick = async () => {
        setIsGenerating(true);
        // Call the onGenerateAliens prop to get the alien data
        // This is a placeholder - actual alien generation logic will be handled elsewhere
        const generated = [
            { id: '1', name: 'Pacifist', imageUrl: '/images/pacifist.jpg', description: 'Description 1' },
            { id: '2', name: 'Ace', imageUrl: '/images/ace.jpg', description: 'Description 2' },
            { id: '3', name: 'Alien', imageUrl: '/images/alien.jpg', description: 'Description 3' },
        ]; // Replace with actual generated aliens
        setGeneratedAliens(generated);
        onGenerateAliens(difficulty);
    };

    const handleAnimationComplete = () => {
        onAnimationComplete(generatedAliens);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ margin: '20px auto', fontSize: '4em', textShadow: '2px 2px 4px #000' }}>Cosmic Encounter</h1> {/* Placeholder for title image */}

            {!isGenerating ? (
                <div style={{ margin: '40px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <h2>Difficulty</h2>
                    {['easy', 'medium', 'hard'].map((level) => (
                        <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Placeholder for star icons - replace with actual icons */}
                            <span style={{ fontSize: '2em' }}>
                                {level === 'easy' && '⭐️'}
                                {level === 'medium' && '⭐'}
                                {level === 'hard' && '🌟'}
                            </span>
                            <button onClick={() => handleDecrement(level as 'easy' | 'medium' | 'hard')} style={{ padding: '5px', fontSize: '1.2em' }}>-</button>
                            <input
                                type="number"
                                value={difficulty[level as 'easy' | 'medium' | 'hard']}
                                onChange={(e) => handleInputChange(level as 'easy' | 'medium' | 'hard', parseInt(e.target.value))}
                                style={{ width: '50px', textAlign: 'center', padding: '5px' }}
                            />
                            <button onClick={() => handleIncrement(level as 'easy' | 'medium' | 'hard')} style={{ padding: '5px', fontSize: '1.2em' }}>+</button>
                        </div>
                    ))}
                </div>
            ) : (
                // Render DeckExplosion when generating is true
                <DeckExplosion cards={generatedAliens} onAnimationComplete={handleAnimationComplete} />
            )}

            {!isGenerating && (
                <button 
                    onClick={handleGenerateClick}
                    style={{ padding: '10px 30px', fontSize: '1.2em', backgroundColor: '#6a4c93', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
                >
                    Generate aliens
                </button>
            )}

            {/* Placeholder for bottom navigation */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-home"></i></button>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-space-shuttle"></i></button>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-user"></i></button>
            </div>
        </div>
    );
};

export default DifficultyPage; 
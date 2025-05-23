import React, { useState } from 'react';
import { RandomizerAliens } from '../API/AlienAPI';
import InfoCard from './AlienCard';
import { Alien } from '../API/AlienAPI';
import { DeckExplosion } from '../../AlienCardUserInteraction/src/components/DeckExplosion';
import { Card } from '../../AlienCardUserInteraction/src/types/Card'; // Assuming Card type is here

const NumberGenerator: React.FC = () => {
    const [easy, setEasy] = useState<number>(0);
    const [medium, setMedium] = useState<number>(0);
    const [hard, setHard] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [generatedAliens, setGeneratedAliens] = useState<Alien[] | undefined>(undefined);

    const generateNumbers = async () => {
        setIsAnimating(true);
        SetAlienList(undefined) // Clear previous list while animating
        const res = await RandomizerAliens(easy, medium, hard);
        setGeneratedAliens(res); // Store generated aliens
        // The animation complete handler will set isAnimating to false and display results
    };

    const handleAnimationComplete = () => {
        setIsAnimating(false);
        // The generated aliens are now in the generatedAliens state
    };

    // Convert Alien[] to Card[] for DeckExplosion
    const cardsForAnimation: Card[] = generatedAliens ? generatedAliens.map(alien => ({
        id: alien.id.toString(), // Assuming id needs to be string for Card type
        name: alien.name,
        imageUrl: alien.image,
        description: alien.description
    })) : [];

    return (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Alien Generator</h1>

            {!isAnimating && generatedAliens === undefined && (
                <div style={{ marginBottom: '20px' }}>
                    <div>
                        <label htmlFor="box1" style={{ marginRight: '10px' }}>Easy:</label>
                        <input
                            id="box1"
                            type="number"
                            value={easy}
                            onChange={(e) => setEasy(Number(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            style={{ width: '50px', margin: '0 10px', padding: '5px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="box2" style={{ marginRight: '10px' }}>Medium:</label>
                        <input
                            id="box2"
                            type="number"
                            value={medium}
                            onChange={(e) => setMedium(Number(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            style={{ width: '50px', margin: '0 10px', padding: '5px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="box3" style={{ marginRight: '10px' }}>Hard:</label>
                        <input
                            id="box3"
                            type="number"
                            value={hard}
                            onChange={(e) => setHard(Number(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            style={{ width: '50px', margin: '0 10px', padding: '5px' }}
                        />
                    </div>
                </div>
            )}

            {!isAnimating && generatedAliens === undefined && (
                <button
                    onClick={generateNumbers}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                >
                    Generate
                </button>
            )}

            {isAnimating && (
                <DeckExplosion cards={cardsForAnimation} onAnimationComplete={handleAnimationComplete} />
            )}

            {!isAnimating && generatedAliens !== undefined && (
                <div>
                    <h2>Generated Aliens</h2>
                    {generatedAliens.map((alien: Alien) => {
                        return (
                            <InfoCard key={alien.id} name={alien.name} imageUrl={alien.image} description={alien.description} />
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default NumberGenerator;

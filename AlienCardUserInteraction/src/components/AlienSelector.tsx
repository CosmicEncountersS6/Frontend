import React, { useState, useEffect } from 'react';
import { RandomizerAliens, GetAllAliens } from '../api/AlienAPI';
import InfoCard from './AlienCard';
import { Alien } from '../api/AlienAPI';
import { DeckExplosion } from './DeckExplosion';
import { Card } from '../types/Card'; // Assuming Card type is here

const NumberGenerator: React.FC = () => {
    const [easy, setEasy] = useState<number>(0);
    const [medium, setMedium] = useState<number>(0);
    const [hard, setHard] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [generatedAliens, setGeneratedAliens] = useState<Alien[] | undefined>(undefined);
    const [showAllAliens, setShowAllAliens] = useState(false); // New state to toggle the "all aliens" page
    const [allAliens, setAllAliens] = useState<Alien[]>([]); // New state to hold aliens fetched from the API
    const [expandedAlienId, setExpandedAlienId] = useState<number | null>(null); // New state to track which alien's info is expanded (for "all aliens" view)
    const [expandedGeneratedAlienId, setExpandedGeneratedAlienId] = useState<number | null>(null); // New state to track which alien's info is expanded (for "generated aliens" view)

    console.log('isAnimating:', isAnimating);
    console.log('generatedAliens:', generatedAliens);

    // Fetch all aliens from the API (using the new GetAllAliens function) on component mount
    useEffect(() => {
        const fetchAllAliens = async () => {
            const aliens = await GetAllAliens(); // Use the new GetAllAliens function
            setAllAliens(aliens);
        };
        fetchAllAliens();
    }, []);

    const generateNumbers = async () => {
        console.log('Generating numbers...');
        setIsAnimating(true);
        const res = await RandomizerAliens(easy, medium, hard);
        console.log('API Response:', res);
        setGeneratedAliens(res); // Store generated aliens
        // The animation complete handler will set isAnimating to false and display results
    };

    const handleAnimationComplete = () => {
        console.log('Animation complete!');
        setIsAnimating(false);
        // The generated aliens are now in the generatedAliens state
    };

    const handleBackClick = () => {
        console.log('Back button clicked.');
        setGeneratedAliens(undefined); // Reset generated aliens to show difficulty options
        setIsAnimating(false); // Ensure animation state is false
    };

    const handleRocketClick = () => {
        console.log('Rocket button clicked, toggling "all aliens" view.');
        setShowAllAliens(true); // Toggle "all aliens" view (or you can fetch a list of aliens here if needed)
    };

    const handleInfoClick = (alienId: number) => {
        if (expandedAlienId === alienId) {
            setExpandedAlienId(null); // collapse if already expanded
        } else {
            setExpandedAlienId(alienId); // expand the alien's info
        }
    };

    const handleGeneratedInfoClick = (alienId: number) => {
        if (expandedGeneratedAlienId === alienId) {
            setExpandedGeneratedAlienId(null); // collapse if already expanded
        } else {
            setExpandedGeneratedAlienId(alienId); // expand the alien's info
        }
    };

    const handleBackFromAllAliens = () => {
        console.log('Back button (from "all aliens") clicked.');
        setShowAllAliens(false); // Toggle "all aliens" view off (i.e. go back to the previous view)
    };

    // Convert Alien[] to Card[] for DeckExplosion
    const cardsForAnimation: Card[] = generatedAliens ? generatedAliens.map(alien => ({
        id: alien.id.toString(), // Assuming id needs to be string for Card type
        name: alien.name,
        imageUrl: alien.image,
        description: alien.description
    })) : [];

    const difficultyLevels = [
        { level: 'easy', state: easy, setter: setEasy, color: '#8BC34A' }, // Green
        { level: 'medium', state: medium, setter: setMedium, color: '#FFC107' }, // Amber
        { level: 'hard', state: hard, setter: setHard, color: '#F44336' }, // Red
    ];

    // Render "all aliens" view (a list of aliens fetched from the API) if showAllAliens is true
    if (showAllAliens) {
        return (
            <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
                <h1 style={{ margin: '20px auto', fontSize: '4em', textShadow: '2px 2px 4px #000' }}>Cosmic Encounter – All Aliens</h1>
                <h2>All Aliens (in a row)</h2>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '40px auto' }}>
                    {allAliens.map((alien: Alien) => (
                        <div key={alien.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <button onClick={() => handleInfoClick(alien.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' }}>
                                <i className="fas fa-info-circle"></i> {/* Info icon */}
                            </button>
                            {expandedAlienId === alien.id ? (
                                <InfoCard name={alien.name} imageUrl={alien.image} description={alien.description} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <img src={alien.image} alt={alien.name} style={{ width: '100px', height: 'auto' }} />
                                    <span style={{ fontSize: '1.5em' }}>{alien.name}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Bottom navigation (with Back (left), Rocket (middle), and User (right) buttons) */}
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Back button (leftmost) */}
                    <button onClick={handleBackFromAllAliens} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-arrow-left"></i></button>
                    {/* Rocket button (middle) */}
                    <button onClick={handleRocketClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-space-shuttle"></i></button>
                    {/* User button (right) */}
                    <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-user"></i></button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ margin: '20px auto', fontSize: '4em', textShadow: '2px 2px 4px #000' }}>Cosmic Encounter</h1> {/* Placeholder for title image */}

            {!isAnimating && generatedAliens === undefined && (
                <div style={{ margin: '40px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <h2>Difficulty</h2>
                    {difficultyLevels.map(({ level, state, setter, color }) => (
                        <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: color, fontSize: '2em' }}>
                                &#9733; {/* Star icon */}
                            </span>
                            <button onClick={() => setter(Math.max(0, state - 1))} style={{ padding: '5px', fontSize: '1.2em' }}>-</button>
                            <input
                                type="number"
                                value={state}
                                onChange={(e) => setter(Number(e.target.value) || 0)}
                                placeholder="0"
                                min="0"
                                style={{ width: '50px', textAlign: 'center', padding: '5px', color: '#333' }}
                            />
                            <button onClick={() => setter(state + 1)} style={{ padding: '5px', fontSize: '1.2em' }}>+</button>
                        </div>
                    ))}
                </div>
            )}

            {!isAnimating && generatedAliens === undefined && (
                <button
                    onClick={generateNumbers}
                    style={{ padding: '10px 30px', fontSize: '1.2em', backgroundColor: '#6a4c93', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
                >
                    Generate aliens
                </button>
            )}

            {isAnimating && (
                <DeckExplosion cards={cardsForAnimation} onAnimationComplete={handleAnimationComplete} />
            )}

            {!isAnimating && generatedAliens !== undefined && (
                <div>
                    <h2>Generated Aliens</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', margin: '40px auto' }}>
                        {generatedAliens.map((alien: Alien) => {
                            return (
                                <div key={alien.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <button onClick={() => handleGeneratedInfoClick(alien.id)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' }}>
                                        <i className="fas fa-info-circle"></i> {/* Info icon */}
                                    </button>
                                    {expandedGeneratedAlienId === alien.id ? (
                                        <InfoCard name={alien.name} imageUrl={alien.image} description={alien.description} />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <img src={alien.image} alt={alien.name} style={{ width: '100px', height: 'auto' }} />
                                            <span style={{ fontSize: '1.5em' }}>{alien.name}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Bottom navigation (with Back (left), Rocket (middle), and User (right) buttons) */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Back button (leftmost) (if generated aliens are shown) or Home button (leftmost) (otherwise) */}
                {!isAnimating && generatedAliens !== undefined ? (
                    <button onClick={handleBackClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-arrow-left"></i></button>
                ) : (
                    <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-home"></i></button>
                )}
                {/* Rocket button (middle) */}
                <button onClick={handleRocketClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-space-shuttle"></i></button>
                {/* User button (right) */}
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-user"></i></button>
            </div>

        </div>
    );
};

export default NumberGenerator;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../types/Card';
import { ClassicFlipCard } from './ClassicFlipCard';
import { SwipeCard } from './SwipeCard';
import { DeckExplosion } from './DeckExplosion';
import { SimpleAppearance } from './SimpleAppearance';

// Sample card data
const sampleCards: Card[] = [
    {
        id: '1',
        name: 'Clone',
        imageUrl: '/images/Clone.png',
        description: 'A synthetic humanoid, indistinguishable from humans but programmed to follow strict protocols.'
    },
    {
        id: '2',
        name: 'Gambler',
        imageUrl: '/images/Gambler.webp',
        description: 'A risk-taker who plays the odds in the dangerous corridors of Sevastopol Station.'
    },
    {
        id: '3',
        name: 'Remora',
        imageUrl: '/images/Remora.jfif',
        description: 'A parasitic creature that attaches itself to larger hosts, waiting for the perfect moment to strike.'
    }
];

type AnimationType = 'classic' | 'swipe' | 'explosion' | 'simple';

export const AnimationDemo: React.FC = () => {
    const navigate = useNavigate();
    const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('classic');
    const [key, setKey] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [drawnCards, setDrawnCards] = useState<Card[]>([]);

    const handleAnimationChange = (type: AnimationType) => {
        setSelectedAnimation(type);
        setKey(prev => prev + 1);
        setCurrentCardIndex(0);
        setDrawnCards([]);
    };

    const handleCardDrawn = (card: Card) => {
        setDrawnCards(prev => [...prev, card]);
        setCurrentCardIndex(prev => prev + 1);
    };

    const renderAnimation = () => {
        const currentCard = sampleCards[currentCardIndex];
        const isComplete = currentCardIndex >= sampleCards.length;

        switch (selectedAnimation) {
            case 'classic':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                        {!isComplete ? (
                            <ClassicFlipCard 
                                card={currentCard}
                                onFlipComplete={() => handleCardDrawn(currentCard)}
                            />
                        ) : (
                            <div style={{ color: '#333', fontSize: '1.2em' }}>All cards revealed!</div>
                        )}
                    </div>
                );
            case 'swipe':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                        {!isComplete ? (
                            <SwipeCard
                                card={currentCard}
                                onSwipe={(direction) => {
                                    console.log(`Swiped ${direction}`);
                                    handleCardDrawn(currentCard);
                                }}
                            />
                        ) : (
                            <div style={{ color: '#333', fontSize: '1.2em' }}>All cards revealed!</div>
                        )}
                    </div>
                );
            case 'explosion':
                return (
                    <div style={{ height: '600px' }}>
                        <DeckExplosion
                            cards={sampleCards}
                            onAnimationComplete={() => {
                                setDrawnCards(sampleCards);
                                setCurrentCardIndex(sampleCards.length);
                            }}
                        />
                    </div>
                );
            case 'simple':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                        {!isComplete ? (
                            <SimpleAppearance
                                card={currentCard}
                                onFlip={() => handleCardDrawn(currentCard)}
                            />
                        ) : (
                            <div style={{ color: '#333', fontSize: '1.2em' }}>All cards revealed!</div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="card-container" style={{ position: 'relative' }}>
            <div className="responsive-container" style={{ position: 'relative', paddingTop: '60px' }}>
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate('/')}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'white',
                        background: '#3a3a3a',
                        border: '2px solid #4a4a4a',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        zIndex: 1000,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                    whileHover={{ 
                        scale: 1.05, 
                        background: '#4a4a4a',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    ← Back to Difficulty
                </motion.button>

                {/* Title */}
                <h1 style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 'clamp(20px, 5vw, 32px)',
                    marginBottom: 'clamp(8px, 2vw, 16px)',
                    padding: '0 var(--spacing-unit)',
                    marginTop: 'calc(var(--spacing-unit) * 2)'
                }}>
                    Alien Card Interaction Demo
                </h1>

                {/* Buttons */}
                <div className="responsive-flex" style={{ marginBottom: 'var(--spacing-unit)' }}>
                    <button onClick={() => handleAnimationChange('classic')} style={{
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'classic' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: '120px'
                    }}>
                        Classic Flip
                    </button>
                    <button onClick={() => handleAnimationChange('swipe')} style={{
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'swipe' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: '120px'
                    }}>
                        Swipe Draw
                    </button>
                    <button onClick={() => handleAnimationChange('explosion')} style={{
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'explosion' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: '120px'
                    }}>
                        Deck Explosion
                    </button>
                    <button onClick={() => handleAnimationChange('simple')} style={{
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'simple' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: '120px'
                    }}>
                        Simple Appearance
                    </button>
                </div>

                {/* Revealed Cards Section */}
                <div style={{ 
                    marginBottom: 'var(--spacing-unit)',
                    padding: '0 calc(var(--spacing-unit) / 2)'
                }}>
                    <h2 style={{
                        color: 'white',
                        fontSize: 'clamp(16px, 4vw, 24px)',
                        marginBottom: 'calc(var(--spacing-unit) / 2)',
                        textAlign: 'center'
                    }}>
                        Revealed Cards
                    </h2>
                    <div style={{
                        maxHeight: 'min(200px, 40vh)',
                        overflowY: 'auto',
                        padding: 'calc(var(--spacing-unit) / 2)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#666 #333'
                    }}>
                        <div className="responsive-grid">
                            {drawnCards.map((card, index) => (
                                <div key={index} style={{ position: 'relative' }}>
                                    <img
                                        src={card.imageUrl}
                                        alt={`Revealed card ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            aspectRatio: '1/1.4',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Animation Box */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 'min(400px, 70vh)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-unit)',
                    padding: 'var(--spacing-unit)'
                }}>
                    {renderAnimation()}
                </div>

                {/* Instructions */}
                <div style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    opacity: 0.8,
                    padding: '0 var(--spacing-unit)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    {selectedAnimation === 'swipe' && 'Swipe the card left or right to reveal a new card'}
                    {selectedAnimation === 'classic' && 'Click the card to flip it and reveal the other side'}
                    {selectedAnimation === 'simple' && 'Watch the card appear with a simple animation'}
                </div>
            </div>
        </div>
    );
};

export default AnimationDemo; 
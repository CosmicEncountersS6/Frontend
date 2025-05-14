import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
                        {drawnCards.length > 0 && (
                            <div style={{
                                width: '100%',
                                padding: '20px',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '10px'
                            }}>
                                <h3 style={{ color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                                    Revealed Cards
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    gap: '15px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {drawnCards.map((card, index) => (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{
                                                width: '150px',
                                                height: '210px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            <img
                                                src={card.imageUrl}
                                                alt={card.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: '8px',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                                color: 'white'
                                            }}>
                                                <div style={{ fontSize: '0.8em', fontWeight: 600 }}>
                                                    {card.name}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
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
                        {drawnCards.length > 0 && (
                            <div style={{
                                width: '100%',
                                padding: '20px',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '10px'
                            }}>
                                <h3 style={{ color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                                    Revealed Cards
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    gap: '15px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {drawnCards.map((card, index) => (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{
                                                width: '150px',
                                                height: '210px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            <img
                                                src={card.imageUrl}
                                                alt={card.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: '8px',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                                color: 'white'
                                            }}>
                                                <div style={{ fontSize: '0.8em', fontWeight: 600 }}>
                                                    {card.name}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
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
                        {drawnCards.length > 0 && (
                            <div style={{
                                width: '100%',
                                padding: '20px',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '10px'
                            }}>
                                <h3 style={{ color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                                    Revealed Cards
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    gap: '15px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {drawnCards.map((card, index) => (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{
                                                width: '150px',
                                                height: '210px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            <img
                                                src={card.imageUrl}
                                                alt={card.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: '8px',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                                color: 'white'
                                            }}>
                                                <div style={{ fontSize: '0.8em', fontWeight: 600 }}>
                                                    {card.name}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '20px',
            background: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}
            >
                Alien Card Animation Demo
            </motion.h1>
            
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '40px',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <button
                    onClick={() => handleAnimationChange('classic')}
                    style={{
                        padding: '12px 24px',
                        margin: '0 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'classic' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Classic Flip
                </button>
                <button
                    onClick={() => handleAnimationChange('swipe')}
                    style={{
                        padding: '12px 24px',
                        margin: '0 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'swipe' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Swipe Draw
                </button>
                <button
                    onClick={() => handleAnimationChange('explosion')}
                    style={{
                        padding: '12px 24px',
                        margin: '0 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'explosion' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Deck Explosion
                </button>
                <button
                    onClick={() => handleAnimationChange('simple')}
                    style={{
                        padding: '12px 24px',
                        margin: '0 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedAnimation === 'simple' ? '#4a4a4a' : '#2a2a2a',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Simple Appearance
                </button>
            </div>

            <motion.div
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {renderAnimation()}
            </motion.div>
        </div>
    );
}; 
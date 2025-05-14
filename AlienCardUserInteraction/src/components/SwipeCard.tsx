import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../types/Card';

interface SwipeCardProps {
    card: Card;
    onSwipe?: (direction: 'left' | 'right') => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ card, onSwipe }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [revealedCards, setRevealedCards] = useState<Card[]>([]);

    const handleDragEnd = (event: any, info: any) => {
        const swipeThreshold = 100;
        const swipe = info.offset.x;

        if (Math.abs(swipe) > swipeThreshold) {
            const swipeDirection = swipe > 0 ? 'right' : 'left';
            setDirection(swipeDirection);
            onSwipe?.(swipeDirection);
            setRevealedCards(prev => [...prev, card]);
            setTimeout(() => {
                setDirection(null);
            }, 200);
        }
    };

    const handleInitialClick = () => {
        setIsStarted(true);
    };

    return (
        <div style={{ 
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            gap: '40px'
        }}>
            {/* Main card area */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }}>
                {!isStarted ? (
                    <div style={{
                        position: 'relative',
                        width: '300px',
                        height: '420px',
                        cursor: 'pointer'
                    }} onClick={handleInitialClick}>
                        {/* Deck visualization */}
                        {[...Array(5)].map((_, idx) => (
                            <motion.div
                                key={idx}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: '#2a2a2a',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                    transform: `translateY(${idx * -1}px) translateX(${idx * 1}px)`,
                                    border: '1px solid #333'
                                }}
                                initial={false}
                                animate={{
                                    y: [-2, 0, -2],
                                    x: [idx * 1, idx * 1, idx * 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: idx * 0.1,
                                    ease: 'easeInOut'
                                }}
                            />
                        ))}
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'white',
                                fontSize: '1.2em',
                                textAlign: 'center',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                zIndex: 10,
                                pointerEvents: 'none'
                            }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.95, 1, 0.95]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            Click to Start
                        </motion.div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="active-card"
                            style={{
                                position: 'relative',
                                width: '300px',
                                height: '420px',
                                cursor: 'grab',
                                perspective: '1000px'
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={handleDragEnd}
                            initial={{ 
                                x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
                                rotateY: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
                                opacity: 0 
                            }}
                            animate={{ 
                                x: 0,
                                rotateY: 0,
                                opacity: 1 
                            }}
                            exit={{ 
                                x: direction === 'left' ? -300 : 300,
                                rotateY: direction === 'left' ? 30 : -30,
                                opacity: 0 
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            }}
                            whileDrag={{
                                cursor: 'grabbing',
                                scale: 1.02
                            }}
                            whileHover={{
                                scale: 1.02
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                background: '#fff',
                                position: 'relative'
                            }}>
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
                                    padding: '20px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    color: 'white'
                                }}>
                                    <h3 style={{ 
                                        margin: '0 0 8px 0',
                                        fontSize: '1.2em',
                                        fontWeight: 600
                                    }}>
                                        {card.name}
                                    </h3>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '0.9em',
                                        opacity: 0.9,
                                        lineHeight: '1.4'
                                    }}>
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    width: '100%',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '1.2em',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                    pointerEvents: 'none'
                                }}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0.7 }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                            >
                                Swipe to Draw Next Card
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* Revealed cards section */}
            {revealedCards.length > 0 && (
                <div style={{
                    width: '100%',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    marginTop: 'auto'
                }}>
                    <h3 style={{
                        color: 'white',
                        marginBottom: '15px',
                        fontSize: '1.2em',
                        textAlign: 'center'
                    }}>
                        Revealed Cards
                    </h3>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        overflowX: 'auto',
                        padding: '10px 0',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {revealedCards.map((revealedCard, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    flexShrink: 0,
                                    width: '150px',
                                    height: '210px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                }}
                            >
                                <img
                                    src={revealedCard.imageUrl}
                                    alt={revealedCard.name}
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
                                    <div style={{
                                        fontSize: '0.8em',
                                        fontWeight: 600
                                    }}>
                                        {revealedCard.name}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 
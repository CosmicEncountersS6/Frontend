import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../types/Card';

interface SimpleAppearanceProps {
    card: Card;
    onFlip?: () => void;
}

export const SimpleAppearance: React.FC<SimpleAppearanceProps> = ({ card, onFlip }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        if (!isFlipped) {
            onFlip?.();
        }
    };

    return (
        <div style={{ 
            padding: 'var(--spacing-unit)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'clamp(400px, 60vh, 600px)'
        }}>
            <motion.div
                onClick={handleClick}
                style={{
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    position: 'relative',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
                animate={{
                    rotateY: isFlipped ? 180 : 0
                }}
                transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                }}
            >
                {/* Back of card */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        border: '1px solid #333',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        overflow: 'hidden',
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
                            padding: 'clamp(15px, 3vw, 20px)',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                            color: 'white'
                        }}>
                            <h3 style={{ 
                                marginBottom: 'clamp(4px, 1vw, 8px)',
                                fontSize: 'clamp(16px, 3vw, 20px)',
                                fontWeight: 600
                            }}>
                                {card.name}
                            </h3>
                            <p style={{
                                fontSize: 'clamp(12px, 2vw, 14px)',
                                opacity: 0.9,
                                lineHeight: '1.4'
                            }}>
                                {card.description}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Front of card */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        border: '1px solid #333',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <motion.div
                        style={{
                            color: 'white',
                            fontSize: 'clamp(16px, 3vw, 20px)',
                            textAlign: 'center',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            padding: 'var(--spacing-unit)'
                        }}
                        animate={{
                            scale: [0.95, 1, 0.95],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        Click to Reveal
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}; 
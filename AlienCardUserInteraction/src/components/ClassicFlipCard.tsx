import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../types/Card';
import { motion } from 'framer-motion';

interface ClassicFlipCardProps {
    card: Card;
    onFlipComplete?: () => void;
}

export const ClassicFlipCard: React.FC<ClassicFlipCardProps> = ({ card, onFlipComplete }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Reset flip state when card changes
    useEffect(() => {
        setIsFlipped(false);
    }, [card.id]);

    const { transform, opacity } = useSpring({
        opacity: isFlipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        onRest: () => {
            if (isFlipped && onFlipComplete && !isAnimating) {
                setIsAnimating(true);
                onFlipComplete();
                // Add a small delay before resetting to ensure the callback is processed
                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            }
        },
    });

    const handleClick = () => {
        if (!isFlipped && !isAnimating) {
            setIsFlipped(true);
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'clamp(400px, 60vh, 600px)',
            padding: 'var(--spacing-unit)'
        }}>
            <animated.div
                style={{
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    position: 'relative',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
                onClick={handleClick}
            >
                <animated.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity,
                        transform: transform.to(t => `${t} rotateY(0deg)`),
                        backfaceVisibility: 'hidden',
                        background: '#2a2a2a',
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
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
                        Click to Flip
                    </motion.div>
                </animated.div>
                <animated.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity,
                        transform: transform.to(t => `${t} rotateY(180deg)`),
                        backfaceVisibility: 'hidden',
                        background: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                >
                    <div className="card-front">
                        <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                borderRadius: '10px' 
                            }}
                        />
                        <div style={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0, 
                            right: 0,
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            padding: 'clamp(15px, 3vw, 20px)',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                        }}>
                            <h3 style={{ 
                                marginBottom: 'clamp(4px, 1vw, 8px)',
                                fontSize: 'clamp(16px, 3vw, 20px)'
                            }}>{card.name}</h3>
                            <p style={{ 
                                fontSize: 'clamp(12px, 2vw, 14px)', 
                                opacity: 0.9 
                            }}>{card.description}</p>
                        </div>
                    </div>
                </animated.div>
            </animated.div>
        </div>
    );
}; 
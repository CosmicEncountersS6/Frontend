import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../types/Card';

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
        <div className="card-container" style={{ 
            width: '300px', 
            height: '420px', 
            position: 'relative',
            cursor: !isFlipped && !isAnimating ? 'pointer' : 'default'
        }}>
            <animated.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: opacity.to(o => 1 - o),
                    transform,
                    backfaceVisibility: 'hidden',
                    background: '#2a2a2a',
                    borderRadius: '10px',
                }}
                onClick={handleClick}
            >
                <div className="card-back">
                    <div style={{ 
                        color: 'white', 
                        textAlign: 'center', 
                        paddingTop: '45%',
                        fontSize: '1.2em',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        Click to Draw
                    </div>
                </div>
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
                        bottom: '20px', 
                        left: '20px', 
                        right: '20px',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        padding: '10px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                    }}>
                        <h3 style={{ marginBottom: '5px' }}>{card.name}</h3>
                        <p style={{ fontSize: '0.9em', opacity: 0.9 }}>{card.description}</p>
                    </div>
                </div>
            </animated.div>
        </div>
    );
}; 
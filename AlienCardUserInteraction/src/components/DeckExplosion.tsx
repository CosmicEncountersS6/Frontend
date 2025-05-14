import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../types/Card';

interface DeckExplosionProps {
    cards: Card[];
    onAnimationComplete?: () => void;
}

export const DeckExplosion: React.FC<DeckExplosionProps> = ({ cards, onAnimationComplete }) => {
    const [isExploded, setIsExploded] = useState(false);
    const [isAligned, setIsAligned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleClick = () => {
        setIsExploded(true);
        // Line up cards after chaotic movement
        setTimeout(() => {
            setIsAligned(true);
            if (onAnimationComplete) {
                onAnimationComplete();
            }
        }, 3000); // Time for chaotic movement
    };

    const getChaoticAnimation = (index: number) => {
        const numKeyframes = 10; // More keyframes for more chaotic movement
        const maxRadius = Math.min(containerSize.width, containerSize.height) * 0.4;

        return {
            x: Array.from({ length: numKeyframes }, () => (Math.random() - 0.5) * maxRadius),
            y: Array.from({ length: numKeyframes }, () => (Math.random() - 0.5) * maxRadius),
            rotate: Array.from({ length: numKeyframes }, () => Math.random() * 720 - 360), // More rotation
            scale: Array.from({ length: numKeyframes }, () => 0.7 + Math.random() * 0.3),
            transition: {
                duration: 3,
                ease: "linear",
                times: Array.from({ length: numKeyframes }, (_, i) => i / (numKeyframes - 1)),
            }
        };
    };

    const getFinalPosition = (index: number) => {
        const spacing = 220;
        const totalWidth = (cards.length - 1) * spacing;
        const startX = -totalWidth / 2;
        
        return {
            x: startX + (index * spacing),
            y: 0,
            rotate: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
                type: 'spring',
                stiffness: 300,
                damping: 25
            }
        };
    };

    const CardBack = () => (
        <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img
                src="/images/CardBack.png"
                alt="Card Back"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    padding: '5px'
                }}
            />
        </div>
    );

    return (
        <div 
            ref={containerRef}
            style={{ 
                width: '100%', 
                height: '500px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                perspective: '1000px',
                position: 'relative',
                overflow: 'hidden',
                background: '#1a1a1a',
                borderRadius: '15px',
                margin: '20px 0'
            }}
        >
            <AnimatePresence>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ 
                            x: 0, 
                            y: 0, 
                            rotate: 0, 
                            scale: 0.8,
                            zIndex: cards.length - index 
                        }}
                        animate={
                            isAligned ? getFinalPosition(index) :
                            isExploded ? getChaoticAnimation(index) : {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 0.8,
                                transition: { duration: 0.5 }
                            }
                        }
                        style={{
                            position: 'absolute',
                            width: '200px',
                            height: '280px',
                            cursor: !isExploded ? 'pointer' : 'default',
                            zIndex: isAligned ? index : undefined,
                        }}
                        onClick={!isExploded ? handleClick : undefined}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            transform: `translateZ(${isExploded ? 0 : -index * 2}px)`,
                            transition: 'transform 0.3s ease'
                        }}>
                            {isExploded ? (
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
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '15px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                        color: 'white',
                                    }}>
                                        <h3 style={{ margin: '0 0 5px 0' }}>{card.name}</h3>
                                        <p style={{ margin: 0, fontSize: '0.8em', opacity: 0.9 }}>{card.description}</p>
                                    </div>
                                </div>
                            ) : (
                                <CardBack />
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {!isExploded && (
                <motion.div
                    style={{
                        position: 'absolute',
                        color: 'white',
                        fontSize: '1.2em',
                        textAlign: 'center',
                        pointerEvents: 'none',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Click to Reveal Cards
                </motion.div>
            )}
        </div>
    );
}; 
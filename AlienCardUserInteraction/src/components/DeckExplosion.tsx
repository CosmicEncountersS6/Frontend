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
        if (!isExploded) {
            setIsExploded(true);
            setTimeout(() => {
                setIsAligned(true);
                if (onAnimationComplete) {
                    onAnimationComplete();
                }
            }, 2000);
        }
    };

    const getChaoticAnimation = (index: number) => {
        const numKeyframes = 8;
        const maxRadius = Math.min(containerSize.width, containerSize.height) * 0.35;

        return {
            x: Array.from({ length: numKeyframes }, () => (Math.random() - 0.5) * maxRadius),
            y: Array.from({ length: numKeyframes }, () => (Math.random() - 0.5) * maxRadius),
            rotate: Array.from({ length: numKeyframes }, () => Math.random() * 360 - 180),
            scale: Array.from({ length: numKeyframes }, () => 0.7 + Math.random() * 0.3),
            transition: {
                duration: 2,
                ease: "linear",
                times: Array.from({ length: numKeyframes }, (_, i) => i / (numKeyframes - 1)),
            }
        };
    };

    const getFinalPosition = (index: number) => {
        const isMobile = window.innerWidth <= 768;
        const spacing = isMobile ? 160 : 220;
        const totalWidth = (cards.length - 1) * spacing;
        const startX = -totalWidth / 2;
        
        return {
            x: startX + (index * spacing),
            y: 0,
            rotate: 0,
            scale: isMobile ? 0.6 : 0.8,
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
            alignItems: 'center',
            background: '#2a2a2a'
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
                height: 'min(500px, 70vh)',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                perspective: '1000px',
                position: 'relative',
                overflow: 'hidden',
                background: 'transparent',
                borderRadius: '12px',
                margin: '0 auto'
            }}
        >
            {/* Cards Stack */}
            <div 
                style={{
                    position: 'relative',
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    cursor: !isExploded ? 'pointer' : 'default',
                    transformStyle: 'preserve-3d'
                }}
            >
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
                                zIndex: cards.length - index,
                                transition: { duration: 0.5 }
                            }
                        }
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            transform: `translateZ(${isExploded ? 0 : -index * 2}px)`,
                            cursor: !isExploded ? 'pointer' : 'default'
                        }}
                        onClick={!isExploded ? handleClick : undefined}
                    >
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
                                    <h3 style={{ margin: '0 0 5px 0', fontSize: 'clamp(14px, 3vw, 18px)' }}>{card.name}</h3>
                                    <p style={{ margin: 0, fontSize: 'clamp(12px, 2.5vw, 14px)', opacity: 0.9 }}>{card.description}</p>
                                </div>
                            </div>
                        ) : (
                            <CardBack />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Overlay with button */}
            {!isExploded && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-unit)',
                    pointerEvents: 'none',
                    zIndex: 1000
                }}>
                    <motion.button
                        onClick={handleClick}
                        style={{
                            padding: 'clamp(12px, 3vw, 16px) clamp(24px, 5vw, 32px)',
                            fontSize: 'clamp(16px, 3.5vw, 20px)',
                            fontWeight: 600,
                            color: 'white',
                            background: '#4a4a4a',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'auto'
                        }}
                        whileHover={{ scale: 1.05, background: '#5a5a5a' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Explode Deck
                    </motion.button>
                    <motion.div
                        style={{
                            color: 'white',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            textAlign: 'center',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            opacity: 0.8
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5 }}
                    >
                        Click to reveal all cards
                    </motion.div>
                </div>
            )}
        </div>
    );
}; 
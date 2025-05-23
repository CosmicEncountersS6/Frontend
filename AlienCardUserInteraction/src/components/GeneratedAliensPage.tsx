import React from 'react';
import { Card } from '../types/Card';

interface GeneratedAliensPageProps {
    aliens: Card[]; // Assuming generated aliens are of type Card
}

const GeneratedAliensPage: React.FC<GeneratedAliensPageProps> = ({ aliens }) => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ margin: '20px auto', fontSize: '3em', textShadow: '2px 2px 4px #000' }}>Generated Aliens</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '40px auto' }}>
                {aliens.length > 0 ? (
                    aliens.map(alien => (
                        <div key={alien.id} style={{ border: '1px solid #555', borderRadius: '10px', overflow: 'hidden', width: '200px', textAlign: 'center' }}>
                            <img src={alien.imageUrl} alt={alien.name} style={{ width: '100%', height: 'auto' }} />
                            <div style={{ padding: '10px', background: '#333' }}>
                                {alien.name}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No aliens generated yet.</p>
                )}
            </div>

            {/* Placeholder for bottom navigation */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-home"></i></button>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-space-shuttle"></i></button>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-user"></i></button>
            </div>
        </div>
    );
};

export default GeneratedAliensPage; 
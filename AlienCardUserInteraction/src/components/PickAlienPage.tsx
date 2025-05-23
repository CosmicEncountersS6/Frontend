import React from 'react';

interface PickAlienPageProps {
    onPickAlien: () => void;
}

const PickAlienPage: React.FC<PickAlienPageProps> = ({ onPickAlien }) => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ margin: '20px auto', fontSize: '4em', textShadow: '2px 2px 4px #000' }}>Cosmic Encounter</h1> {/* Placeholder for title image */}
            
            {/* Alien Cards Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', margin: '40px auto' }}>
                {/* Example Alien Card - will need to map over actual alien data */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' }}>
                        <i className="fas fa-info-circle"></i> {/* Placeholder for info icon */}
                    </button>
                    <div style={{ border: '1px solid #555', borderRadius: '10px', overflow: 'hidden', width: '250px', height: '350px' }}>
                        <img src="/images/pacifist.jpg" alt="Pacifist Alien" style={{ width: '100%', height: 'auto' }} /> {/* Placeholder image */}
                        <div style={{ padding: '10px', background: '#333', textAlign: 'center' }}>
                            Pacifist {/* Placeholder name */}
                        </div>
                    </div>
                </div>
                {/* Repeat for other aliens... */}
            </div>

            <button 
                onClick={onPickAlien}
                style={{ padding: '10px 30px', fontSize: '1.2em', backgroundColor: '#6a4c93', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
            >
                Pick alien
            </button>

            {/* Placeholder for bottom navigation */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-home"></i></button>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-space-shuttle"></i></button>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em' }}><i className="fas fa-user"></i></button>
            </div>
        </div>
    );
};

export default PickAlienPage; 
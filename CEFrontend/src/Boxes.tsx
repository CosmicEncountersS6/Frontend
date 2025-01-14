import React, { useState } from 'react';
import { RandomizerAliens } from './AlienAPI';
import InfoCard from './AlienCard';
import { Alien } from './AlienAPI';

const NumberGenerator: React.FC = () => {
    const [easy, setEasy] = useState<number>(0);
    const [medium, setMedium] = useState<number>(0);
    const [hard, setHard] = useState<number>(0);

    const [alienList, SetAlienList] = useState<Alien[]|undefined>(undefined);

    const generateNumbers = async () => {
        SetAlienList(undefined)
        const res = await RandomizerAliens(easy, medium, hard);
        SetAlienList(res)        
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Alien Generator</h1>
            <div style={{ marginBottom: '20px' }}>
                <div>
                    <label htmlFor="box1" style={{ marginRight: '10px' }}>Easy:</label>
                    <input
                        id="box1"
                        type="number"
                        value={easy}
                        onChange={(e) => setEasy(Number(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        style={{ width: '50px', margin: '0 10px', padding: '5px' }}
                    />
                </div>
                <div>
                    <label htmlFor="box2" style={{ marginRight: '10px' }}>Medium:</label>
                    <input
                        id="box2"
                        type="number"
                        value={medium}
                        onChange={(e) => setMedium(Number(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        style={{ width: '50px', margin: '0 10px', padding: '5px' }}
                    />
                </div>
                <div>
                    <label htmlFor="box3" style={{ marginRight: '10px' }}>Hard:</label>
                    <input
                        id="box3"
                        type="number"
                        value={hard}
                        onChange={(e) => setHard(Number(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        style={{ width: '50px', margin: '0 10px', padding: '5px' }}
                    />
                </div>
            </div>
            <button
                onClick={generateNumbers}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
                Generate
            </button>
            { alienList != undefined &&
                <div>
                    {
                        alienList.map((alien: Alien) => {
                            return (
                                <InfoCard name={ alien.name } imageUrl={ alien.image } description={ alien.description } />
                            )
                        })
                    }                    
                </div>
            }
            
        </div>
    );
};

export default NumberGenerator;

import React, { useState } from 'react';
import './HomePage.css';
import CryptoCard from './CryptoCard';

function HomePage() {
    const [krypto, setKrypto] = useState('');
    const [cards, setCards] = useState([]);

    const handleAddCard = () => {
        if (krypto !== '') {
            setCards([...cards, krypto]);
            setKrypto('');
        }
    };

    return (
        <div className="HomePage">
            <div className="navbar">
                <div className="nav-input-container">
                    <input
                        type="text"
                        value={krypto}
                        onChange={(e) => setKrypto(e.target.value)}
                        placeholder="Zadejte kryptoměnu"
                    />
                    <button onClick={handleAddCard}>Přidat</button>
                </div>
            </div>
            <div className="crypto-card-container">
                {cards.map((krypto, index) => (
                    <CryptoCard key={index} krypto={krypto.toLowerCase()} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;

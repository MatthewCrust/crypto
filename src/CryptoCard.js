import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';
import './CryptoCard.css';
const CryptoCard = ({ krypto }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [dates, setDates] = useState([]);
  const [values, setValues] = useState([]);
  const [scale, setScale] = useState("d1")

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${krypto}/history`, {
          headers: {
            'Authorization': 'Bearer 3cc6c923-3c13-41ae-9446-11c8e27db1dd',
          },
          params: {
            interval: scale, // Fetch daily data
          },
        });

        const historicalData = response.data.data;
        setHistoricalData(historicalData);

        // Extracting dates and values into separate arrays
        const datesArray = historicalData.map(data => {
          if (scale === 'd1') {
            return new Date(data.time).toLocaleDateString(); // Daily interval
          } else {
            return new Date(data.time).toLocaleTimeString(); // Other intervals
          }
        });
        const valuesArray = historicalData.map(data => data.priceUsd);
        setDates(datesArray);
        setValues(valuesArray);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    const fetchCurrentData = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${krypto}`, {
          headers: {
            'Authorization': 'Bearer 3cc6c923-3c13-41ae-9446-11c8e27db1dd',
          },
        });

        setCurrentData(response.data.data);
      } catch (error) {
        console.error('Error fetching current data:', error);
      }
    };

    fetchHistoricalData();
    fetchCurrentData();
  }, [krypto, scale]);


  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };

  return (
    <div className='cardBox'>
      {currentData && (
        <div>
          <h1>{krypto.charAt(0).toUpperCase() + krypto.slice(1)}</h1>
          <p>Aktuální cena: <br></br><span className={parseFloat(currentData.changePercent24Hr) >= 0 ? 'positive' : 'negative'} id='priceNum'>${ parseFloat(currentData.priceUsd).toFixed(3)}</span></p>
          <p>Pohyb za 24 hodin: <br></br>
            <span id='moveNum' className={parseFloat(currentData.changePercent24Hr) >= 0 ? 'positive' : 'negative'}>
              {parseFloat(currentData.changePercent24Hr).toFixed(3)}%
            </span>
          </p>

        </div>
      )}
      <div>
        <label htmlFor="interval">Vyberte dobu pohybu: </label>
        <select id="interval" value={scale} onChange={handleScaleChange}>
          <option value="m1">Každou minutu</option>
          <option value="m5">Každých 5 minut</option>
          <option value="m15">Každých 15 minut </option>
          <option value="m30">Každých 30 minut </option>
          <option value="h1">Každou hodinu </option>
          <option value="h2">Každé 2 hodiny </option>
          <option value="h6">Každých 6 hodin </option>
          <option value="h12">Každých 12 hodin </option>
          <option value="d1">Každý den </option>
        </select>
        <Graph timeData={dates} valueData={values} />
      </div>

    </div>
  );
};

export default CryptoCard;

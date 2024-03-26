import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Graph.css';
const Graph = ({valueData, timeData}) => {
  const chartData = {
    labels: timeData,
    datasets: [
      {
        label: 'Cena',
        data: valueData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); 
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {

        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); 
      }
    };
  }, [chartData]);

  return (
    <div className='graphBox'>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graph;

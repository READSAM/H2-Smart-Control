import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'; // <-- 1. IMPORT ROW AND COL
import DashboardWidget from '../DashboardWidget';
import LineChart from '../../charts/LineChart';

const MAX_DATA_POINTS = 15;

const CurrentEnergyInput = ({ energyData }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Solar (MW)', data: [], borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.2)', fill: true, tension: 0.4
            },
            {
                label: 'Wind (MW)', data: [], borderColor: '#87CEEB',
                backgroundColor: 'rgba(135, 206, 235, 0.2)', fill: true, tension: 0.4
            },
            {
                label: 'Grid (MW)', data: [], borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.2)', fill: true, tension: 0.4
            }
        ]
    });

    useEffect(() => {
        if (!energyData) return;
        const { solar, wind, gridImport } = energyData;
        const now = new Date();
        const newLabel = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setChartData(prevData => {
            const newLabels = [...prevData.labels, newLabel].slice(-MAX_DATA_POINTS);
            const newSolarData = [...prevData.datasets[0].data, solar].slice(-MAX_DATA_POINTS);
            const newWindData = [...prevData.datasets[1].data, wind].slice(-MAX_DATA_POINTS);
            const newGridData = [...prevData.datasets[2].data, gridImport].slice(-MAX_DATA_POINTS);

            return {
                labels: newLabels,
                datasets: [
                    { ...prevData.datasets[0], data: newSolarData },
                    { ...prevData.datasets[1], data: newWindData },
                    { ...prevData.datasets[2], data: newGridData },
                ]
            };
        });
    }, [energyData]);

    if (!energyData) {
        return <DashboardWidget title="Current Energy Input">Loading data...</DashboardWidget>;
    }

    return (
        <DashboardWidget title="Current Energy Input (Live)">
            {/* --- THIS IS THE FIX: Replaced the flex container with a Bootstrap Row --- */}
            <Row className="align-items-center mb-2">
                {/* Column for the list of sources */}
                <Col xs={7}>
                    <p className="mb-1"><i className="bi bi-sun-fill text-warning me-2"></i>Solar: <span className="fw-bold">{energyData.solar.toFixed(1)} MW</span></p>
                    <p className="mb-1"><i className="bi bi-wind text-info me-2"></i>Wind: <span className="fw-bold">{energyData.wind.toFixed(1)} MW</span></p>
                    <p className="mb-0"><i className="bi bi-plug-fill text-primary me-2"></i>Grid Import: <span className="fw-bold">{energyData.gridImport.toFixed(1)} MW</span></p>
                </Col>
                
                {/* Column for the total, aligned to the right */}
                <Col xs={5} className="text-end">
                     <h5 className="text-white-50">Total Available</h5>
                     <h2 className="text-green-h2 fw-bold mb-0">{energyData.totalAvailable.toFixed(1)} MW</h2>
                </Col>
            </Row>

            <div style={{ height: '150px' }}>
                <LineChart data={chartData} options={{
                    animation: false,
                    scales: { y: { beginAtZero: true } }
                }}/>
            </div>
        </DashboardWidget>
    );
};

export default CurrentEnergyInput;
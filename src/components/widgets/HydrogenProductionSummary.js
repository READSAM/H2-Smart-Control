// // import React from 'react';
// import DashboardWidget from '../DashboardWidget';
// import { Button, ProgressBar } from 'react-bootstrap';
// import React,{ useEffect, useState } from 'react';
// import { api,socket } from '../api/backend';


// const HydrogenProductionSummary = () => {
//     return (
//         <DashboardWidget title="Hydrogen Production">
//             <div className="text-center py-3"> {/* Added padding */}
//                 <h1 className="text-green-h2 fw-bold mb-3 kpi-lg">120 <span className="fs-5">kg/hr</span></h1>
//                 <p className="text-muted mb-3">Today's Total: 2,500 kg</p>
//                 <div className="d-flex align-items-center justify-content-center mb-3">
//                     <span className="status-dot-green me-2"></span>
//                     <span className="text-white-50">All Electrolyzers Operational</span>
//                 </div>
//                 <div className="mb-4 px-3"> {/* Added horizontal padding */}
//                     <p className="mb-1">Capacity Usage: 85%</p>
//                     <ProgressBar now={85} variant="success" className="mx-auto" style={{ height: '15px' }} />
//                 </div>
//                 <Button variant="green-h2">
//                     <i className="bi bi-info-circle me-2"></i>View Details
//                 </Button>
//             </div>
//         </DashboardWidget>
//     );

//     // const [data,setData]=useState({
//     //     rate:0,
//     //     total:0,
//     //     capacityUsage:0,
//     //     electrolyzerStatus:'Loading...',
//     // })
// };

// export default HydrogenProductionSummary;

import React from 'react'; // Keep this React import
import { Card, ProgressBar, Badge, Row, Col, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Helper function for status badge variant
const getStatusVariant = (status) => {
    switch (status) {
        case 'Optimal': return 'success';
        case 'Running': return 'success';
        case 'Warning': return 'warning';
        case 'Low': return 'warning';
        case 'High': return 'info';
        case 'Critical': return 'danger';
        case 'Offline': return 'danger';
        case 'Stopped': return 'secondary';
        case 'In Transit': return 'primary';
        case 'Scheduled': return 'info';
        case 'Active': return 'success';
        case 'Idle': return 'secondary';
        case 'Under Repair': return 'warning';
        default: return 'secondary';
    }
};

const HydrogenProductionSummary = ({ productionData }) => { // Accept productionData prop

    // Defensive check
    if (!productionData) {
        return (
            <Card className="widget-card h-100">
                <Card.Header>Hydrogen Production</Card.Header>
                <Card.Body className="text-center text-muted d-flex align-items-center justify-content-center">
                    Loading production data...
                </Card.Body>
            </Card>
        );
    }

    const { currentRate, targetRate, maxCapacity, capacityUsage, hydrogenPurity, electrolyzers } = productionData;

    // Calculate average electrolyzer efficiency and overall status
    const totalEfficiency = electrolyzers?.reduce((sum, e) => sum + e.efficiency, 0) || 0;
    const avgEfficiency = electrolyzers && electrolyzers.length > 0
        ? (totalEfficiency / electrolyzers.length).toFixed(1)
        : 'N/A';
    
    // Determine overall electrolyzer status (e.g., if any are not 'Running')
    const allElectrolyzersOperational = electrolyzers?.every(e => e.status === 'Running');
    const electrolyzerStatusText = allElectrolyzersOperational ? 'All Operational' : 'Some Offline';
    const electrolyzerStatusVariant = allElectrolyzersOperational ? 'success' : 'warning';


    // Dummy chart data for illustration (you'd populate this with historical productionData)
    const chartData = [
        { name: '00:00', 'H2 Prod': 50 }, { name: '01:00', 'H2 Prod': 60 }, { name: '02:00', 'H2 Prod': 70 },
        { name: '03:00', 'H2 Prod': 80 }, { name: '04:00', 'H2 Prod': 90 }, { name: '05:00', 'H2 Prod': 100 },
        { name: '06:00', 'H2 Prod': 110 }, { name: '07:00', 'H2 Prod': 120 }, { name: '08:00', 'H2 Prod': 130 },
        { name: '09:00', 'H2 Prod': 140 }, { name: '10:00', 'H2 Prod': 150 }, { name: '11:00', 'H2 Prod': 145 },
        { name: '12:00', 'H2 Prod': 135 },
    ];


    return (
        <Card className="widget-card h-100">
            <Card.Header>Hydrogen Production</Card.Header>
            <Card.Body>
                <Row className="mb-3 text-center">
                    <Col>
                        <i className="bi bi-flask-fill text-green-h2 fs-4"></i>
                        <h4 className="text-light mb-0">{currentRate?.toFixed(1) || 'N/A'} kg/hr</h4>
                        <small className="text-muted">Current Rate</small>
                    </Col>
                    <Col>
                        <i className="bi bi-bullseye text-primary fs-4"></i>
                        <h4 className="text-light mb-0">{targetRate?.toFixed(1) || 'N/A'} kg/hr</h4>
                        <small className="text-muted">Target Rate</small>
                    </Col>
                    <Col>
                        <i className="bi bi-speedometer2 text-info fs-4"></i>
                        <h4 className="text-light mb-0">{avgEfficiency}%</h4>
                        <small className="text-muted">Avg. Efficiency</small>
                    </Col>
                </Row>

                <div className="mb-3 d-flex align-items-center justify-content-center">
                    <Badge bg={electrolyzerStatusVariant} className="py-2 px-3 fs-6">
                        {electrolyzerStatusText}
                    </Badge>
                </div>

                <div className="mb-3">
                    <ProgressBar
                        now={capacityUsage || 0}
                        label={`${capacityUsage?.toFixed(0) || 0}%`}
                        variant="success"
                        className="mt-2"
                        style={{ height: '1.2rem' }}
                    />
                    <small className="text-muted d-block mt-1">Capacity Usage (Max: {maxCapacity || 'N/A'} kg/hr)</small>
                </div>
                
            </Card.Body>
        </Card>
    );
};

export default HydrogenProductionSummary;
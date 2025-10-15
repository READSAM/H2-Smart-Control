import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Form, Badge } from 'react-bootstrap';
import DoughnutChart from '../charts/DoughnutChart';
import LineChart from '../charts/LineChart';

const ProductionPage = ({ productionData, analyticsData }) => {
    const [rateHistory, setRateHistory] = useState([]);

    useEffect(() => {
        if (productionData) {
            const now = new Date();
            const newEntry = {
                time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
                rate: productionData.currentRate,
            };
            setRateHistory(prevHistory => [...prevHistory, newEntry].slice(-10));
        }
    }, [productionData]);

    if (!productionData || !analyticsData) {
        return <Container fluid className="py-4 text-center text-white"><h2>Loading Production Data...</h2></Container>;
    }

    const { electrolyzers, currentRate, targetRate } = productionData;
    const { electrolyzerEfficiency, systemEfficiency } = analyticsData;

    const operatingElectrolyzers = electrolyzers.filter(e => e.status === 'Running').length;
    const warningElectrolyzers = electrolyzers.filter(e => e.status === 'Warning').length;
    const offlineElectrolyzers = electrolyzers.filter(e => e.status === 'Stopped').length;

    const totalProductionChartData = {
        labels: ['Operating', 'Warning', 'Offline'],
        datasets: [{
            data: [operatingElectrolyzers, warningElectrolyzers, offlineElectrolyzers],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            borderColor: '#2a2a2a',
        }]
    };

    const productionTrendData = {
        labels: rateHistory.map(h => h.time),
        datasets: [{
            label: 'Production Rate (kg/hr)',
            data: rateHistory.map(h => h.rate),
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
            tension: 0.4,
        }]
    };

    return (
        <Container fluid>
            <h2 className="mb-4 text-white">Production Module</h2>
            <Row className="g-4">
                <Col lg={7}>
                    <Card className="widget-card h-100">
                        <Card.Header>Global Production Overview</Card.Header>
                        <Card.Body>
                            <Row className="text-center">
                                <Col>
                                    <h5>Current Rate</h5>
                                    <h3 className="text-green-h2 mb-1">{currentRate.toFixed(1)} kg/hr</h3>
                                </Col>
                                <Col>
                                    <h5>Target Rate</h5>
                                    <h3 className="text-info mb-1">{targetRate.toFixed(1)} kg/hr</h3>
                                </Col>
                                <Col>
                                    <h5>Electrolyzer Eff.</h5>
                                    <h3 className="text-warning mb-1">{electrolyzerEfficiency.toFixed(1)}%</h3>
                                </Col>
                                <Col>
                                    <h5>System Eff.</h5>
                                    <h3 className="text-success mb-1">{systemEfficiency.toFixed(1)}%</h3>
                                </Col>
                            </Row>
                            <div className="mt-4" style={{ height: '200px' }}>
                                <LineChart data={productionTrendData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={5}>
                    <Card className="widget-card h-100">
                        <Card.Header>Electrolyzer Status</Card.Header>
                        <Card.Body>
                            {electrolyzers.map(e => (
                                <div key={e.id} className="d-flex align-items-center mb-2">
                                    <strong className="me-2">{e.name}:</strong>
                                    <Badge bg={e.status === 'Running' ? 'success' : e.status === 'Warning' ? 'warning' : 'danger'} className="me-auto">{e.status}</Badge>
                                    <span className="text-muted me-2">Health: {e.health}</span>
                                    <i className={`bi bi-${e.health === 'Good' ? 'check-circle-fill text-success' : 'exclamation-triangle-fill text-warning'}`}></i>
                                </div>
                            ))}
                            <div className="mt-3" style={{ height: '150px' }}>
                                <DoughnutChart data={totalProductionChartData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {electrolyzers.map(e => (
                    <Col lg={6} key={`control-${e.id}`}>
                        <Card className="widget-card h-100">
                            <Card.Header>{e.name} Control</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Status:</strong> <span className={`text-${e.status === 'Running' ? 'success' : e.status === 'Warning' ? 'warning' : 'danger'}`}>{e.status}</span></p>
                                        <p><strong>Efficiency:</strong> {e.efficiency} kWh/kg</p>
                                        <p><strong>Health:</strong> {e.health}</p>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Target Capacity ({e.capacity}%)</Form.Label>
                                            <Form.Range min={0} max={100} defaultValue={e.capacity} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductionPage;
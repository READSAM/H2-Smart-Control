import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart'; // Assuming you create this
import DoughnutChart from '../charts/DoughnutChart'; // Assuming you create this

const AnalyticsPage = () => {
    // Simulated data for charts (from Node.js backend)
    const productionHistoryData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Monthly H2 Production (Tonnes)',
                data: [12, 15, 14, 18, 20, 22, 21, 25, 24, 26],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const energySourceMixData = {
        labels: ['Solar', 'Wind', 'Grid'],
        datasets: [
            {
                data: [45, 35, 20],
                backgroundColor: ['#FFD700', '#87CEEB', '#007bff'],
                borderColor: '#2a2a2a',
                hoverOffset: 4,
            },
        ],
    };

    const efficiencyByElectrolyzerData = {
        labels: ['PEM-E1', 'PEM-E2', 'Alkaline-E3', 'PEM-E4'],
        datasets: [
            {
                label: 'Efficiency (kWh/kg H2)',
                data: [52, 55, 60, 58],
                backgroundColor: ['#4CAF50', '#4CAF50', '#ffc107', '#4CAF50'],
                borderColor: '#2a2a2a',
                borderWidth: 1,
            },
        ],
    };

    const [selectedPeriod, setSelectedPeriod] = useState('monthly'); // State for period filter

    return (
        <Container fluid className="py-4">
            <h2 className="mb-4 text-white">Analytics & Reports</h2>
            <Row className="g-4">
                {/* Filters */}
                <Col lg={12}>
                    <Card className="widget-card">
                        <Card.Header>Filter Data</Card.Header>
                        <Card.Body>
                            <Form className="d-flex align-items-center">
                                <Form.Group as={Col} md={3} className="me-3">
                                    <Form.Label>Time Period</Form.Label>
                                    <Form.Control as="select" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="custom">Custom Range</option>
                                    </Form.Control>
                                </Form.Group>
                                {selectedPeriod === 'custom' && (
                                    <>
                                        <Form.Group as={Col} md={3} className="me-3">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        <Form.Group as={Col} md={3} className="me-3">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                    </>
                                )}
                                <Button variant="green-h2" className="mt-auto"><i className="bi bi-funnel-fill me-2"></i>Apply Filters</Button>
                                <Button variant="outline-secondary" className="mt-auto ms-2"><i className="bi bi-download me-2"></i>Export Report</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Charts */}
                <Col lg={6}>
                    <Card className="widget-card h-100">
                        <Card.Header>Hydrogen Production History</Card.Header>
                        <Card.Body>
                            <div style={{ height: '350px' }}>
                                <LineChart data={productionHistoryData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="widget-card h-100">
                        <Card.Header>Energy Source Mix (Last Month)</Card.Header>
                        <Card.Body>
                            <div style={{ height: '350px' }}>
                                <DoughnutChart data={energySourceMixData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="widget-card h-100">
                        <Card.Header>Electrolyzer Efficiency Comparison</Card.Header>
                        <Card.Body>
                            <div style={{ height: '350px' }}>
                                {/* Assuming BarChart component exists */}
                                {/* For demonstration, using LineChart for structure */}
                                <LineChart data={efficiencyByElectrolyzerData} options={{ indexAxis: 'y' }}/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                 <Col lg={6}>
                    <Card className="widget-card h-100">
                        <Card.Header>Storage Level Over Time</Card.Header>
                        <Card.Body>
                            <div style={{ height: '350px' }}>
                                {/* Placeholder for a line chart of storage levels over time */}
                                <p className="text-muted text-center mt-5"><i className="bi bi-bar-chart-line fs-3"></i><br/>Storage Level Trend Chart Here</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AnalyticsPage;
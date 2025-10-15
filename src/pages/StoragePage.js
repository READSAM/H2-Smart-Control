import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';

const StoragePage = ({ storageData, analyticsData }) => {
    if (!storageData || !analyticsData) {
        return <Container fluid className="py-4 text-center text-white"><h2><i className="bi bi-arrow-clockwise"></i> Loading Storage Data...</h2></Container>;
    }

    const { tanks, overallFillPercentage } = storageData;
    const { pred_class: mlPredictionClass } = analyticsData.predictiveProductionPlanning;

    const getSynergyAnalysis = () => {
        if (!mlPredictionClass) return { variant: 'secondary', title: 'Connecting to ML Service...', message: 'Awaiting synergy analysis.', action: '' };

        if (mlPredictionClass === 'High') {
            if (overallFillPercentage > 90) {
                return { variant: 'warning', title: 'Warning: High Production with Full Storage', message: `ML model recommends a high rate, but storage is at ${overallFillPercentage.toFixed(0)}%.`, action: 'Action: Dispatch a delivery or lower the production target.' };
            } else {
                return { variant: 'success', title: 'Optimal Synergy: High Production Rate', message: 'ML model recommends maximizing production, and storage has ample capacity.', action: 'Action: Maintain the high production rate.' };
            }
        } else if (mlPredictionClass === 'Low') {
            if (overallFillPercentage < 20) {
                return { variant: 'info', title: 'Notice: Low Production with Low Storage', message: `ML recommends a low rate for cost-saving, but storage is critical at ${overallFillPercentage.toFixed(0)}%.`, action: 'Action: Evaluate demand. Consider overriding the ML target.' };
            } else {
                return { variant: 'success', title: 'Optimal Synergy: Cost-Saving Rate', message: 'System is in cost-saving mode while storage levels are sufficient.', action: 'Action: No action needed.' };
            }
        }
        return { variant: 'primary', title: 'Balanced Operation', message: 'System is at a standard production rate and storage is stable.', action: 'Continue monitoring.' };
    };

    const synergy = getSynergyAnalysis();

    return (
        <Container fluid>
            <h2 className="mb-4 text-white">Storage Module</h2>
            <Row className="g-4">
                <Col lg={12}>
                    <Alert variant={synergy.variant} className="widget-card">
                        <Alert.Heading><i className="bi bi-info-circle-fill me-2"></i>{synergy.title}</Alert.Heading>
                        <p>{synergy.message}</p>
                        <hr />
                        <p className="mb-0 fw-bold">{synergy.action}</p>
                    </Alert>
                </Col>
                {tanks.map(tank => (
                    <Col lg={6} key={tank.id}>
                        <Card className="widget-card h-100">
                            <Card.Header>Tank {tank.id} ({tank.type})</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6} className="pe-md-3 border-end border-secondary">
                                        <p><strong>Status:</strong><span className={`ms-2 text-${tank.status === 'Optimal' ? 'success' : 'warning'}`}><i className="bi bi-circle-fill me-1"></i>{tank.status}</span></p>
                                        <p><strong>Fill Level:</strong> {((tank.current / tank.capacity) * 100).toFixed(1)}%</p>
                                        <ProgressBar now={((tank.current / tank.capacity) * 100)} variant={tank.status === 'Optimal' ? 'success' : 'warning'} style={{ height: '12px' }}/>
                                    </Col>
                                    <Col md={6} className="ps-md-3">
                                        <p><strong>Current:</strong> {tank.current} {tank.unit}</p>
                                        <p><strong>Capacity:</strong> {tank.capacity} {tank.unit}</p>
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

export default StoragePage;
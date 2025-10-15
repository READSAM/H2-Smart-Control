// src/components/widgets/LogisticsSummary.js
import React from 'react';
import DashboardWidget from '../DashboardWidget';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LogisticsSummary = ({ logisticsData }) => {
    if (!logisticsData) {
        return <DashboardWidget title="Logistics Summary">Loading...</DashboardWidget>;
    }
    
    const { deliveries, fleetStatus } = logisticsData;

    const deliveriesInProgress = deliveries.filter(d => d.status === 'In Transit').length;
    const activeFleet = fleetStatus.filter(f => f.status === 'Active').length;
    const scheduledDeliveries = deliveries.filter(d => d.status === 'Scheduled').length;

    return (
        <DashboardWidget title="Logistics Summary">
            <Row className="gy-3 mb-4 text-center">
                <Col xs={6}>
                    <p className="mb-0"><i className="bi bi-truck me-2"></i>In Transit</p>
                    <h4 className="fw-bold">{deliveriesInProgress}</h4>
                </Col>
                <Col xs={6}>
                    <p className="mb-0"><i className="bi bi-calendar-check me-2"></i>Scheduled</p>
                    <h4 className="fw-bold">{scheduledDeliveries}</h4>
                </Col>
                <Col xs={12}>
                    <p className="mb-0"><i className="bi bi-speedometer2 me-2"></i>Active Fleet</p>
                    <h4 className="fw-bold">{activeFleet} / {fleetStatus.length}</h4>
                </Col>
            </Row>
            <Button as={Link} to="/transportation" variant="info" className="w-100">
                <i className="bi bi-send me-2"></i>Dispatch Manager
            </Button>
        </DashboardWidget>
    );
};

export default LogisticsSummary;
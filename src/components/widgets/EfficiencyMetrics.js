import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardWidget from '../DashboardWidget';
import { Colors } from 'chart.js';

const EfficiencyMetrics = ({ analyticsData }) => {
    if (!analyticsData) {
        return <DashboardWidget title="Efficiency Metrics">Loading...</DashboardWidget>;
    }

    const { electrolyzerEfficiency, systemEfficiency } = analyticsData;

    // Show connecting message if data hasn't arrived from ML service yet
    if (electrolyzerEfficiency === 0 && systemEfficiency === 0) {
        return (
            <DashboardWidget title="Efficiency Metrics">
                <div className="text-center text-muted p-3">
                    <i className="bi bi-cpu fs-2"></i>
                    <p>Awaiting efficiency data...</p>
                </div>
            </DashboardWidget>
        );
    }

    return (
        <DashboardWidget title="Live Efficiency Metrics">
            <Row className="text-center h-100 align-content-center">
                <Col>
                    <h5>Electrolyzer</h5>
                    <h2 className="fw-bold text-info">
                        {electrolyzerEfficiency.toFixed(2)}%
                    </h2>
                </Col>
                <Col className="border-start border-secondary">
                    <h5>TotalSystem</h5>
                    <h2 className="fw-bold text-success">
                        {systemEfficiency.toFixed(2)}%
                    </h2>
                </Col>
            </Row>
        </DashboardWidget>
    );
};

export default EfficiencyMetrics;
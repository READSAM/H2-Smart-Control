import React from 'react';
import DashboardWidget from '../DashboardWidget';
import { Row, Col } from 'react-bootstrap';

const GridMarketSummary = () => {
    return (
        <DashboardWidget title="Grid & Market">
            <Row className="gy-3">
                <Col xs={12}>
                    <p className="mb-0"><i className="bi bi-power me-2"></i>Grid Connection</p>
                    <h4 className="fw-bold"><span className="status-dot-green"></span> Stable</h4>
                </Col>
                <Col xs={12}>
                    <p className="mb-0">Current Price</p>
                    <h4 className="text-green-h2 fw-bold kpi-md">$0.03<span className="fs-6">/kWh</span></h4>
                </Col>
                <Col xs={12}>
                    <p className="mb-0">Next Peak Price</p>
                    <h4 className="text-warning fw-bold">$0.15<span className="fs-6">/kWh</span> (2 hrs)</h4>
                </Col>
            </Row>
        </DashboardWidget>
    );
};

export default GridMarketSummary;
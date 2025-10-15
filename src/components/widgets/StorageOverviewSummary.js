import React from 'react';
import DashboardWidget from '../DashboardWidget';
import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

const StorageOverviewSummary = ({ storageData }) => {
    if (!storageData || !storageData.tanks) {
        return <DashboardWidget title="Storage Overview">Loading data...</DashboardWidget>;
    }

    const { tanks } = storageData;
    const totalCapacity = tanks.reduce((sum, tank) => sum + tank.capacity, 0);
    const totalCurrent = tanks.reduce((sum, tank) => sum + tank.current, 0);
    const overallFillPercentage = totalCapacity > 0 ? (totalCurrent / totalCapacity) * 100 : 0;

    const getStatusVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'warning': return 'warning';
            case 'low': return 'danger';
            case 'high': return 'info';
            case 'optimal':
            default: return 'success';
        }
    };

    return (
        <DashboardWidget title="Storage Overview">
            <Row>
                {/* Individual Tank Status */}
                <Col md={8} className="border-end border-secondary pe-4">
                    {tanks.map(tank => {
                        const fillPercentage = (tank.current / tank.capacity) * 100;
                        return (
                            <div key={tank.id} className="mb-3">
                                <Row className="align-items-center">
                                    <Col xs={4}><strong>Tank {tank.id} ({tank.type})</strong></Col>
                                    <Col xs={8}>
                                        <ProgressBar 
                                            now={fillPercentage} 
                                            variant={getStatusVariant(tank.status)} 
                                            label={`${fillPercentage.toFixed(0)}%`}
                                            style={{height: '1.2rem', fontSize: '0.85rem'}}
                                        />
                                    </Col>
                                </Row>
                                <small className="text-muted d-block text-end">
                                    {tank.current.toFixed(0)} / {tank.capacity} {tank.unit}
                                </small>
                            </div>
                        );
                    })}
                </Col>

                {/* Overall Summary */}
                <Col md={4} className="ps-4">
                    <h5 className="text-light">Total Stored</h5>
                    <h2 className="text-green-h2 fw-bold">{totalCurrent.toFixed(0)} kg</h2>
                    
                    <h5 className="text-light mt-3">Overall Capacity</h5>
                    <h3 className="fw-bold">{overallFillPercentage.toFixed(1)}%</h3>
                    <p className="text-muted">({totalCurrent.toFixed(0)} / {totalCapacity} kg)</p>

                    <Button variant="green-h2" className="w-100 mt-3">
                        <i className="bi bi-box-seam me-2"></i>Manage Storage
                    </Button>
                </Col>
            </Row>
        </DashboardWidget>
    );
};

export default StorageOverviewSummary;
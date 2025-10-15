import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import DashboardWidget from '../DashboardWidget';

const MLProductionAdvisor = ({ analyticsData, storageData }) => {
    // Safety check for initial render
    if (!analyticsData || !storageData) {
        return <DashboardWidget title="ML Production Advisor">Loading ML insights...</DashboardWidget>;
    }

    const { recommendedRate, pred_class } = analyticsData.predictiveProductionPlanning;
    const overallStoragePercentage = storageData.overallFillPercentage;

    let alertVariant = 'secondary';
    let alertText = 'No current recommendation.';
    let adviceText = '';
    let iconClass = 'bi-question-circle-fill';

    // Determine Alert Color and Text based on ML prediction class
    switch (pred_class) {
        case 'High':
            alertVariant = 'success';
            alertText = 'Optimal Production';
            iconClass = 'bi-graph-up-arrow';
            adviceText = 'High renewable energy and/or low grid prices detected. Maximizing production is recommended.';
            break;
        case 'Medium':
            alertVariant = 'warning';
            alertText = 'Balanced Production';
            iconClass = 'bi-dash-circle-fill';
            adviceText = 'Energy and market conditions are average. Production is set to a standard, balanced rate.';
            break;
        case 'Low':
            alertVariant = 'danger';
            alertText = 'Cost-Saving Mode';
            iconClass = 'bi-graph-down-arrow';
            adviceText = 'Low renewable energy and/or high grid prices. Production is throttled to minimize operational costs.';
            break;
        default:
            alertVariant = 'secondary';
            alertText = 'Awaiting Data';
            adviceText = 'The ML model is waiting for sufficient data to make a recommendation.';
    }

    // --- Storage-Aware Secondary Advice ---
    let storageAdvice = null;
    if (pred_class === 'High' && overallStoragePercentage > 90) {
        storageAdvice = {
            variant: 'warning',
            text: 'Storage is nearly full. Consider dispatching a delivery or reducing the rate to prevent over-pressurization.'
        };
    } else if (pred_class === 'Low' && overallStoragePercentage < 20) {
        storageAdvice = {
            variant: 'info',
            text: 'Storage levels are low. Consider overriding the ML recommendation if immediate hydrogen demand is high.'
        };
    }

    return (
        <DashboardWidget title="ML Production Advisor">
            <div className="text-center">
                <h5>Recommended Rate</h5>
                <h1 className="display-4 fw-bold text-green-h2 mb-3">
                    {recommendedRate.toFixed(0)} <span className="fs-4 text-white-50">kg/hr</span>
                </h1>
                
                <Badge bg={alertVariant} className="px-3 py-2 fs-6 mb-3">
                    <i className={`bi ${iconClass} me-2`}></i>
                    {alertText}
                </Badge>

                <p className="text-white-50 px-2">{adviceText}</p>

                {storageAdvice && (
                    <Card border={storageAdvice.variant} className="mt-3 bg-dark text-white">
                        <Card.Header className={`text-${storageAdvice.variant}`}>
                            <i className="bi bi-info-circle-fill me-2"></i>
                            Storage-Aware Insight
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-0">{storageAdvice.text}</p>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </DashboardWidget>
    );
};

export default MLProductionAdvisor;


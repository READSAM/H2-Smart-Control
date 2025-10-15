import React from 'react';
import DashboardWidget from '../DashboardWidget';

const UpcomingActions = () => {
    return (
        <DashboardWidget title="Upcoming Actions">
            <ul className="list-unstyled mb-0">
                <li className="mb-2"><i className="bi bi-wrench me-2"></i>[Oct 28] Electrolyzer 1: Filter Replacement</li>
                <li className="mb-2 text-warning"><i className="bi bi-exclamation-circle-fill me-2"></i>[Nov 05] Compressor 2: Bearing Failure (AI Predicted)</li>
                <li className="mb-2"><i className="bi bi-calendar-event me-2"></i>[Nov 10] Wind Turbine A: Annual Inspection</li>
            </ul>
        </DashboardWidget>
    );
};

export default UpcomingActions;
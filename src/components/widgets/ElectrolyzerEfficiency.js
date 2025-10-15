import React from 'react';
import DashboardWidget from '../DashboardWidget';

const ElectrolyzerEfficiency = () => {
    return (
        <DashboardWidget title="Electrolyzer Efficiency">
            <div>
                <p><span className="status-dot-green"></span> E-1: 52 kWh/kg - OK</p>
                <p><span className="status-dot-green"></span> E-2: 55 kWh/kg - OK</p>
                <p><span className="status-dot-orange"></span> E-3: 60 kWh/kg - Warning: Lower Efficiency</p>
            </div>
            <div className="chart-placeholder">Bar Chart (Efficiency Comparison)</div>
        </DashboardWidget>
    );
};

export default ElectrolyzerEfficiency;
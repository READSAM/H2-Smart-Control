// import React from 'react';

// const CriticalAlerts = () => {
//     return (
//         <div className="critical-alerts">
//             <h4><span style={{ color: '#dc3545', fontSize: '1.2em' }}>🚨</span> CRITICAL ALERTS (3)</h4>
//             <ul>
//                 <li>[!] Electrolyzer 3: High Pressure Abnormality</li>
//                 <li>[!] Tank A: Hydrogen Leak Detected</li>
//                 <li>[!] Grid Connection Lost (Briefly)</li>
//             </ul>
//         </div>
//     );
// };

// export default CriticalAlerts;

import React from 'react';

const CriticalAlerts = () => {
    return (
        <div className="critical-alerts-sidebar">
            <h5 className="text-danger">
                <i className="bi bi-exclamation-triangle-fill"></i> CRITICAL ALERTS (3)
            </h5>
            <ul className="list-unstyled">
                <li><i className="bi bi-dot me-2"></i>Electrolyzer 3: High Pressure Abnormality</li>
                <li><i className="bi bi-dot me-2"></i>Tank A: Hydrogen Leak Detected</li>
                <li><i className="bi bi-dot me-2"></i>Grid Connection Lost (Briefly)</li>
            </ul>
        </div>
    );
};

export default CriticalAlerts;
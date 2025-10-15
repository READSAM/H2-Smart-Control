// import React from 'react';

// const DashboardWidget = ({ title, children, className }) => {
//     return (
//         <div className={`dashboard-widget ${className || ''}`}>
//             <div className="widget-header">
//                 <h3>{title}</h3>
//                 {/* Optional: Add a refresh icon or more info icon here */}
//             </div>
//             {children}
//         </div>
//     );
// };

// export default DashboardWidget;

import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardWidget = ({ title, children, className = '' }) => {
    return (
        <Card className={`widget-card h-100 ${className}`}>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    );
};

export default DashboardWidget;
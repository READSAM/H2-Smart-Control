// // // src/pages/DashboardPage.js
// // import React from 'react';
// // import { Container, Row, Col, Card } from 'react-bootstrap';
// // import CurrentEnergyInput from '../components/widgets/CurrentEnergyInput';
// // import HydrogenProductionSummary from '../components/widgets/HydrogenProductionSummary';
// // import GridMarketSummary from '../components/widgets/GridMarketSummary';
// // import StorageOverviewSummary from '../components/widgets/StorageOverviewSummary';
// // import LogisticsSummary from '../components/widgets/LogisticsSummary';
// // import UpcomingActions from '../components/widgets/UpcomingActions';

// // const DashboardPage = ({ systemData, logisticsData, loading, error }) => {
// //     if (loading) {
// //         return <Container fluid className="py-4 text-white text-center"><h2>Loading System Data...</h2></Container>;
// //     }
// //     if (error) {
// //         return <Container fluid className="py-4 text-white text-center"><h2 className="text-danger">Connection Error</h2><p>{error}</p></Container>;
// //     }
// //     if (!systemData) {
// //         return <Container fluid className="py-4 text-white text-center"><p>Waiting for system data...</p></Container>;
// //     }

// //     const { energy, production, market, storage, analytics } = systemData;
    
// //     return (
// //         <Container fluid className="py-4">
// //             <h2 className="mb-4 text-white">Dashboard Overview</h2>
// //             <Row className="g-4">
// //                 <Col lg={4} md={6}><HydrogenProductionSummary productionData={production} /></Col>
// //                 <Col lg={4} md={6}><CurrentEnergyInput energyData={energy} /></Col>
// //                 <Col lg={4} md={6}><GridMarketSummary marketData={market} /></Col>
// //                 <Col lg={8} md={12}><StorageOverviewSummary storageData={storage} /></Col>
// //                 <Col lg={4} md={6}><LogisticsSummary logisticsData={logisticsData} /></Col>
// //                 <Col lg={4} md={6}><UpcomingActions analyticsData={analytics} /></Col>
// //                 <Col lg={4} md={6}>
// //                     <Card className="widget-card h-100">
// //                         <Card.Header>System Notifications</Card.Header>
// //                         <Card.Body>
// //                             <p><i className="bi bi-info-circle-fill me-2 text-primary"></i>System update scheduled tonight.</p>
// //                             {analytics.predictiveMaintenance.alert !== 'None' && (
// //                                 <p className="text-warning"><i className="bi bi-exclamation-triangle-fill me-2"></i>{analytics.predictiveMaintenance.alert}</p>
// //                             )}
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>
// //         </Container>
// //     );
// // };

// // export default DashboardPage;

// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import CurrentEnergyInput from '../components/widgets/CurrentEnergyInput';
// import HydrogenProductionSummary from '../components/widgets/HydrogenProductionSummary';
// import StorageOverviewSummary from '../components/widgets/StorageOverviewSummary';
// import LogisticsSummary from '../components/widgets/LogisticsSummary';
// import UpcomingActions from '../components/widgets/UpcomingActions';
// import MLProductionAdvisor from '../components/widgets/MLProductionAdvisor'; // <-- IMPORT THE NEW WIDGET

// const DashboardPage = ({ systemData, logisticsData }) => {
//     // Safety check for initial render
//     if (!systemData) {
//         return (
//             <Container fluid className="py-4 text-center text-white">
//                 <h2><i className="bi bi-arrow-clockwise"></i> Loading Dashboard Data...</h2>
//             </Container>
//         );
//     }

//     // Destructure the data for cleaner passing
//     const { energy, production, storage, analytics } = systemData;

//     return (
//         <Container fluid>
//             <h2 className="mb-4 text-white">Dashboard Overview</h2>
            
//             {/* --- TOP ROW: The Core Narrative (Energy In -> ML Advice -> Production Out) --- */}
//             <Row className="g-4 mb-4">
//                 <Col lg={4} md={6}>
//                     <CurrentEnergyInput energyData={energy} />
//                 </Col>
//                 <Col lg={4} md={6}>
//                     {/* --- ADD THE NEW ML WIDGET HERE --- */}
//                     <MLProductionAdvisor analyticsData={analytics} storageData={storage} />
//                 </Col>
//                 <Col lg={4} md={12}>
//                     <HydrogenProductionSummary productionData={production} />
//                 </Col>
//             </Row>

//             {/* --- SECOND ROW: Downstream Operations --- */}
//             <Row className="g-4">
//                 <Col lg={8} md={12}>
//                     <StorageOverviewSummary storageData={storage} />
//                 </Col>
//                 <Col lg={4} md={6}>
//                     <LogisticsSummary logisticsData={logisticsData} />
//                 </Col>
//                 <Col lg={4} md={6}>
//                     <UpcomingActions analyticsData={analytics} />
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default DashboardPage;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CurrentEnergyInput from '../components/widgets/CurrentEnergyInput';
import HydrogenProductionSummary from '../components/widgets/HydrogenProductionSummary';
import StorageOverviewSummary from '../components/widgets/StorageOverviewSummary';
import LogisticsSummary from '../components/widgets/LogisticsSummary';
import UpcomingActions from '../components/widgets/UpcomingActions';
import MLProductionAdvisor from '../components/widgets/MLProductionAdvisor'; 
import EfficiencyMetrics from '../components/widgets/EfficiencyMetrics';

const DashboardPage = ({ systemData, logisticsData }) => {
    // Safety check for initial render
    if (!systemData) {
        return (
            <Container fluid className="py-4 text-center text-white">
                <h2><i className="bi bi-arrow-clockwise"></i> Loading Dashboard Data...</h2>
            </Container>
        );
    }

    // Destructure the data for cleaner passing
    const { energy, production, storage, analytics } = systemData;

    return (
        <Container fluid>
            <h2 className="mb-4 text-white">Dashboard Overview</h2>
            
            {/* --- TOP ROW: The Core Narrative (Energy In -> ML Advice -> Production Out) --- */}
            <Row className="g-4 mb-4">
                <Col lg={4} md={6}>
                    <CurrentEnergyInput energyData={energy} />
                </Col>
                <Col lg={4} md={6}>
                    {/* --- ADD THE NEW ML WIDGET HERE --- */}
                    <MLProductionAdvisor analyticsData={analytics} storageData={storage} />
                </Col>
                <Col lg={4} md={12}>
                    <HydrogenProductionSummary productionData={production} />
                </Col>
                <Col lg={4} md={6}>
                    <EfficiencyMetrics analyticsData={analytics} />
                </Col>
            </Row>

            {/* --- SECOND ROW: Downstream Operations --- */}
            <Row className="g-4">
                <Col lg={8} md={12}>
                    <StorageOverviewSummary storageData={storage} />
                </Col>
                <Col lg={4} md={6}>
                    <LogisticsSummary logisticsData={logisticsData} />
                </Col>
                <Col lg={4} md={6}>
                    <UpcomingActions analyticsData={analytics} />
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;


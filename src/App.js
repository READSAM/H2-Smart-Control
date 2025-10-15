import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ProductionPage from './pages/ProductionPage';
import StoragePage from './pages/StoragePage';
import TransportationPage from './pages/TransportationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

const API_BASE_URL = 'http://localhost:3001';

// --- Data & State Management ---
const DESTINATIONS = [
    { name: 'Cuttack Industrial Area', lat: 20.5153, lng: 85.8245 },
    { name: 'Puri Fueling Station', lat: 19.8135, lng: 85.8312 },
    { name: 'Paradip Port', lat: 20.2575, lng: 86.6667 },
    { name: 'Khurda Logistics Hub', lat: 20.1864, lng: 85.6268 },
];

const initialFleet = [
    { id: 'TRK-001', type: 'Tube Trailer', status: 'Active', location: 'On Route to Cuttack', load: 500, health: 'Good', lat: 20.4625, lng: 85.8830 },
    { id: 'TRK-002', type: 'Tube Trailer', status: 'Idle', location: 'Plant A (Bhubaneswar)', load: 0, health: 'Good', lat: 20.2961, lng: 85.8245 },
    { id: 'TRK-004', type: 'Tube Trailer', status: 'Active', location: 'On Route to Puri', load: 750, health: 'Good', lat: 19.9500, lng: 85.8312 },
];

function App() {
    const [systemData, setSystemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deliveries, setDeliveries] = useState([]);
    const [fleetStatus, setFleetStatus] = useState(initialFleet);

    // --- Corrected Data Fetching Logic ---
    useEffect(() => {
        const fetchSystemData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/system-state`);
                setSystemData(response.data);
                if (error) setError(null); // Clear previous error on success
            } catch (err) {
                console.error("FETCH ERROR:", err);
                setError("Failed to connect to the backend. Please ensure it is running on http://localhost:3001.");
            } finally {
                setLoading(false);
            }
        };

        fetchSystemData(); // Initial fetch
        const intervalId = setInterval(fetchSystemData, 5000); // Refetch every 5 seconds
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [error]);

    const handleAddDelivery = (deliveryDetails) => {
        const destination = DESTINATIONS.find(d => d.name === deliveryDetails.destinationName);
        if (!destination) return; 

        const newEntry = {
            id: Date.now(),
            truck: deliveryDetails.truck,
            hydrogen: parseFloat(deliveryDetails.hydrogen),
            status: 'Scheduled',
            route: `Plant A -> ${destination.name}`,
            lat: destination.lat,
            lng: destination.lng,
        };
        setDeliveries(prev => [newEntry, ...prev]);
        setFleetStatus(prevFleet =>
            prevFleet.map(t =>
                t.id === deliveryDetails.truck
                    ? { ...t, status: 'Scheduled', load: parseFloat(deliveryDetails.hydrogen), location: `Awaiting dispatch` }
                    : t
            )
        );
        alert(`Delivery for ${destination.name} has been scheduled!`);
    };

    const renderContent = () => {
        if (loading && !systemData) {
            return <div className="loading-error-container text-white"><i className="bi bi-arrow-clockwise spin me-2"></i>Connecting...</div>;
        }
        if (error) {
            return <div className="loading-error-container text-danger"><i className="bi bi-exclamation-triangle-fill me-2"></i>Error: {error}</div>;
        }
        if (systemData) {
            return (
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage systemData={systemData} logisticsData={{ deliveries, fleetStatus }} />} />
                    <Route path="/production" element={<ProductionPage productionData={systemData.production} analyticsData={systemData.analytics} />} />
                    <Route path="/storage" element={<StoragePage storageData={systemData.storage} analyticsData={systemData.analytics} />} />
                    <Route 
                        path="/transportation" 
                        element={<TransportationPage 
                            logisticsData={{ deliveries, fleetStatus }} 
                            destinations={DESTINATIONS}
                            onAddDelivery={handleAddDelivery} 
                        />} 
                    />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            );
        }
        return null; // Fallback for any edge cases
    };

    return (
        <Router>
            <div className="App">
                <Header systemHealth={systemData?.analytics?.systemHealth} mlStatus={systemData?.analytics?.predictiveProductionPlanning?.pred_class} />
                <div className="dashboard-container">
                    <Sidebar />
                    <main className="main-content-area">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
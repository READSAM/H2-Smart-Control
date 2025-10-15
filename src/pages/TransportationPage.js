import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Modal } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    return null;
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const truckIconActive = new L.Icon({ iconUrl: 'https://i.imgur.com/b5a2s3c.png', iconSize: [38, 38] });
const truckIconIdle = new L.Icon({ iconUrl: 'https://i.imgur.com/v8A4aFN.png', iconSize: [38, 38] });
const destinationIcon = new L.Icon({ iconUrl: 'https://i.imgur.com/Oq1S4S6.png', iconSize: [40, 40] });

const TransportationPage = ({ logisticsData, destinations, onAddDelivery }) => {
    const [showModal, setShowModal] = useState(false);
    const [newDispatch, setNewDispatch] = useState({ destinationName: '', truck: '', hydrogen: 500 });
    const [mapCenter, setMapCenter] = useState([20.4, 85.8245]);
    const [mapZoom, setMapZoom] = useState(10);

    if (!logisticsData || !destinations) {
        return <h2 className="text-white text-center">Loading Logistics...</h2>;
    }

    const { deliveries, fleetStatus } = logisticsData;
    const idleTrucks = fleetStatus.filter(f => f.status === 'Idle');

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
      setNewDispatch({ destinationName: destinations[0]?.name || '', truck: idleTrucks[0]?.id || '', hydrogen: 500 });
      setShowModal(true);
    };
    const handleDispatchChange = (e) => setNewDispatch(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
    const handleDispatchSubmit = (e) => {
        e.preventDefault();
        if (!newDispatch.truck) { alert("No idle trucks available."); return; }
        onAddDelivery(newDispatch);
        handleCloseModal();
    };
    
    const handleLocationSelect = (lat, lng) => {
        if (lat && lng) { setMapCenter([lat, lng]); setMapZoom(14); }
    };
    
    return (
        <>
            <Container fluid>
                <h2 className="mb-4 text-white"><i className="bi bi-truck-flatbed me-3"></i>Transportation & Logistics</h2>
                <Row className="g-4">
                    <Col lg={12}>
                        <Card className="widget-card h-100">
                            <Card.Header><i className="bi bi-globe-americas me-2"></i>Live Map</Card.Header>
                            {/* --- MAP RESIZED HERE --- */}
                            <Card.Body className="p-0" style={{ height: '400px' }}>
                                <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%' }}>
                                    <ChangeView center={mapCenter} zoom={mapZoom} />
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {fleetStatus.filter(t => t.lat).map(truck => <Marker key={`truck-${truck.id}`} position={[truck.lat, truck.lng]} icon={truck.status === 'Active' ? truckIconActive : truckIconIdle} />)}
                                    {deliveries.filter(d => d.lat).map(delivery => <Marker key={`del-${delivery.id}`} position={[delivery.lat, delivery.lng]} icon={destinationIcon} />)}
                                </MapContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    {/* --- THE TABLES ARE STILL HERE, UNCHANGED --- */}
                    <Col lg={6}>
                       <Card className="widget-card h-100">
                            <Card.Header><i className="bi bi-truck me-2"></i>Fleet Status</Card.Header>
                            <Card.Body className="p-0">
                                <Table variant="dark" hover responsive className="mb-0">
                                    <thead><tr><th>ID</th><th>Status</th><th>Location</th></tr></thead>
                                    <tbody>
                                        {fleetStatus.map(truck => (
                                            <tr key={truck.id} onClick={() => handleLocationSelect(truck.lat, truck.lng)} style={{cursor: 'pointer'}}>
                                                <td>{truck.id}</td>
                                                <td><Badge bg={truck.status === 'Active' ? 'success' : 'secondary'}>{truck.status}</Badge></td>
                                                <td>{truck.location}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                       <Card className="widget-card h-100">
                            <Card.Header><i className="bi bi-box-seam-fill me-2"></i>Deliveries</Card.Header>
                            <Card.Body className="p-0">
                                <Table variant="dark" hover responsive className="mb-0">
                                    <thead><tr><th>Route</th><th>Truck</th><th>Status</th></tr></thead>
                                    <tbody>
                                        {deliveries.map(d => (
                                            <tr key={d.id} onClick={() => handleLocationSelect(d.lat, d.lng)} style={{cursor: 'pointer'}}>
                                                <td>{d.route}</td>
                                                <td>{d.truck}</td>
                                                <td><Badge bg={d.status === 'In Transit' ? 'primary' : 'info'}>{d.status}</Badge></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <Card.Footer className="text-end"><Button variant="green-h2" onClick={handleShowModal}>New Dispatch</Button></Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="bg-dark text-white"><Modal.Title>Create New Dispatch</Modal.Title></Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form onSubmit={handleDispatchSubmit}>
                        {/* --- COORDINATE INPUTS REPLACED WITH A DROPDOWN --- */}
                        <Form.Group className="mb-3">
                            <Form.Label>Select Destination</Form.Label>
                            <Form.Select name="destinationName" value={newDispatch.destinationName} onChange={handleDispatchChange} className="bg-dark text-white">
                                {destinations.map(d => (<option key={d.name} value={d.name}>{d.name}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Assign Idle Truck</Form.Label><Form.Select name="truck" value={newDispatch.truck} onChange={handleDispatchChange} className="bg-dark text-white" disabled={idleTrucks.length === 0}>{idleTrucks.length > 0 ? idleTrucks.map(truck => (<option key={truck.id} value={truck.id}>{truck.id}</option>)) : <option>No idle trucks</option>}</Form.Select></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Hydrogen (kg)</Form.Label><Form.Control type="number" name="hydrogen" value={newDispatch.hydrogen} onChange={handleDispatchChange} className="bg-dark text-white" /></Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark text-white">
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="green-h2" onClick={handleDispatchSubmit} disabled={!newDispatch.truck}>Dispatch</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TransportationPage;
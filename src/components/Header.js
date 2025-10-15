import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const Header = ({ systemHealth, alertsCount }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Set up an interval to update the time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(timer);
    }, []); // The empty array ensures this effect runs only once on mount

    // Helper to determine health status color and text
    const getHealthStatus = () => {
        switch (systemHealth) {
            case 'Critical':
                return { variant: 'danger', text: 'Critical' };
            case 'Warning':
                return { variant: 'warning', text: 'Warning' };
            case 'Optimal':
            default:
                return { variant: 'success', text: 'Optimal' };
        }
    };

    const healthStatus = getHealthStatus();

    return (
        <Navbar bg="dark-custom" variant="dark" expand="lg" className="px-4 border-bottom border-secondary">
            <Navbar.Brand href="#home" className="text-green-h2 fw-bold">
                <i className="bi bi-water me-2"></i>H2 Smart Control
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <span className="navbar-text me-3">
                        Overall Health: <i className={`bi bi-circle-fill text-${healthStatus.variant} me-1`}></i>{healthStatus.text}
                    </span>
                    <span className="navbar-text">
                        Last Update: {currentTime.toLocaleString()} (Live)
                    </span>
                </Nav>
                <Nav>
                    <Nav.Link href="#"><i className="bi bi-bell fs-5"></i>
                        {alertsCount > 0 && <span className="badge bg-danger ms-1">{alertsCount}</span>}
                    </Nav.Link>
                    <Dropdown align="end">
                        <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                            <i className="bi bi-person-circle fs-5 me-2"></i>Admin User
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                            <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#logout">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Nav.Link href="#"><i className="bi bi-question-circle fs-5"></i></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
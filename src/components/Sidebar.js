import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
// import CriticalAlerts from './CriticalAlerts';

const Sidebar = () => {
    const location = useLocation();
    const navLinks = [
        { to: '/dashboard', icon: 'bi-speedometer2', text: 'Dashboard' },
        { to: '/production', icon: 'bi-gear', text: 'Production' },
        { to: '/storage', icon: 'bi-box-seam', text: 'Storage' },
        { to: '/transportation', icon: 'bi-truck', text: 'Transportation' },
        { to: '/analytics', icon: 'bi-graph-up', text: 'Analytics' },
    ];

    return (
        <aside className="sidebar bg-dark">
            <Nav className="flex-column" activeKey={location.pathname}>
                {navLinks.map(link => (
                    <Nav.Link as={Link} to={link.to} key={link.to} className={location.pathname === link.to ? 'active' : ''}>
                        <i className={`bi ${link.icon}`}></i> {link.text}
                    </Nav.Link>
                ))}
            </Nav>

        </aside>
    );
};

export default Sidebar;

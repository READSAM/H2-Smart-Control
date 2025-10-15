import React from 'react';
import { Container } from 'react-bootstrap';

const NotFoundPage = () => {
    return (
        <Container fluid className="py-5 text-center text-white">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p className="lead">The page you are looking for does not exist.</p>
            <p className="text-muted">Please use the sidebar to navigate.</p>
        </Container>
    );
};

export default NotFoundPage;
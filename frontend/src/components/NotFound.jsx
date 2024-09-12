import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaSadTear } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100 text-center " >
            <Row>
                <Col className="flex flex-col justify-center">
                    <FaSadTear className="not-found-icon mx-auto" />
                    <h1 className="text-customPurple text-8xl mt-4">404</h1>
                    <p className="not-found-text">Page not found</p>
                    <Button className="bg-customPurple" onClick={() => navigate('/')} >Back to Home</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFoundPage;
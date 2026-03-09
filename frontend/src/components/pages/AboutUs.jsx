import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Layout from '../common/Layout'
import { FaGraduationCap, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'
import aboutImage from "../../assets/images/about-us.jpg";

const AboutUs = () => {
    return (
        <Layout>

            <div
                className="text-white text-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${aboutImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "120px 0"
                }}
            >
                <Container>
                    <h1 className="display-3 fw-bold">About Us</h1>
                    <p className="lead">
                        Empowering learners and educators around the globe.
                    </p>
                </Container>
            </div>

            <Container className="my-5">
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <img
                            src={aboutImage}
                            alt="About Us"
                            className="img-fluid rounded shadow-sm"
                        />
                    </Col>
                    <Col md={6} className="mt-4 mt-md-0 ps-md-5">
                        <h2 className="fw-bold mb-3">Who We Are</h2>
                        <p className="text-muted" style={{ lineHeight: '1.8' }}>
                            We are a premier online learning platform dedicated to bringing high-quality education to your fingertips. Whether you are looking to advance your career or discover a new hobby, our comprehensive courses cover a vast array of topics taught by expert instructors.
                        </p>
                        <p className="text-muted" style={{ lineHeight: '1.8' }}>
                            Our mission is to democratize education by offering accessible, scalable, and effective learning solutions. By bridging the gap between instructors and students, we strive to create a holistic learning ecosystem.
                        </p>
                    </Col>
                </Row>

                <div className="text-center mb-5">
                    <h2 className="fw-bold">Our Core Values</h2>
                    <p className="text-muted">What drives us everyday to be better.</p>
                </div>

                <Row className="text-center g-4">
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm py-4">
                            <Card.Body>
                                <div className="text-primary mb-3">
                                    <FaGraduationCap size={50} />
                                </div>
                                <Card.Title className="fw-bold">Quality Education</Card.Title>
                                <Card.Text className="text-muted">
                                    Curated content delivered by industry experts to ensure the best learning experience.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm py-4">
                            <Card.Body>
                                <div className="text-primary mb-3">
                                    <FaChalkboardTeacher size={50} />
                                </div>
                                <Card.Title className="fw-bold">Expert Instructors</Card.Title>
                                <Card.Text className="text-muted">
                                    Learn from professionals who have real-world experience and deep knowledge.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm py-4">
                            <Card.Body>
                                <div className="text-primary mb-3">
                                    <FaUsers size={50} />
                                </div>
                                <Card.Title className="fw-bold">Community Support</Card.Title>
                                <Card.Text className="text-muted">
                                    Join a global community of learners. Share, discuss, and grow together.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AboutUs

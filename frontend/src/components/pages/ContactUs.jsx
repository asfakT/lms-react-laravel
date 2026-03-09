import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Layout from '../common/Layout'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import contactImage from "../../assets/images/contact-us.webp";

const ContactUs = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Here you would normally send the data to the backend
        console.log("Contact Data:", data);
        toast.success("Message sent successfully! We will get back to you soon.");
        reset();
    };

    return (
        <Layout>
            <div
                className="text-white text-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${contactImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "120px 0"
                }}
            >
                <Container>
                    <h1 className="display-3 fw-bold">Contact Us</h1>
                    <p className="lead">
                        We’d love to hear from you. Get in touch with us!
                    </p>
                </Container>
            </div>

            <Container className="my-5">
                <Row className="g-5">
                    {/* Contact Information */}
                    <Col lg={4}>
                        <h3 className="fw-bold mb-4">Get In Touch</h3>
                        <p className="text-muted mb-4">
                            Have questions about our courses, pricing, or something else? Our team is ready to answer all your questions.
                        </p>

                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-light p-3 rounded-circle text-primary me-3">
                                <FaMapMarkerAlt size={24} />
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Our Location</h5>
                                <p className="mb-0 text-muted">123 Learning Street, Tech Valley, CA 94043</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-light p-3 rounded-circle text-primary me-3">
                                <FaPhoneAlt size={24} />
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Phone Number</h5>
                                <p className="mb-0 text-muted">+1 (800) 123-4567</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-light p-3 rounded-circle text-primary me-3">
                                <FaEnvelope size={24} />
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Email Address</h5>
                                <p className="mb-0 text-muted">support@lmsplatform.com</p>
                            </div>
                        </div>
                    </Col>

                    {/* Contact Form */}
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm p-4">
                            <Card.Body>
                                <h3 className="fw-bold mb-4">Send Us a Message</h3>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="John"
                                                    {...register('firstName', { required: 'First name is required' })}
                                                    isInvalid={!!errors.firstName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.firstName?.message}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Doe"
                                                    {...register('lastName', { required: 'Last name is required' })}
                                                    isInvalid={!!errors.lastName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.lastName?.message}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    {...register('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /\S+@\S+\.\S+/,
                                                            message: "Entered value does not match email format"
                                                        }
                                                    })}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email?.message}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="+1 (123) 456-7890"
                                                    {...register('phone')}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Message <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="How can we help you?"
                                            {...register('message', { required: 'Message is required' })}
                                            isInvalid={!!errors.message}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" size="lg" className="px-5">
                                        Send Message
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default ContactUs

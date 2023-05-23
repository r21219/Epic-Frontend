import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApiClient} from "../../controllers/ApiClient";
import {Button, Form, Container, Row, Col} from "react-bootstrap";

const UserRegister: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            await ApiClient.createUser(name, password);
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            setErrorMessage("Registration failed");
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="login-page">
            <Container className="login-container w-50">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <Form className="login-form">
                            <h2 className="text-center">Register</h2>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <Form.Group>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={"mt-3"}>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={"mt-3"}>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                            <div className="text-center mt-3">
                                <Button variant="primary" className={"register-button"} style={{ width: '50%'  }} onClick={handleRegister}>
                                    Register
                                </Button>
                            </div>
                            <div className="text-center mt-3">
                                <small>
                                    Account have an already?{' '}
                                    <a href="#" onClick={handleBackToLogin}>
                                        Login
                                    </a>
                                </small>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserRegister;

import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../Contexts/UserContext";
import { ApiClient } from "../../controllers/ApiClient";
import { useNavigate } from "react-router-dom";
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import stormHelmet from "../../star-wars-stormtrooper.gif";
//import './LoginPage.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, user } = useContext(UserContext);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            const user = await ApiClient.loginUser(userName, password);
            login(user);
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("Wrong password or username.");
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="login-page">
            <Container className="login-container w-50">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={8} lg={8} className={" justify-content-center align-items-center d-flex"}>
                        <Form className="login-form">
                            <img src={stormHelmet} alt="stormtrooper" className="storm-helmet"/>
                            <h2 className="text-center">Log in</h2>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className={"mt-3"}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <div className="text-center mt-3">
                            <Button variant="primary" className={"login-button"} style={{ width: '50%'  }} onClick={handleLogin}>
                                Login
                            </Button>
                            </div>
                            <div className="text-center mt-3">
                                <small>
                                    Not registered yet?{' '}
                                    <a href="#" onClick={handleRegister}>
                                        Register now
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

export default LoginPage;

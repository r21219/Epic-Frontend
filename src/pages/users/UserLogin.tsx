import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {UserContext} from "../../Contexts/UserContext";
import User from "../../models/User";


const LoginPage: React.FC = () => {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login validation and API call
        // Once the login is successful, set the user data in the UserContext
        const userData: User = {
            name: username,
            password: password,
        };
        login(userData);
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;

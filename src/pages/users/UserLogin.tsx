import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../Contexts/UserContext";
import { ApiClient } from "../../controllers/ApiClient";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

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
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
        </div>
    );
};

export default LoginPage;

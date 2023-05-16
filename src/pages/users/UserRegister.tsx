import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApiClient} from "../../controllers/ApiClient";
import {Button} from "react-bootstrap";

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
        <div>
            <h2>Register</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Confirm Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <br/>
            <Button onClick={handleRegister}>Register</Button>
            <Button onClick={handleBackToLogin}>Back to Login</Button>
        </div>
    );
};

export default UserRegister;
